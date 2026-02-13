import React, { useCallback, useState } from 'react';
import * as P from './parts';
import { InputType } from '../../../Components/Input/types';
import { SelectField } from '../../../Components/Input/Dropdown';
import { FormRenderProps } from 'react-final-form-hooks';
import { useSelector } from 'react-redux';
import { getGroup, getSpecialty, getYear } from '~/src/store/university/reducer';
import { getSimpleUsersSelector } from '~/src/store/userList/reducer';
import { getOption, getTeacherOption } from '../helpers';
import { SubjectFormData } from './SubjectForm';
import remove from '~/assets/cross.svg'
import useFieldArray from '../../../../final-form/useFieldsArray';
import { InputField } from '../../../Components/Input/InputWithLabel';
import { useSpring } from '@react-spring/web';

export enum Fields {
  Name = 'name',
  Auditorium = 'auditorium',
  Years = 'years',
  Groups = 'groups',
  Teachers = 'teachers',
  Specialties = 'specialties'
}

interface SubjectFieldsProps extends FormRenderProps<SubjectFormData> {
  index: number
  added: boolean,
}

const SubjectFields = ({ form, index = 0, added = false }: SubjectFieldsProps) => {
  const specialties = useSelector(getSpecialty);
  const years = useSelector(getYear);
  const groups = useSelector(getGroup);
  const teachers = useSelector(getSimpleUsersSelector) ?? [];

  const [visible, setVisible] = useState(false);

  const onRemove = useCallback(() => {
    form.mutators.pop(`subjects`);
  }, [form.mutators]);

  const props = useSpring({
    config: { duration: 300 },
    onRest: () => {
      setVisible(true);
    },
    from: { height: "0px" },
    to: { height: added ? "60px" : "520px" }
  });

  return (
    <P.Animated style={{ ...props, overflow: !visible || added ? 'hidden' : 'visible' }}>
      <div>
        <InputField
          form={form}
          name={`subjects.[${index}]${Fields.Name}`}
          inputType={InputType.all}
          label={'Nazwa Przedmiotu'}
          placeholder={'wpisz nazwę przedmioty'}
          disabled={added}
        />
        <InputField
          form={form}
          name={`subjects.[${index}]${Fields.Auditorium}`}
          inputType={InputType.all}
          label={'Audytorium'}
          placeholder={'wpisz audytorium'}

        />
        <SelectField
          form={form}
          name={`subjects.[${index}]${Fields.Specialties}`}
          label='Specjalności'
          isMulti
          options={getOption(specialties)}
        />
        <SelectField
          form={form}

          name={`subjects.[${index}]${Fields.Groups}`}
          label={'Grupy'}
          isMulti
          options={getOption(groups)}
        />
        <SelectField
          form={form}
          name={`subjects.[${index}]${Fields.Years}`}

          label={'Lata'}
          isMulti
          options={getOption(years)}
        />
        <SelectField
          form={form}
          name={`subjects.[${index}]${Fields.Teachers}`}

          label='Nauczyciel'
          isMulti={false}
          options={getTeacherOption(teachers)}
        />
      </div>
      {added && <P.Button type='button' icon={remove} onClick={onRemove} />}
    </P.Animated>
  )
};


export const FieldsArray = (props: FormRenderProps<SubjectFormData>) => {
  const { fields } = useFieldArray('subjects', props.form);

  return fields.map(
    (field, index) => <SubjectFields key={field}{...props} index={index} added={fields.length > index + 1} />
  )
}