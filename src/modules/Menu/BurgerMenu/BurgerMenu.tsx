import React, { FC, useCallback, useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from "react-dom";
import { useSelector } from 'react-redux';
import { useSpring, animated } from '@react-spring/web';
import getOrCreateReactPortalsDiv from '~/utils/portalContainer';
import { getMenuSelector } from '~/src/store/menu/selectors';
import * as P from './parts';


interface BurgerMenuProps {
  onCloseMenu: () => void
  onCloseMenuCallback: (callBack: () => void) => void
}

export const BurgerMenu: FC<BurgerMenuProps> = ({
  onCloseMenu,
  onCloseMenuCallback,
}: any) => {
  const parent = getOrCreateReactPortalsDiv();

  const { leftSide } = useSelector(getMenuSelector);
  const [opening, setOpening] = useState(true);
  const renderedRef = useRef(false);

  const onRest = useCallback(() => {
    if (renderedRef.current) {
      onCloseMenu();
    } else {
      renderedRef.current = true;
    }
  }, [onCloseMenu]);

  const props = useSpring({
    config: { duration: 200 },
    onRest,
    from: { width: "0px" },
    to: { width: opening ? "300px" : "0px" }
  });

  useLayoutEffect(() => {
    onCloseMenuCallback(() => { onClickBurger() })
  }, [onCloseMenuCallback]);

  const onClickBurger = () => { setOpening(false); }

  return createPortal((
    <>
      <P.Overlay onClick={onClickBurger} />
      <P.MenuBurgerWrapper>
        <animated.div style={{ ...props, overflow: "hidden" }}>
          <P.MenuBurgerInnerWrapper>
            {leftSide.map(({ link, image, name, hidden }) => hidden
              ? null
              : (
                <P.Link to={link} key={link} onClick={onClickBurger}>
                  <P.MenuBurgerItem>
                    <P.Image src={image} />
                    <P.Text>{name}</P.Text>
                  </P.MenuBurgerItem>
                </P.Link>
              ))}
          </P.MenuBurgerInnerWrapper>
        </animated.div>
      </P.MenuBurgerWrapper>
    </>
  ), parent);
};