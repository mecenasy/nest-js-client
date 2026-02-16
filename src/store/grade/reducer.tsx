import { createAction, createSlice, PayloadAction, combineReducers, createSelector } from '@reduxjs/toolkit';
import {
  GradesReducer,
  Grade,
  SubjectGrades,
  TeacherGrades,
  CreateGrade,
  initialState,
  AddGradeActionPayload,
  UpdateGradeActionPayload,
} from './constants';
import { logoutSuccess } from '../auth/reducers';
import { ApplicationState } from '../configuration/constants';

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: initialState.teachers,
  reducers: {
    getTeacherGrades: (_, action: PayloadAction<TeacherGrades[]>) => {
      return action.payload || [];
    },
    updateGrades: (state, action: PayloadAction<Grade[]>) => {
      const updatedGrades = action.payload;
      if (!updatedGrades || updatedGrades.length === 0) {
        return state;
      }

      const updatedGradesMap = updatedGrades.reduce<Record<string, Grade>>((acc, grade) => {
        acc[grade.id] = grade;
        return acc;
      }, {});

      state.forEach((teacherGrade) => {
        teacherGrade.subjects.forEach((subject) => {
          subject.students.forEach((student) => {
            student.grades.forEach((grade, index) => {
              if (updatedGradesMap[grade.id]) {
                student.grades[index] = updatedGradesMap[grade.id];
              }
            });
          });
        });
      });
    },
    removeGrade: (state, action: PayloadAction<string>) => {
      const gradeIdToRemove = action.payload;
      if (!gradeIdToRemove) return;

      state.forEach((teacherGrade) => {
        teacherGrade.subjects.forEach((subject) => {
          subject.students.forEach((student) => {
            student.grades = student.grades
              .filter((grade) => grade.id !== gradeIdToRemove);
          });
        });
      });
    },
    addGrades: (state, action: PayloadAction<Grade[]>) => {
      const newGrades = action.payload;
      if (!newGrades || newGrades.length === 0) {
        return state;
      }

      const gradesByStudent: Record<string, Grade[]> = {};
      newGrades.forEach((grade) => {
        const studentId = grade.student?.id;
        if (studentId) {
          if (!gradesByStudent[studentId]) gradesByStudent[studentId] = [];
          gradesByStudent[studentId].push(grade);
        }
      });

      state.forEach((teacherGrade) => {
        teacherGrade.subjects.forEach((subject) => {
          subject.students.forEach((student) => {
            if (gradesByStudent[student.id]) {
              student.grades.push(...gradesByStudent[student.id]);
            }
          });
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState.teachers);
  },
});

const studentsSlice = createSlice({
  name: 'student',
  initialState: initialState.student,
  reducers: {
    getStudentsGrades: (_: SubjectGrades[], action: PayloadAction<SubjectGrades[]>) => {
      return action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState.student);
  },
});

const teacherReducer = teacherSlice.reducer;
const studentReducer = studentsSlice.reducer;

export const { getTeacherGrades, updateGrades, removeGrade, addGrades } = teacherSlice.actions;
export const { getStudentsGrades } = studentsSlice.actions;


export const gradeReducer = combineReducers<GradesReducer>({
  teachers: teacherReducer,
  student: studentReducer,
});

export const getStudentsGradesSelector = (state: ApplicationState) => state.grades.student;
export const getTeacherGradesSelector = createSelector(
  (state: ApplicationState) => state.grades.teachers,
  (grades) => {

    if (!grades) {
      return [];
    }

    return [...grades].sort((a, b) => {
      const yearCompare = a.year.localeCompare(b.year);

      if (yearCompare !== 0) {
        return yearCompare;
      }
      return a.group.localeCompare(b.group);
    });
  });

export const getFilterOptionsSelector = createSelector(
  (state: ApplicationState) => state.grades.teachers,
  (grades) => {
    if (!grades) {
      return {
        yearOptions: [],
        groupOptions: [],
      }
    }

    const years = Array.from(new Set(grades.map((g) => g.year))).sort();
    const yearOptions = years.map((y) => ({ label: y, value: y }));

    const groups = Array.from(new Set(grades.map((g) => g.group))).sort();
    const groupOptions = groups.map((g) => ({ label: g, value: g }));

    return {
      yearOptions,
      groupOptions,
    };
  });

export const getTeacherGradesRequest = createAction('grade/getTeacherGradesRequest')
export const getStudentsGradesRequest = createAction('grade/getStudentsGradesRequest')
export const updateGradesRequest = createAction<UpdateGradeActionPayload & PromiseFParams>('grade/updateGradesRequest')
export const removeGradeRequest = createAction<string>('grade/removeGradeRequest')
export const addGradesRequest = createAction<AddGradeActionPayload & PromiseFParams>('grade/addGradesRequest')

export const getTeacherGradesFail = createAction<string>('grade/getTeacherGradesFail')
export const getStudentsGradesFail = createAction<string>('grade/getStudentsGradesFail')
export const updateGradesFail = createAction<string>('grade/updateGradesFail')
export const removeGradeFail = createAction<string>('grade/removeGradeFail')
export const addGradesFail = createAction<string>('grade/addGradesFail')