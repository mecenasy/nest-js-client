import React, { FC, useEffect } from 'react';
import { Field } from 'react-final-form';
import { MessageData, MessageField, MessageFormData } from '~/src/store/messages/constants';
import { sendMessageRequest } from '~/src/store/messages/reducer';
import { validateMessageForm } from '../helpers';
import InputWithLabel from '~/src/modules/Components/Input/InputWithLabel';
import FormWrapper, { SetPayload } from '~/src/modules/Components/FormWrapper/FormWrapper';
import { Button } from '../../../Components/Buttons/Button';
import * as P from '../parts';
import { useDispatch } from 'react-redux';
import { getSimpleUserListRequest } from '~/src/store/userList/actions';
import DropdownField from '~/src/modules/Components/Input/Dropdown';
import { getSimpleUsersSelector } from '~/src/store/userList/selectors';
import { useSelector } from 'react-redux';
import { getOption } from './getOptions';
import { UnknownAction } from 'redux';

interface MessageFormProps {
  messageId: string;
  onSuccess: () => void;
}

const MessageForm: FC<MessageFormProps> = ({ onSuccess, messageId }) => {
  const setPayload: SetPayload<UnknownAction, MessageFormData> = (action, values) => {
    return sendMessageRequest({ ...values, to: values.to.value });
  };
  const users = useSelector(getSimpleUsersSelector)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSimpleUserListRequest());
  }, [messageId, dispatch]);

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
    <FormWrapper<UnknownAction, MessageFormData>
      start={"MessageActionType.SendMessageRequest"}
      resolve={"MessageActionType.SendMessageSuccess"}
      reject={"MessageActionType.SendMessageFail"}
      setPayload={setPayload}
      getPayload={getPayload}
      validate={validateMessageForm}
      initialValues={initialValues}
    >
      {() => (
        <>
          <Field
            name={MessageField.To}
            component={DropdownField}
            options={getOption(users)}
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