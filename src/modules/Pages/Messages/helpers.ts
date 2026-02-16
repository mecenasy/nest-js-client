import { MessageFormData } from '~/src/store/messages/constants';

export const validateMessageForm = (values: MessageFormData) => {
  const errors: Partial<Record<keyof MessageFormData, string>> = {};

  if (!values.to) {
    errors.to = 'Odbiorca jest wymagany';
  }

  if (!values.title) {
    errors.title = 'Tytuł jest wymagany';
  } else if (values.title.length < 3) {
    errors.title = 'Tytuł musi mieć co najmniej 3 znaki';
  }

  if (!values.content) {
    errors.content = 'Treść wiadomości jest wymagana';
  }

  return errors;
};
