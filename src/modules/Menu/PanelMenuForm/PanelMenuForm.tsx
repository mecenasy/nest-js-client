import React from 'react';
import * as P from './parts';
import { MenuItemData, MenuItemField } from '~/src/store/panelMenu/constants';
import { InputField } from '../../Components/Input/InputWithLabel';
import { ToggleField } from '../../Components/Input/Toggle';
import { DropzoneField } from '../../Components/Input/Dropzone';
import { SelectField } from '../../Components/Input/Dropdown';
import { getMenuItemById } from '~/src/store/panelMenu/selectors';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/src/store/configuration/constants';
import { MenuSide } from '~/src/store/menu/constants';
import { addMenuItemsRequest } from '~/src/store/panelMenu/reducers';
import { validateMenuItem } from './helpers';
import { roleSelector } from '~/src/store/role/selectors';
import FormAdapter from '../../Components/FormWrapper/FormAdapter';
import { useDispatch } from 'react-redux';

interface PanelMenuFormProps {
  initialId: string;
  onClose: () => void;
}

const PanelMenuForm = ({ initialId, onClose }: PanelMenuFormProps) => {
  const initialValues = useSelector<ApplicationState, MenuItemData | undefined>((state) => getMenuItemById(state, initialId))
  const defaultValues: MenuItemData = {
    name: '',
    shortName: '',
    position: 0,
    hidden: false,
    menuSide: MenuSide.Left,
    sideBoolean: false,
    link: '',
    role: [],
    image: undefined,
  };
  const dispatch = useDispatch();
  const roles = useSelector(roleSelector)
  const onSubmit = async (value: MenuItemData) => {
    await new Promise((resolve, reject) => {

      dispatch(addMenuItemsRequest({
        ...value,
        [MenuItemField.Side]: value[MenuItemField.SideBoolean] ? MenuSide.Right : MenuSide.Left,
        resolve,
        reject
      }))
    });

    onClose();
  }


  return (
    <div>
      <FormAdapter<MenuItemData>
        onSubmit={onSubmit}
        initialValues={initialValues || defaultValues}
        validate={validateMenuItem}
      >
        {({ form }) => (
          <>
            <InputField
              form={form}
              name={MenuItemField.Name}
              type={'text'}
              placeholder={'Podaj nazwę'}
              label={'Nazwa menu'}
            />
            <InputField
              form={form}
              name={MenuItemField.ShortName}
              type={'text'}
              placeholder={'Podaj krutką nazwę'}
              label={'Krutka nazwa menu'}
            />
            {/*docelowo ma się tworzyć automatycznie */}
            <InputField
              form={form}
              name={MenuItemField.Position}
              type={'number'}
              placeholder={'Pozycja'}
              label={'Pozycja menu'}
            />
            <div>
              <ToggleField
                form={form}
                name={MenuItemField.Hidden}
                icons={false}
                label={'Menu widoczne'}
                leftText={'widoczne'}
                rightText={'nie widoczne'}
              />
              <ToggleField
                form={form}
                name={MenuItemField.SideBoolean}
                icons={false}
                label={'Strona menu'}
                leftText={'lewa'}
                rightText={'prawa'}
              />
            </div>
            <InputField
              form={form}
              name={MenuItemField.Link}
              type={'text'}
              placeholder={'Podaj link do menu'}
              label={'Link do menu'}
            />
            <SelectField
              form={form}
              name={MenuItemField.Role}
              placeholder={'wybież dla kogo dostępne jest menu'}
              label={'Przeznaczenie  menu'}
              options={roles}
              isMulti
            />
            <DropzoneField
              form={form}
              name={MenuItemField.Image}
              multiple={false}
              label={'Ikona menu'}
            />
            <P.SubmitButton type={'submit'}>zapisz</P.SubmitButton>
          </>
        )}
      </FormAdapter>
    </div>
  )
};

export default PanelMenuForm;
