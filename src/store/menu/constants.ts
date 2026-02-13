export enum MenuSide {
  Left = 'left',
  Right = 'right',
}

export interface PartsMenu {
  leftSide: Menu[];
  rightSide: Menu[];
}

export interface Menu {
  name: string;
  shortName?: string;
  menuSide: MenuSide;
  position: number;
  link: string;
  image: string;
  hidden?: boolean;
  counter?: number;
}

export type MenuState = Menu[];

export const initialState: Menu[] = [];
