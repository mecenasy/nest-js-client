
import { createSelector } from "reselect";
import { ApplicationState } from "../configuration/constants";
import { Direction, Group, Specialty, Year } from "./constants";
import { Option } from "~/src/modules/Components/Input/types";

const getId = (_: ApplicationState, id: Option<string>): string => id?.value;

export const getDirection = (state: ApplicationState): Direction[] => state.studentData.direction;
export const getSpecialty = (state: ApplicationState): Specialty[] => state.studentData.specialty;
export const getYear = (state: ApplicationState): Year[] => state.studentData.year;
export const getGroup = (state: ApplicationState): Group[] => state.studentData.group;

export const getDirectionSelector = createSelector<ApplicationState, Option<string>, Direction[], string, Direction[]>(getDirection, getId, (direction, id) => {
  if (!id) {
    return direction;
  }
  return direction.filter(({ specialtyIds }) => specialtyIds.includes(id));
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
      return specialty.filter((spec) => spec.yearIds.includes(yearId) && spec.directionId === directionId);
    }
    if (directionId) {
      return specialty.filter((spec) => spec.directionId === directionId);
    }
    return specialty.filter((spec) => spec.yearIds.includes(yearId));
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
    return year.filter((y) => y.specialtyIds.includes(specialtyId)
      && y.groupIds.includes(groupId));
  }
  if (specialtyId && !groupId) {
    return year.filter((y) => y.specialtyIds.includes(specialtyId));
  }
  if (!specialtyId && groupId) {
    return year.filter((y) => y.groupIds.includes(groupId));
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
    return group.filter((gr) => gr.yearIds.includes(yearId) && gr.specialtyId === specialtyId);
  }
  if (specialtyId) {
    return group.filter((gr) => gr.specialtyId === specialtyId);
  }
  return group.filter((gr) => gr.yearIds.includes(yearId));
});