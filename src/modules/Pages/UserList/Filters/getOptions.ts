import { Option } from '~/src/modules/Components/Input/types';

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
