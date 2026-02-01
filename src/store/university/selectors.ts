
import { createSelector } from "reselect";
import { ApplicationState } from "../configuration/constants";
import { Direction, Group, Specialty, Year } from "./constants";
import { Option } from "~/src/modules/Components/Input/types";

const getId = (_: ApplicationState, id: Option<string>): string => id?.value;

export const getDirection = (state: ApplicationState): Direction[] => state.university.directions;
export const getSpecialty = (state: ApplicationState): Specialty[] => state.university.specialties;
export const getYear = (state: ApplicationState): Year[] => state.university.years;
export const getGroup = (state: ApplicationState): Group[] => state.university.group;

export const getDirectionSelector = createSelector<ApplicationState, Option<string>, Direction[], string, Direction[]>(getDirection, getId, (direction, id) => {
  if (!id) {
    return direction;
  }
  return direction.filter(({ specialties }) => specialties.includes(id));
});

interface SpecialtyIds {
  yearId: Option<string>;
  directionId: Option<string>;
}

const getSpecialtyIds = (_: ApplicationState, ids: SpecialtyIds): Record<keyof SpecialtyIds, string> => ({
  yearId: ids?.yearId.value,
  directionId: ids?.directionId.value,
});

export const getSpecialtySelector = createSelector<ApplicationState, SpecialtyIds, Specialty[], Record<keyof SpecialtyIds, string>, Specialty[]>(
  getSpecialty, getSpecialtyIds, (specialty, { yearId, directionId }) => {
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

const getYearIds = (_: ApplicationState, ids: YearIds): Record<keyof YearIds, string> => ({
  groupId: ids?.groupId.value,
  specialtyId: ids?.specialtyId.value,
});

export const getYearSelector = createSelector<ApplicationState, YearIds, Year[], Record<keyof YearIds, string>, Year[]>(getYear, getYearIds, (year, { specialtyId, groupId }) => {
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

const getGroupIds = (_: ApplicationState, ids: GroupIds): Record<keyof GroupIds, string> => ({
  yearId: ids?.yearId.value,
  specialtyId: ids?.specialtyId.value,
});
export const getGroupSelector = createSelector<ApplicationState, GroupIds, Group[], Record<keyof GroupIds, string>, Group[]>(getGroup, getGroupIds, (group, { specialtyId, yearId }) => {
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