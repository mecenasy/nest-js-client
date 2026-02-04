import React, { FC } from 'react';
import * as P from './parts';
import plus from '~/assets/plus.svg';
import { Option } from '../../Components/Input/types';
import WhiteButton from '../../Components/Buttons/IconButton';


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
  <P.Wrapper>
    <P.SortButtonWrapper>
      {roles.map((role, index) => (
        <WhiteButton
          key={index}
          onClick={onSetRole(role.value)}
          title={role.label}
        />
      ))}
    </P.SortButtonWrapper>
    <WhiteButton
      title="Dodaj nowe menu"
      icon={plus}
      onClick={onAddMenuItem}>
    </WhiteButton>
  </P.Wrapper>
);

export default MenuControl;
