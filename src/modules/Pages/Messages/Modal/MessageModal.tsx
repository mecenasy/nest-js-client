import React, { FC, RefObject } from 'react';
import MessageView from '../View/MessageView';
import MessageForm from '../Form/MessageForm';
import Modal, { ModalRef } from '../../../Components/Modal/Modal';
import { ApplicationState } from '~/src/store/configuration/constants';
import { getMessageById } from '~/src/store/messages/selectors';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

interface MessageModalProps {
  onClose: () => void;
  ref: RefObject<ModalRef | null>;
}

const MessageModal: FC<MessageModalProps> = ({ onClose, ref }) => {
  const { search } = useLocation()

  const message = useSelector(
    (state: ApplicationState) => getMessageById(state, new URLSearchParams(search).get('messageId'))
  );

  return (
    <Modal
      ref={ref}
      onClose={onClose}
      title={search ? 'Szczegóły wiadomości' : 'Nowa wiadomość'}
    >
      {search
        ? <MessageView message={message} />
        : <MessageForm messageId={''} onSuccess={onClose} />
      }
    </Modal>
  )
};

export default MessageModal;