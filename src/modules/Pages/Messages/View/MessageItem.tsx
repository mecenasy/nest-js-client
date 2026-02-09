import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as P from './parts';
import { animated, useSpring } from '@react-spring/web'
import { File, Message } from '~/src/store/messages/constants';
import fileIcon from '~/assets/document.svg';
import replay from '~/assets/reply-all.svg';
import { useDispatch } from 'react-redux';
import { getFileRequest, readedMessageRequest } from '~/src/store/messages/actions';
import { unReadedDown } from '~/src/store/notification/actions';

export interface MessageProps {
  message?: Message;
  setId: (id: string) => void;
  onScroll?: (left: number, top: number) => void
}

const MessageItem: FC<MessageProps> = ({ onScroll, setId, message }) => {
  const [isOpen, setOpen] = useState(false);
  const [isReaded, setReaded] = useState(message?.isReaded ?? false);
  const ref = useRef<HTMLDivElement>(null);
  const refAnimated = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const onDownload = (file: File) => (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    dispatch(getFileRequest(file))
  }

  const onReply = useCallback((evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    setId(message?.id ?? '');
  }, [message?.id, setId]);

  const onToggle = useCallback(() => {
    if (!isReaded) {
      setReaded(true);
      dispatch(unReadedDown());
      dispatch(readedMessageRequest(message?.id ?? ''));
    }
    setOpen((prev) => !prev);
  }, [isReaded, message?.id, dispatch]);

  const style = useSpring({
    config: { duration: 200 },
    from: { height: "0px" },
    to: { height: isOpen ? `${ref.current?.clientHeight}px` : "0px" }
  });

  useEffect(() => {
    if (!refAnimated.current?.nextSibling && refAnimated.current) {
      setTimeout(() => {
        if (refAnimated.current) {
          onScroll?.(0, refAnimated.current.scrollHeight)
        }
      }, 300)
      setOpen(true)
    }
  }, [onScroll]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (isOpen) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
          } else {
            if (refAnimated.current && isOpen) {
              setTimeout(() => {
                if (refAnimated.current) {
                  onScroll?.(0, refAnimated.current.scrollHeight)
                }
              }, 300)
              observer.unobserve(refAnimated.current);
            }
          }
        }, { threshold: 1, rootMargin: '0px' });
      });
      if (refAnimated.current) {
        observer.observe(refAnimated.current);
      }
    }
    return () => {
      observer?.disconnect();
    };
  }, [isOpen, onScroll])

  if (!message) {
    return null;
  }
  const { content, from, title, createdAt, to, files, replies } = message

  return (
    <>
      <P.HeaderWrapper onClick={onToggle}>
        <P.MessageHeader $isReaded={isReaded} >{title}</P.MessageHeader>
        {isOpen && <P.Button onClick={onReply} icon={replay} />}
      </P.HeaderWrapper>
      <animated.div ref={refAnimated} style={{ ...style, overflow: "hidden", margin: "0 -20px" }} >
        <P.ContentWrapper ref={ref}>
          <P.Content>Od: {from}</P.Content>
          <P.Content> Do: {to}</P.Content>
          <P.Content>Treść: {content}</P.Content>
          <P.FooterWrapper>
            <P.FileButtons>
              {files?.map((file) =>
                <P.Button key={file.name} icon={fileIcon} onClick={onDownload(file)} />
              )}
            </P.FileButtons>
            <P.Time>Wysłano: {new Date(createdAt).toLocaleDateString()}</P.Time>
          </P.FooterWrapper>
        </P.ContentWrapper>
      </animated.div>
      {replies?.map((message) => (
        <MessageItem key={message.id} onScroll={onScroll} setId={setId} message={message} />
      ))}
    </>
  )
};

export default MessageItem;
