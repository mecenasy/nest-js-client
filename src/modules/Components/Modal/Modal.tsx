import React from 'react';
import getOrCreateReactPortalsDiv from '~/utils/portalContainer';
import ModalBase, {} from 'react-modal';
import * as P from './parts';
import close from '~/assets/cross.svg';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
}

ModalBase.setAppElement('#app');

const Modal = ({
  onClose,
  isOpen,
  children,
  title,
}: ModalProps) => {
  if (SERVER_BUILD) {
    throw new Error('Component must be rendered only client side');
  }

  const customStyle: ModalBase.Styles = {
    overlay: {
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      paddingTop: '0',
      width: '500px',
      inset: 'unset',
    },
  }

  return (
    <ModalBase
      isOpen={isOpen}
      parentSelector={getOrCreateReactPortalsDiv}
      style={customStyle}
      closeTimeoutMS={200}
      onRequestClose={onClose}

      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldFocusAfterRender
      shouldReturnFocusAfterClose

    >
      <P.TitleWrapper>
        <P.Title>{title}</P.Title>
        <P.Button onClick={onClose} icon={close} />
      </P.TitleWrapper>
      {children}
    </ModalBase>
  )
};

export default Modal;
