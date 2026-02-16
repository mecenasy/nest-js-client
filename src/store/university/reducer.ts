import { createSlice, PayloadAction, createAction, createSelector } from '@reduxjs/toolkit';
import { initialState, UniversityState } from './constants';
import { Option } from '~/src/modules/Components/Input/types';
import { logoutSuccess } from '../auth/reducers';
import { ApplicationState } from '../configuration/constants';

export const getUniversityRequest = createAction('university/getUniversityRequest');
export const getUniversityFail = createAction<string>('university/getUniversityFail');

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
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
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
    getSpecialtiesSelector: ({ specialties }, directionId: string, yearId: string) => {
      if (!yearId && !directionId) {
        return specialties;
      }
      if (yearId && directionId) {
        return specialties.filter(
          (spec) => spec.direction.includes(yearId) && spec.direction === directionId,
        );
      }
      if (directionId) {
        return specialties.filter((spec) => spec.direction === directionId);
      }
      return specialties.filter((spec) => spec.years.includes(yearId));
    },
    getYearSelector: ({ years }, specialtyId: string, groupId: string) => {
      if (specialtyId && groupId) {
        return years.filter(
          (y) => y.specialties.includes(specialtyId) && y.groups.includes(groupId),
        );
      }
      if (specialtyId && !groupId) {
        return years.filter((y) => y.specialties.includes(specialtyId));
      }
      if (!specialtyId && groupId) {
        return years.filter((y) => y.groups.includes(groupId));
      }

      return years;
    },
    getGroupSelector: ({ group }, specialtyId: string, yearId: string) => {
      if (!yearId && !specialtyId) {
        return group;
      }
      if (yearId && specialtyId) {
        return group.filter((gr) => gr.years.includes(yearId) && gr.specialty === specialtyId);
      }
      if (specialtyId) {
        return group.filter((gr) => gr.specialty === specialtyId);
      }
      return group.filter((gr) => gr.years.includes(yearId));
    },
    getSpecialtySelector: ({ specialties }, groupId: string) => {
      return specialties?.find(({ groups }) => groups.includes(groupId))?.name ?? '';
    },
  },
});

export const { getUniversitySuccess } = universitySlice.actions;
export const universityReducer = universitySlice.reducer;

const selectUniversity = (state: any): UniversityState => state.university || initialState;

export const getDirection = createSelector(selectUniversity, (state) => state.directions);
export const getSpecialty = createSelector(selectUniversity, (state) => state.specialties);
export const getYear = createSelector(selectUniversity, (state) => state.years);
export const getGroup = createSelector(selectUniversity, (state) => state.group);

export const getDirectionSelector = createSelector(
  getDirection,
  (_state: ApplicationState, id: string) => id,
  (directions, id) => {
    if (!id) {
      return directions;
    }
    return directions.filter(({ specialties }) => specialties.includes(id));
  },
);

export const getSpecialtiesSelector = createSelector(
  getSpecialty,
  (_state: ApplicationState, { directionId }: SpecialtyIds) => directionId.value,
  (_state: ApplicationState, { yearId }: SpecialtyIds) => yearId.value,
  (specialties, directionId, yearId) => {
    if (!yearId && !directionId) {
      return specialties;
    }
    if (yearId && directionId) {
      return specialties.filter(
        (spec) => spec.direction.includes(yearId) && spec.direction === directionId,
      );
    }
    if (directionId) {
      return specialties.filter((spec) => spec.direction === directionId);
    }
    return specialties.filter((spec) => spec.years.includes(yearId));
  },
);

export const getYearSelector = createSelector(
  getYear,
  (_state: ApplicationState, { specialtyId }: YearIds) => specialtyId.value,
  (_state: ApplicationState, { groupId }: YearIds) => groupId.value,
  (years, specialtyId, groupId) => {
    if (specialtyId && groupId) {
      return years.filter((y) => y.specialties.includes(specialtyId) && y.groups.includes(groupId));
    }
    if (specialtyId && !groupId) {
      return years.filter((y) => y.specialties.includes(specialtyId));
    }
    if (!specialtyId && groupId) {
      return years.filter((y) => y.groups.includes(groupId));
    }

    return years;
  },
);

export const getGroupSelector = createSelector(
  getGroup,
  (_state: ApplicationState, { specialtyId }: GroupIds) => specialtyId.value,
  (_state: ApplicationState, { yearId }: GroupIds) => yearId.value,
  (group, specialtyId, yearId) => {
    if (!yearId && !specialtyId) {
      return group;
    }
    if (yearId && specialtyId) {
      return group.filter((gr) => gr.years.includes(yearId) && gr.specialty === specialtyId);
    }
    if (specialtyId) {
      return group.filter((gr) => gr.specialty === specialtyId);
    }
    return group.filter((gr) => gr.years.includes(yearId));
  },
);

export const getSpecialtySelector = createSelector(
  getSpecialty,
  (_state: ApplicationState, groupId: string) => groupId,
  (specialties, groupId) => {
    return specialties?.find(({ groups }) => groups.includes(groupId))?.name ?? '';
  },
);
