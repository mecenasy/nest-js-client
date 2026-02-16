import { LoginData } from '~/src/store/auth/constants';

export const validateLoginForm = (value: LoginData) => {
  const error: Partial<LoginData> = {};

  if (!value.user || value.user.length < 8) {
    error.user = 'login musi mieć przynajmniej osiem znaków';
  }
  if (!value.password || value.password.length < 8) {
    error.password = 'hasło musi mieć przynajmniej osiem znaków';
  }
  return error;
};
