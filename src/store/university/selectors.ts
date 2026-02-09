
import { createSelector } from "reselect";
import { ApplicationState } from "../configuration/constants";
import { Direction, Group, Specialty, Year } from "./constants";
import { Option } from "~/src/modules/Components/Input/types";

const getId = (_: ApplicationState, id: Option<string>): string => id?.value;

export const getDirection = (state: ApplicationState): Direction[] => state.university.directions;
export const getSpecialty = (state: ApplicationState): Specialty[] => state.university.specialties;
export const getYear = (state: ApplicationState): Year[] => state.university.years;
export const getGroup = (state: ApplicationState): Group[] => state.university.group;

export const getDirectionSelector = createSelector(getDirection, getId, (direction, id) => {
  if (!id) {
    return direction;
  }
  return direction.filter(({ specialties }) => specialties.includes(id));
});

interface SpecialtyIds {
  yearId: Option<string>;
  directionId: Option<string>;
}

export const getSpecialtiesSelector = createSelector(
  getSpecialty,
  (_: ApplicationState, ids: SpecialtyIds) => ids?.yearId?.value,
  (_: ApplicationState, ids: SpecialtyIds) => ids?.directionId?.value,
  (specialty, yearId, directionId) => {
    if (!yearId && !directionId) {
      return specialty
    }
    if (yearId && directionId) {
      return specialty.filter((spec) => spec.direction.includes(yearId) && spec.direction === directionId);
    }
    if (directionId) {
      return specialty.filter((spec) => spec.direction === directionId);
    }
    return specialty.filter((spec) => spec.years.includes(yearId));
  });

interface YearIds {
  specialtyId: Option<string>;
  groupId: Option<string>;
}

export const getYearSelector = createSelector(getYear,
  (_: ApplicationState, ids: YearIds) => ids?.specialtyId?.value,
  (_: ApplicationState, ids: YearIds) => ids?.groupId?.value,
  (year, specialtyId, groupId) => {
    if (specialtyId && groupId) {
      return year.filter((y) => y.specialties.includes(specialtyId)
        && y.groups.includes(groupId));
    }
    if (specialtyId && !groupId) {
      return year.filter((y) => y.specialties.includes(specialtyId));
    }
    if (!specialtyId && groupId) {
      return year.filter((y) => y.groups.includes(groupId));
    }

    return year;
  })

interface GroupIds {
  specialtyId: Option<string>;
  yearId: Option<string>;
}

export const getGroupSelector = createSelector(getGroup,
  (_: ApplicationState, ids: GroupIds) => ids?.yearId?.value,
  (_: ApplicationState, ids: GroupIds) => ids?.specialtyId?.value,
  (group, specialtyId, yearId) => {
    if (!yearId && !specialtyId) {
      return group
    }
    if (yearId && specialtyId) {
      return group.filter((gr) => gr.years.includes(yearId) && gr.specialty === specialtyId);
    }
    if (specialtyId) {
      return group.filter((gr) => gr.specialty === specialtyId);
    }
    return group.filter((gr) => gr.years.includes(yearId));
  });

export const getSpecialtySelector = createSelector(getSpecialty,
  (_: ApplicationState, groupId: string) => groupId,
  (specialty, groupId) => specialty?.find(({ groups }) => groups.includes(groupId))?.name ?? ''
);