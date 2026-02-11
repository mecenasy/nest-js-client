import React, { FC } from 'react';
import * as P from '../parts';
import MenuPhoto from './MenuPhoto';
import MenuData from './MenuData';
import ActionButtons from '../../../Components/ActionButons/ActionButtons';
import MenuItem from '~/src/modules/MenuItem/MenuItem';
{}
interface MenuIteProps {
  onEditMenuItem: () => void;
  onRemoveMenuItem: () => void;
  menu: MenuItem;
}

const Item: FC<MenuIteProps> = ({
  onEditMenuItem,
  onRemoveMenuItem,
  menu
}) => (
  <P.Box>
    <MenuPhoto image={menu.image} />
    <MenuData
      name={menu.name}
      shortName={menu.shortName || ''}
      position={menu.position || 0}
      hidden={menu.hidden || false}
      link={menu.link}
      menuSide={menu.menuSide}
    />
    <ActionButtons
      onEdit={onEditMenuItem}
      onRemove={onRemoveMenuItem}
    />
  </P.Box>
);

export default Item
