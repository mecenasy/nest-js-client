import React, { RefObject, useImperativeHandle, useState } from 'react';
import getOrCreateReactPortalsDiv from '~/utils/portalContainer';
import ModalBase, {} from 'react-modal';
import * as P from './parts';
import close from '~/assets/cross.svg';

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
  title: string;
  ref: RefObject<ModalRef | null>
}

ModalBase.setAppElement('#app');

export interface ModalRef {
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const Modal = ({
  onClose,
  children,
  title,
  ref,
}: ModalProps) => {
  const [isOpen, setOpen] = useState(false)

  useImperativeHandle<ModalRef, ModalRef>(ref, () => ({
    toggle: () => setOpen((prev) => !prev),
    open: () => setOpen(true),
    close: () => setOpen(false)
  }));

  const handleClose = () => {
    onClose?.();
    setOpen(false)
  }

  if (SERVER_BUILD) {
    return null
  }

  const customStyle: ModalBase.Styles = {
    overlay: {
      zIndex: 10,
      backgroundColor: 'rgba(230, 230, 230,0.4)',
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
    <>
      <P.Global />
      <ModalBase
        isOpen={isOpen}
        parentSelector={getOrCreateReactPortalsDiv}
        style={customStyle}
        closeTimeoutMS={200}
        onRequestClose={handleClose}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
      >
        <P.TitleWrapper>
          <P.Title>{title}</P.Title>
          <P.Button onClick={handleClose} icon={close} />
        </P.TitleWrapper>
        {children}
      </ModalBase>
    </>
  )
};

export default Modal;
