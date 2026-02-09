import { initialState, TimeTableAction, TimeTableActionType, TimeTableState } from './constants';

export const timeTableReducer = (state: TimeTableState = initialState, action: TimeTableAction): TimeTableState => {
  switch (action.type) {
    case TimeTableActionType.GetTimeTableSuccess: {
      return {
        ...state,
        groupsTable: action.timeTable,
      };
    }
    case TimeTableActionType.GetCalendarSuccess: {
      return {
        ...state,
        days: action.calendar.days,
        hours: action.calendar.hours,
      };
    }
    case TimeTableActionType.MoveSubjectInTimeTableSuccess: {
      const { newCalendarPlace, oldCalendarPlace, year, group } = action.payload;
      const groupIndex = state.groupsTable.findIndex((g) => g.name === group && g.year === year);

      const newGroupsTable = [...state.groupsTable];

      const newTable = {
        ...newGroupsTable[groupIndex],
        timeTable: [
          newCalendarPlace,
          ...newGroupsTable[groupIndex]
            .timeTable
            .filter(({ days, hours }) => days !== oldCalendarPlace.days
              || hours !== oldCalendarPlace.hours)
        ]
      }
      newGroupsTable[groupIndex] = newTable;

      return {
        ...state,
        groupsTable: newGroupsTable,
      };
    }
    case TimeTableActionType.DeleteSubjectFromTimeTableSuccess: {
      const { year, group, days, hours } = action.data;
      const groupIndex = state.groupsTable.findIndex((g) => g.name === group && g.year === year);
      const newGroupsTable = [...state.groupsTable];

      const newTable = {
        ...newGroupsTable[groupIndex],
        timeTable: [
          ...newGroupsTable[groupIndex]
            .timeTable
            .filter((e) => days !== e.days
              || hours !== e.hours)
        ]
      }
      newGroupsTable[groupIndex] = newTable;

      return {
        ...state,
        groupsTable: newGroupsTable,
      };
    }
    case TimeTableActionType.AddSubjectToTimeTableSuccess: {
      const { calendarPace } = action;
      const groupIndex = state.groupsTable.findIndex((group) => group.name === calendarPace.group);

      if (groupIndex !== -1) {
        const newGroupsTable = [...state.groupsTable];
        newGroupsTable[groupIndex] = {
          ...newGroupsTable[groupIndex],
          timeTable: [...newGroupsTable[groupIndex].timeTable, calendarPace],
        };

        return {
          ...state,
          groupsTable: newGroupsTable,
        };
      } else {
        return {
          ...state,
          groupsTable: [
            ...state.groupsTable,
            {
              name: calendarPace.group,
              year: calendarPace.year,
              timeTable: [calendarPace],
            },
          ],
        };
      }
    }
    default: {
      return state;
    }
  }
};
