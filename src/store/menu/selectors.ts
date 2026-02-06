import { createSelector } from "reselect";
import { ApplicationState } from "../configuration/constants";
import { Menu, MenuSide } from "./constants";
import { unReadedSelector } from '../notification/selectors';

export const menuSelector = ({ menu }: ApplicationState) => menu;

export const getMenuSelector = createSelector(
  menuSelector, unReadedSelector,
  (menu, unReded) => {
    const leftSide: Menu[] = [];
    const rightSide: Menu[] = [];

    menu.forEach((item: Menu) => {
      const newIte = { ...item }
      if (newIte.link.includes('message')) {
        newIte.counter = unReded;
      }
      if (newIte.menuSide === MenuSide.Left) {
        leftSide.push(newIte);
      } else {
        rightSide.push(newIte);
      }
    });

    return {
      leftSide,
      rightSide,
    }
  }
)
