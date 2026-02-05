import React, { FC, useCallback, useContext, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { ResponsiveContext } from '../../Providers/ResponsiveProvider/ResponsiveProvider';
import { getMenuSelector } from '../../store/menu/selectors';
import MenuItem from '../MenuItem/MenuItem';
import * as P from './parts';
import burger from '~/assets/menu.svg';
import { MenuSide } from '../../store/menu/constants';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';

const Menu: FC = () => {
  const [showCounter, setCounter] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  const { leftSide, rightSide } = useSelector(getMenuSelector);
  const { isMobile } = useContext(ResponsiveContext);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const callBackRef = useRef(() => {});

  const onClickBurger = useCallback(() => {
    if (showMenu) {
      callBackRef.current();
    } else {
      setShowMenu(true);
    }
  }, [showMenu]);

  const onCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const setCloseMenuCallback = useCallback((callBack: () => void) => {
    callBackRef.current = callBack
  }, []);

  const onClick = useCallback(() => {
    setCounter((count) => ++count);
  }, []);

  const isMenuShow = !(pathname === '/' || pathname === '/login');

  return (
    <>
      <P.Wrapper $show={isMenuShow} >
        <P.MenuWrapper onClick={onClick}>
          {isMobile
            ? (
              <MenuItem
                isSmall
                asButton
                name={''}
                menuSide={MenuSide.Left}
                position={0}
                link={''}
                onClick={onClickBurger}
                image={burger}
              />)
            : leftSide.map((item) => (
              <MenuItem
                forceShow={item.link === '/' || !(item.hidden && showCounter < 5)}
                isSmall
                key={item.link}
                {...item}
              />
            ))}
        </P.MenuWrapper>
        <P.UserWrapper >
          {rightSide.map((item) => (
            <MenuItem
              forceShow
              isSmall
              key={item.link}
              {...item}
            />
          ))}
        </P.UserWrapper>
      </P.Wrapper>
      {showMenu &&
        <BurgerMenu
          onCloseMenu={onCloseMenu}
          onCloseMenuCallback={setCloseMenuCallback}
        />
      }
    </>
  )
};

export default Menu;
