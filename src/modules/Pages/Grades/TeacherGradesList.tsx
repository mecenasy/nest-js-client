import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTeacherGradesSelector } from '~/src/store/grade/reducer';
import * as P from './parts';
import GroupGrades from './GroupGrades';
import { Option } from '../../Components/Input/types';
import Filters from './Filters';

const TeacherGradesList = () => {
  const grades = useSelector(getTeacherGradesSelector);

  const [selectedYear, setSelectedYear] = useState<Array<Option<string>> | undefined>(undefined);
  const [selectedGroup, setSelectedGroup] = useState<Array<Option<string>> | undefined>(undefined);

  return (
    <>
      <P.FiltersWrapper>
        <Filters
          selectedYear={selectedYear}
          selectedGroup={selectedGroup}
          setSelectedYear={setSelectedYear}
          setSelectedGroup={setSelectedGroup}
        />
      </P.FiltersWrapper>
      {grades?.map((group) => {
        const isHidden =
          (selectedYear?.length && selectedYear.every(({ value }) => value !== group.year)) ||
          (selectedGroup?.length && selectedGroup.every(({ value }) => value !== group.group));

        return (
          <GroupGrades
            key={`${group.year}-${group.group}`}
            {...group}
            hide={!!isHidden}
          />
        );
      })}
    </>
  );
};


export default TeacherGradesList;