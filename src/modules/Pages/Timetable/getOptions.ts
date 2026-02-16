import { Option } from '~/src/modules/Components/Input/types';
import { Subject } from '~/src/store/subject/constants';

export const getOption = (data: string | string[] | undefined): Option<string>[] | undefined => {
  if (typeof data === 'string') {
    return [
      {
        label: data,
        value: data,
      },
    ];
  }

  return data?.length
    ? data.map((item: string) => ({
        label: item,
        value: item,
      }))
    : undefined;
};

export const getSubjectOption = (data: Subject[]): Option<Subject>[] => {
  return data.map((item: Subject) => ({
    label: item.name,
    value: item,
  }));
};
