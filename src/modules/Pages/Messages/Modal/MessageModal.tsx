import React, { FC } from 'react';
import MessageView from '../View/MessageView';
import MessageForm from '../Form/MessageForm';
import Modal from '../../../Components/Modal/Modal';
import { ApplicationState } from '~/src/store/configuration/constants';
import { getMessageById } from '~/src/store/messages/selectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

interface MessageModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const MessageModal: FC<MessageModalProps> = ({ isOpen, onClose }) => {
  const { location: { search } } = useHistory()

  const message = useSelector(
    (state: ApplicationState) => getMessageById(state, new URLSearchParams(search).get('messageId'))
  );

  return (
    <>
      {!SERVER_BUILD && (
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          title={search ? 'Szczegóły wiadomości' : 'Nowa wiadomość'}
        >
          {search
            ? <MessageView message={message} />
            : <MessageForm messageId={''} onSuccess={onClose} />
          }
        </Modal>
      )}
    </>
  )
};

export default MessageModal;