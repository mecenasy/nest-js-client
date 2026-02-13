import React, { FC, useCallback } from 'react';
import * as P from './parts';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedFilters, getUserListFilters } from '~/src/store/userList/reducer';
import { setFilter } from '~/src/store/userList/reducer';
import { Option } from '~/src/modules/Components/Input/types';
import { Select } from '~/src/modules/Components/Input/Dropdown';
import { getOption } from './getOptions';



const Filters: FC = () => {
  const filters = useSelector(getUserListFilters);
  const selectedFilters = useSelector(getSelectedFilters);
  const dispatch = useDispatch();
  const filtersKeys = Object.keys(filters);

  const onFilterChange = useCallback((name: string) => {
    return (option: Option<string> | Option<string>[]) => {
      if (Array.isArray(option)) {
        const selectedValue = option.map((item: Option<string>) => item.value);
        dispatch(setFilter({ name, value: option.length > 0 ? selectedValue : undefined }));
      }
      if (!Array.isArray(option) && option?.value) {
        dispatch(setFilter({ name, value: option.value ?? undefined }));
      }
    };
  }, [dispatch]);


  return (
    <P.LeftColumn>
      <h3>Filtry</h3>
      <div>
        {filtersKeys.map((key: string) => (
          <Select<string>
            id={key}
            instanceId={key}
            value={getOption(selectedFilters[key])}
            isMulti={!(key === 'orderBy' || key === 'orderType')}
            label={key}
            key={key}
            onChange={onFilterChange(key)}
            name={key}
            options={getOption(filters[key]) || []}
          />
        )
        )}
      </div>
    </P.LeftColumn>
  )
};

export default Filters;
