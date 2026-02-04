import React, { FC } from 'react';
import { Field } from 'react-final-form';
import { MessageAction, MessageActionType, MessageData, MessageField } from '~/src/store/messages/constants';
import { sendMessageRequest } from '~/src/store/messages/actions';
import { validateMessageForm } from '../helpers';
import InputWithLabel from '~/src/modules/Components/Input/InputWithLabel';
import FormWrapper, { SetPayload } from '~/src/modules/Components/FormWrapper/FormWrapper';
import { Button } from '../../../Components/Buttons/Button';
import * as P from '../parts';

interface MessageFormProps {
  messageId: string;
  onSuccess: () => void;
}

const MessageForm: FC<MessageFormProps> = ({ onSuccess, messageId }) => {
  const setPayload: SetPayload<MessageAction, MessageData> = (action, values) => {
    return sendMessageRequest(values);
  };

  const getPayload = () => {
    onSuccess();
    return undefined
  };

  const initialValues: MessageData = {
    parent: messageId,
    to: '',
    title: '',
    content: '',
  };

  return (
    <FormWrapper<MessageAction, MessageData>
      start={MessageActionType.SendMessageRequest}
      resolve={MessageActionType.SendMessageSuccess}
      reject={MessageActionType.SendMessageFail}
      setPayload={setPayload}
      getPayload={getPayload}
      validate={validateMessageForm}
      initialValues={initialValues}
    >
      {() => (
        <>
          <Field
            name={MessageField.To}
            component={InputWithLabel}
            type="text"
            label="Do:"
            placeholder="ID lub email odbiorcy"
          />
          <Field
            name={MessageField.Title}
            component={InputWithLabel}
            type="text"
            label="Tytuł:"
            placeholder="Tytuł wiadomości"
          />
          <Field
            name={MessageField.Content}
            component={InputWithLabel}
            type="textarea"
            label="Treść:"
            placeholder="Napisz swoją wiadomość..."
          />
          <Field
            name={MessageField.Files}
            component={P.Dropzone}
            multiple
            label={'załączniki'}
            type={'file'}
            placeholder={'Zdjęcie (URL)'}
          />
          <Button type="submit">Wyślij</Button>
        </>
      )}
    </FormWrapper>
  );
};

export default MessageForm;