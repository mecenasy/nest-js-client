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
      return state
    }
    case TimeTableActionType.DeleteSubjectFromTimeTableSuccess: {
      return state
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
