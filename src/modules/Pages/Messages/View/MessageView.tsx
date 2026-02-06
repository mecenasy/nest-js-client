import React, { FC, useCallback, useRef, useState } from 'react';
import * as P from './parts';
import { useSpring } from '@react-spring/web'
import close from '~/assets/cross.svg';
import MessageForm from '../Form/MessageForm';
import MessageItem, { MessageProps } from './MessageItem';
import { useDispatch } from 'react-redux';
import { getMessageRequest } from '~/src/store/messages/actions';

const MessageView: FC<Omit<MessageProps, 'setId'>> = ({ message }) => {
  const [id, setId] = useState<string>('');
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const onSuccess = useCallback(() => {
    dispatch(getMessageRequest(message?.id ?? ''))
    setId('');
  },
    [message?.id, dispatch])

  const style = useSpring({
    config: { duration: 200 },
    from: { height: "0px" },
    to: { height: id ? `${ref.current?.clientHeight}px` : "0px" }
  });

  const onScroll = useCallback((left: number, top: number) => {
    ref.current?.scrollTo({ behavior: 'smooth', top, left })
  }, []);

  if (!message) {
    return <div>Ładowanie...</div>;
  }


  return (
    <P.Wrapper ref={ref}>
      <div>
        <MessageItem onScroll={onScroll} setId={setId} message={message} />
      </div>
      <P.ReplyMessageWrapper style={style}>
        <P.ReplyMessage>
          <P.Button onClick={() => setId('')} icon={close} />
          <MessageForm messageId={id} onSuccess={onSuccess} />
        </P.ReplyMessage>
      </P.ReplyMessageWrapper>
    </P.Wrapper>
  );
};


export default MessageView;
