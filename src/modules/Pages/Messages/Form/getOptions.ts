import { Option } from '~/src/modules/Components/Input/types';
import { SimplePerson } from '~/src/store/person/constants';

export const getOption = (data: SimplePerson[] | undefined): Option<string>[] => {
  if (typeof data === 'undefined') {
    return [];
  }

  return data?.length ? data.map((item: SimplePerson) => ({
    label: item.fullName,
    value: item.id,
  })) : [];
};