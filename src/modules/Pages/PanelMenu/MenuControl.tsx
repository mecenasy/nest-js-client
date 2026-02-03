import React, { FC } from 'react';
import * as P from './parts';
import plus from '~/assets/plus.svg';
import { Option } from '../../Components/Input/types';


interface MenuControlProps {
  roles: Option<string>[];
  onSetRole: (role: string) => () => void;
  onAddMenuItem: () => void;
}

const MenuControl: FC<MenuControlProps> = ({
  onAddMenuItem,
  onSetRole,
  roles,
}) => (
  <>
    <P.SortButtonWrapper>
      {roles.map((role, index) => (
        <P.SortButton key={index} onClick={onSetRole(role.value)}>
          <span>{role.label}</span>
        </P.SortButton>
      ))}
    </P.SortButtonWrapper>
    <P.AddItemButton onClick={onAddMenuItem}>
      <P.Pen src={plus} />
      <P.AddItemText>Dodaj nowe menu</P.AddItemText>
    </P.AddItemButton>
  </>
);

export default MenuControl;
