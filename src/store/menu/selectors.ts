import { createSelector } from "reselect";
import { ApplicationState } from "../configuration/constants";
import { Menu, MenuSide } from "./constants";

export const menuSelector = ({ menu }: ApplicationState) => menu;

export const getMenuSelector = createSelector(
  menuSelector,
  (menu) => {
    const leftSide: Menu[] = [];
    const rightSide: Menu[] = [];

    menu.forEach((item) => {
      if (item.menuSide === MenuSide.Left) {
        leftSide.push(item);
      } else {
        rightSide.push(item);
      }
    });

    return {
      leftSide,
      rightSide,
    }
  }
)
