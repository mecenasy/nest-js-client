import React, { FC, useCallback } from 'react';
import * as P from './parts';
import { Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import { MenuItemAction, MenuItemData, MenuItemActionType, MenuItemField } from '~/src/store/panelMenu/menu/constants';
import { SetPayload } from '../../Components/FormWrapper/FormWrapper';
import InputWithLabel from '../../Components/Input/InputWithLabel';
import Toggle from '../../Components/Input/Toggle';
import Dropzone from '../../Components/Input/Dropzone';
import Dropdown from '../../Components/Input/Dropdown';
import { getMenuItemById } from '~/src/store/panelMenu/menu/selectors';
import { useSelector } from 'react-redux';
import { ApplicationState } from '~/src/store/configuration/constants';
import { MenuSide } from '~/src/store/menu/constants';
import { roleSelector } from '~/src/store/role/selectors';
import { Option } from '../../Components/Input/types';
import { setMenuItemsRequest } from '~/src/store/panelMenu/menu/actions';
import { validateMenuItem } from './helpers';

interface PanelMenuFormProps {
  initialId: string;
  onClose: () => void;
}

const PanelMenuForm: FC<PanelMenuFormProps> = ({ initialId, onClose }) => {
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
  }
  const roles = useSelector<ApplicationState, Option<string>[]>(roleSelector)
  const setPayload: SetPayload<MenuItemAction, MenuItemData> = (action, value) => {
    return setMenuItemsRequest(value)
  }
  const geyPayload: SetPayload<MenuItemAction, MenuItemData> = (action, value) => {
    onClose();
    return action
  }

  const menuSideDecorator = useCallback(createDecorator({
    field: MenuItemField.SideBoolean,
    updates: {
      [MenuItemField.Side]: (value: boolean,) => value ? MenuSide.Right : MenuSide.Left
    },
  }), []);

  return (
    <div>
      <P.FromWrapper
        start={MenuItemActionType.SetMenuItemsRequest}
        resolve={MenuItemActionType.SetMenuItemsSuccess}
        reject={MenuItemActionType.SetMenuItemsFail}
        setPayload={setPayload}
        getPayload={geyPayload}

        initialValues={initialValues || defaultValues}
        decorators={[menuSideDecorator]}
        validate={validateMenuItem}
      >
        {(() => (
          <>
            <Field
              name={MenuItemField.Name}
              component={InputWithLabel}
              type={'text'}
              placeholder={'Podaj nazwę'}
              label={'Nazwa menu'}
            />
            <Field
              name={MenuItemField.ShortName}
              component={InputWithLabel}
              type={'text'}
              placeholder={'Podaj krutką nazwę'}
              label={'Krutka nazwa menu'}
            />
            {/*docelowo ma się tworzyć automatycznie */}
            <Field
              name={MenuItemField.Position}
              component={InputWithLabel}
              type={'number'}
              placeholder={'Pozycja'}
              label={'Pozycja menu'}
            />
            <div>
              <Field
                name={MenuItemField.Hidden}
                component={Toggle}
                type="checkbox"
                icons={false}
                label={'Menu widoczne'}
                leftText={'widoczne'}
                rightText={'nie widoczne'}
              />
              <Field
                name={MenuItemField.SideBoolean}
                component={Toggle}
                type="checkbox"
                icons={false}
                label={'Strona menu'}
                leftText={'lewa'}
                rightText={'prawa'}
              />
            </div>
            <Field
              name={MenuItemField.Link}
              component={InputWithLabel}
              type={'text'}
              placeholder={'Podaj link do menu'}
              label={'Link do menu'}
            />
            <Field
              name={MenuItemField.Role}
              component={Dropdown}
              placeholder={'wybież dla kogo dostępne jest menu'}
              label={'Przeznaczenie  menu'}
              options={roles}
              isMulti
            />
            <Field
              name={MenuItemField.Image}
              component={Dropzone}
              type={'file'}
              label={'Ikona menu'}
            />
            <P.SubmitButton type={'submit'}>zapisz</P.SubmitButton>
          </>
        ))}
      </P.FromWrapper>
    </div>
  )
};

export default PanelMenuForm;
