import React, { FC, useCallback, useState } from 'react';
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { loggedInStatusSelector } from "~/src/store/auth/selectors";
import { LoggedStatus } from "~/src/store/auth/constants";
import { getMenuItems } from '~/src/store/panelMenu/menu/selectors';
import Loadable from '@react-loadable/revised';
import PanelMenuForm from '../../Menu/PanelMenuForm/PanelMenuForm';
import { removeMenuItemsRequest } from '~/src/store/panelMenu/menu/actions';
import { ApplicationState } from '~/src/store/configuration/constants';
import { roleSelector } from '~/src/store/role/selectors';
import { Option } from '../../Components/Input/types';
import MenuControl from './MenuControl';
import Item from './MenuItem/MenuItem';

const Modal = Loadable({
  loader: async () => import('../../Components/Modal/Modal'),
  loading: () => null,
});

const PanelMenu: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const menus = useSelector(getMenuItems);
  const roles = useSelector<ApplicationState, Option<string>[]>(roleSelector)
  const [id, setId] = useState('');

  const [activeRole, setRule] = useState<string>('');
  const [isOpenModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = useCallback(() => {
    setOpenModal((prev) => !prev);
    if (isOpenModal) {
      setId('');
    }
  }, [isOpenModal]);

  const onSetRole = useCallback((role: string) => () => {
    setRule(role)
  }, []);

  const onRemoveMenuItem = useCallback((id: string) => () => {
    dispatch(removeMenuItemsRequest(id))
  }, [dispatch]);

  const onEditMenuItem = useCallback((id: string) => () => {
    setId(id);
    toggleModal();
  }, [toggleModal]);

  const onAddMenuItem = useCallback(() => {
    setId('');
    toggleModal();
  }, [toggleModal]);

  return (
    <PageWrapper >
      <Helmet>
        <title>System zarządzania uczelnianego</title>
        <meta name="description" content={'to jest system zzarządzania uczelnianego'} />
      </Helmet>
      {isLoggedIn === LoggedStatus.LoggedIn && (
        <P.MenuPanelWrapper >
          <h1>Konfiguracja Menu</h1>
          <MenuControl
            onAddMenuItem={onAddMenuItem}
            onSetRole={onSetRole}
            roles={roles}
          />
          {menus
            .filter(({ role }) => !activeRole || role.includes(activeRole))
            .map((item, index) => (
              <Item
                key={index}
                menu={item}
                onEditMenuItem={onEditMenuItem(item.id)}
                onRemoveMenuItem={onRemoveMenuItem(item.id)}
              />
            ))}
          {!SERVER_BUILD && (
            <Modal
              onClose={toggleModal}
              isOpen={isOpenModal}
              title={'Dodawanie menu'}
            >
              <PanelMenuForm initialId={id} onClose={toggleModal} />
            </Modal>
          )}
        </P.MenuPanelWrapper>
      )}
    </PageWrapper >
  )
};

export default PanelMenu;
