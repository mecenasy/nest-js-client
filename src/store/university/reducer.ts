import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, UniversityState } from "./constants";
import { Option } from '~/src/modules/Components/Input/types';

export const getUniversityRequest = createAction('university/GET_UNIVERSITY_REQUEST');

interface SpecialtyIds {
  yearId: Option<string>;
  directionId: Option<string>;
}

interface YearIds {
  specialtyId: Option<string>;
  groupId: Option<string>;
}

interface GroupIds {
  specialtyId: Option<string>;
  yearId: Option<string>;
}

const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
    getUniversitySuccess: (_, action: PayloadAction<UniversityState>) => {
      return action.payload;
    },
  },
  selectors: {
    getDirection: (state) => state.directions,
    getSpecialty: (state) => state.specialties,
    getYear: (state) => state.years,
    getGroup: (state) => state.group,
    getDirectionSelector: ({ directions }, id: string) => {
      if (!id) {
        return directions;
      }
      return directions.filter(({ specialties }) => specialties.includes(id));
    },
    getSpecialtiesSelector: ({ specialties }, { directionId, yearId }: SpecialtyIds) => {
      if (!yearId && !directionId) {
        return specialties
      }
      if (yearId && directionId) {
        return specialties.filter((spec) => spec.direction.includes(yearId.value) && spec.direction === directionId.value);
      }
      if (directionId) {
        return specialties.filter((spec) => spec.direction === directionId.value);
      }
      return specialties.filter((spec) => spec.years.includes(yearId.value));
    },
    getYearSelector: ({ years }, { specialtyId, groupId }: YearIds) => {
      if (specialtyId && groupId) {
        return years.filter((y) => y.specialties.includes(specialtyId.value)
          && y.groups.includes(groupId.value));
      }
      if (specialtyId && !groupId) {
        return years.filter((y) => y.specialties.includes(specialtyId.value));
      }
      if (!specialtyId && groupId) {
        return years.filter((y) => y.groups.includes(groupId.value));
      }

      return years;
    },
    getGroupSelector: ({ group }, { specialtyId, yearId }: GroupIds) => {
      if (!yearId && !specialtyId) {
        return group
      }
      if (yearId && specialtyId) {
        return group.filter((gr) => gr.years.includes(yearId.value) && gr.specialty === specialtyId.value);
      }
      if (specialtyId) {
        return group.filter((gr) => gr.specialty === specialtyId.value);
      }
      return group.filter((gr) => gr.years.includes(yearId.value));
    },
    getSpecialtySelector: ({ specialties }, groupId: string) => {
      return specialties?.find(({ groups }) => groups.includes(groupId))?.name ?? ''
    }
  }
});

export const universityReducer = universitySlice.reducer;
export const { getUniversitySuccess } = universitySlice.actions;

export const {
  getDirection,
  getSpecialty,
  getYear,
  getGroup,
  getDirectionSelector,
  getSpecialtiesSelector,
  getYearSelector,
  getGroupSelector,
  getSpecialtySelector
} = universitySlice.selectors;