import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageListRequest } from '~/src/store/messages/actions';
import { getMessagesList } from '~/src/store/messages/selectors';
import { ApplicationState } from '~/src/store/configuration/constants';
import * as P from './parts';
import PageWrapper from '../../Components/Containers/PageWrapper/PageWrapper';
import { Helmet } from 'react-helmet';
import plus from '~/assets/plus.svg';
import MessageModal from './Modal/MessageModal';
import { useNavigate } from 'react-router';

const Messages: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const messages = useSelector((state: ApplicationState) => getMessagesList(state));
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getMessageListRequest(''));
  }, [dispatch]);

  const handleClick = (id?: string) => {
    setModalOpen(true)
    if (id) {
      navigate(`/messages?messageId=${id}`, { replace: true, })
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      navigate(`/messages`, { replace: true, })
    }, 200)
  };


  return (
    <PageWrapper>
      <Helmet>
        <title>Wiadomości</title>
        <meta name="description" content={'to jest system zzarządzania uczelnianego'} />
      </Helmet>

      <P.PageWrapper>
        <P.Header>Lista wiadomości</P.Header>
        <P.AddButton
          title="Nowa wiadomość"
          onClick={() => handleClick()}
          icon={plus}
        />
        <P.MessageList>
          {messages.map((message) => (
            <P.MessageRow
              key={message.id}
              title={message.title}
              $isReaded={message.isReaded}
              onClick={() => handleClick(message.id)}
            />
          ))}
        </P.MessageList>
        <MessageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </P.PageWrapper>
    </PageWrapper>
  );
};

export default Messages;