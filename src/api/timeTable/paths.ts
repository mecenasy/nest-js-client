export const timeTable = 'university/time-table';
export const calendar = 'university/time-table/calendar';
export const groupPath = (group: string, year: string) =>
  `university/time-table/group/${group}/year/${year}`;
export const specialtyPath = (specialty: string) => `university/time-table/specialty/${specialty}`;
export const yearPath = (year: string) => `university/time-table/year/${year}`;
export const teacherPath = (teacher: string) => `university/time-table/teacher/${teacher}`;
