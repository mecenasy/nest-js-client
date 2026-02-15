import React, { useEffect } from 'react';
import { MessageField, MessageFormData } from '~/src/store/messages/constants';
import { sendMessageRequest } from '~/src/store/messages/reducer';
import { validateMessageForm } from '../helpers';
import { InputField } from '~/src/modules/Components/Input/InputWithLabel';
import { Button } from '../../../Components/Buttons/Button';
import { useDispatch } from 'react-redux';
import { getSimpleUserListRequest } from '~/src/store/userList/reducer';
import { SelectField } from '~/src/modules/Components/Input/Dropdown';
import { getSimpleUsersSelector } from '~/src/store/userList/reducer';
import { useSelector } from 'react-redux';
import { getOption } from './getOptions';
import { DropzoneField } from '~/src/modules/Components/Input/Dropzone';
import FormAdapter from '~/src/modules/Components/FormWrapper/FormAdapter';

interface MessageFormProps {
  messageId: string;
  onSuccess: () => void;
}

const MessageForm = ({ onSuccess, messageId }: MessageFormProps) => {
  const dispatch = useDispatch();

  const onsubmit = async (values: MessageFormData) => {
    try {
      await new Promise((resolve, reject) => {
        dispatch(sendMessageRequest({ ...values, to: values.to.value, resolve, reject }));
      });

      onSuccess();
    } catch {

    }
  };

  const users = useSelector(getSimpleUsersSelector);

  useEffect(() => {
    dispatch(getSimpleUserListRequest());
  }, [messageId, dispatch]);

  const initialValues: Partial<MessageFormData> = {
    parent: messageId,
  };

  return (
    <FormAdapter< MessageFormData>
      onSubmit={onsubmit}
      validate={validateMessageForm}
      initialValues={initialValues}
    >
      {({ form }) => (
        <>
          <SelectField
            isMulti={false}
            name={MessageField.To}
            form={form}
            options={getOption(users)}
            label="Do:"
            placeholder="ID lub email odbiorcy"
          />
          <InputField
            name={MessageField.Title}
            form={form}
            type="text"
            label="Tytuł:"
            placeholder="Tytuł wiadomości"
          />
          <InputField
            name={MessageField.Content}
            form={form}
            type="textarea"
            label="Treść:"
            placeholder="Napisz swoją wiadomość..."
          />
          <DropzoneField
            name={MessageField.Files}
            form={form}
            multiple
            label={'załączniki'}
          />
          <Button type="submit">Wyślij</Button>
        </>
      )}
    </FormAdapter>
  );
};

export default MessageForm;