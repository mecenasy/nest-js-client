import React, { FC, useCallback, useRef, useState } from 'react';
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { loggedInStatusSelector } from "~/src/store/auth/reducers";
import { LoggedStatus } from "~/src/store/auth/constants";
import { getMenuItems } from '~/src/store/panelMenu/selectors';
import Loadable from '@react-loadable/revised';
import PanelMenuForm from '../../Menu/PanelMenuForm/PanelMenuForm';
import { removeMenuItemsRequest } from '~/src/store/panelMenu/reducers';
import MenuControl from './MenuControl';
import Item from './MenuItem/MenuItem';
import { ModalRef } from '../../Components/Modal/Modal';
import { roleSelector } from '~/src/store/role/selectors';

const Modal = Loadable({
  loader: async () => import('../../Components/Modal/Modal'),
  loading: () => null,
});

const PanelMenu: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const menus = useSelector(getMenuItems);
  const roles = useSelector(roleSelector)
  const [id, setId] = useState('');
  const modalRef = useRef<ModalRef>(null);
  const [activeRole, setRule] = useState<string>('');

  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    modalRef.current?.close();
    setId('');
  }, []);

  const onSetRole = useCallback((role: string) => () => {
    setRule(role)
  }, []);

  const onRemoveMenuItem = useCallback((id: string) => () => {
    dispatch(removeMenuItemsRequest(id))
  }, [dispatch]);

  const onEditMenuItem = useCallback((id: string) => () => {
    setId(id);
    modalRef.current?.open();
  }, []);

  const onAddMenuItem = useCallback(() => {
    setId('');
    modalRef.current?.close();
  }, []);

  return (
    <PageWrapper >
      <Helmet>
        <title>Konfiguracja manu</title>
        <meta name="description" content={'to jest system zarządzania uczelnianego'} />
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
          <Modal
            onClose={onClose}
            ref={modalRef}
            title={'Dodawanie menu'}
          >
            <PanelMenuForm initialId={id} onClose={onClose} />
          </Modal>
        </P.MenuPanelWrapper>
      )}
    </PageWrapper >
  )
};

export default PanelMenu;
