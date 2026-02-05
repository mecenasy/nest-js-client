
import React, { FC } from 'react';
import * as P from '../parts';
import { MenuSide } from '~/src/store/menu/constants';

interface MenuDataProps {
  name: string
  shortName: string;
  position: number;
  hidden: boolean;
  link: string;
  menuSide: string;
}

const MenuData: FC<MenuDataProps> = ({
  name,
  shortName,
  position,
  hidden,
  link,
  menuSide
}) => (

  <P.BoxColumn columnWidth={250} direction={'row'}>
    <P.BoxInnerColumn  >
      <div>nazwa : </div>
      <div>krutka nazwa :</div>
      <div>pozycja :</div>
      <div>uryte menu :</div>
      <div>link :</div>
      <div>strona nemu :</div>
    </P.BoxInnerColumn>
    <P.BoxInnerColumn>
      <div>{name}</div>
      <div>{shortName || 'brak krótkiej nazwy'}</div>
      <div>{position}</div>
      <div>{hidden ? 'menu ukryte' : 'menu widocznne'}</div>
      <div>{link}</div>
      <div>{menuSide === MenuSide.Left ? 'strona lewa' : 'strona prawa'}</div>
    </P.BoxInnerColumn>
  </P.BoxColumn>
);

export default MenuData;
