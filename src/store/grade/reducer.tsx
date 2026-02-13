import { createAction, createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import {
  GradesReducer,
  Grade,
  SubjectGrades,
  TeacherGrades,
  CreateGrade,
  initialState,
} from './constants';
import { logoutSuccess } from '../auth/reducers';

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
        teacherGrade.students.forEach((student) => {
          student.grades.forEach((grade, index) => {
            if (updatedGradesMap[grade.id]) {
              student.grades[index] = updatedGradesMap[grade.id];
            }
          });
        });
      });
    },
    removeGrade: (state, action: PayloadAction<string>) => {
      const gradeIdToRemove = action.payload;
      if (!gradeIdToRemove) return;

      state.forEach((teacherGrade) => {
        teacherGrade.students.forEach((student) => {
          student.grades = student.grades.filter((grade) => grade.id !== gradeIdToRemove);
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
        teacherGrade.students.forEach((student) => {
          if (gradesByStudent[student.id]) {
            student.grades.push(...gradesByStudent[student.id]);
          }
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState.teachers);
  },
  selectors: {
    getTeacherGradesSelector: (state) => state,
  }
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
  selectors: {
    getStudentsGradesSelector: (state) => state,
  }
});

const teacherReducer = teacherSlice.reducer;
const studentReducer = studentsSlice.reducer;

export const { getTeacherGrades, updateGrades, removeGrade, addGrades } = teacherSlice.actions;
export const { getStudentsGrades } = studentsSlice.actions;

export const { getTeacherGradesSelector } = teacherSlice.selectors;
export const { getStudentsGradesSelector } = studentsSlice.selectors;

export const gradeReducer = combineReducers<GradesReducer>({
  teachers: teacherReducer,
  student: studentReducer,
});

export const getTeacherGradesRequest = createAction('grade/getTeacherGradesRequest')
export const updateGradesRequest = createAction<CreateGrade[]>('grade/updateGradesRequest')
export const removeGradeRequest = createAction<string>('grade/removeGradeRequest')
export const addGradesRequest = createAction<CreateGrade[]>('grade/addGradesRequest')
export const getStudentsGradesRequest = createAction('grade/getStudentsGradesRequest')

export const getTeacherGradesFail = createAction<string>('grade/getTeacherGradesFail')
export const updateGradesFail = createAction<string>('grade/updateGradesFail')
export const removeGradeFail = createAction<string>('grade/removeGradeFail')
export const addGradesFail = createAction<string>('grade/addGradesFail')
export const getStudentsGradesFail = createAction<string>('grade/getStudentsGradesFail')