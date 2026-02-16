import React, { Dispatch, SetStateAction } from 'react';
import { Select } from '../../Components/Input/Dropdown';
import { useSelector } from 'react-redux';
import { getFilterOptionsSelector } from '~/src/store/grade/reducer';
import { Option } from '../../Components/Input/types';

interface FiltersProps {
  selectedYear: Array<Option<string>> | undefined;
  selectedGroup: Array<Option<string>> | undefined;
  setSelectedYear: Dispatch<SetStateAction<Option<string>[] | undefined>>
  setSelectedGroup: Dispatch<SetStateAction<Option<string>[] | undefined>>
}

const Filters = ({
  selectedYear,
  selectedGroup,
  setSelectedYear,
  setSelectedGroup,
}: FiltersProps) => {
  const { yearOptions, groupOptions } = useSelector(getFilterOptionsSelector);

  return (
    <>
      <Select
        instan
        label={"Rok"}
        name={'year'}
        options={yearOptions}
        value={selectedYear}
        onChange={setSelectedYear}
        isMulti
        isClearable
        placeholder="Wybierz rok"
      />
      <Select
        label={"Grupa"}
        name={'group'}
        isMulti
        options={groupOptions}
        value={selectedGroup}
        onChange={setSelectedGroup}
        isClearable
        placeholder="Wybierz grupę"
      />
    </>
  )
};

export default Filters;
