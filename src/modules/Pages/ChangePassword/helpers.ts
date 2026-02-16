import { ChangePasswordData } from '~/src/store/auth/constants';

export const validateLoginForm = (value: ChangePasswordData) => {
  const error: Partial<ChangePasswordData> = {};

  if (value.oldPassword && value.oldPassword.length < 8) {
    error.oldPassword = 'stare hasło musi mieć przynajmniej osiem znaków';
  }

  if (value.newPassword && value.newPassword.length < 8) {
    error.newPassword = 'hasło musi mieć przynajmniej osiem znaków';
  }

  if (value.confirmPassword && value.confirmPassword.length < 8) {
    error.confirmPassword = 'hasło musi mieć przynajmniej osiem znaków';
  }

  if (value.confirmPassword && value.newPassword && value.confirmPassword !== value.newPassword) {
    error.confirmPassword = 'hasła muszą być jednakowe';
  }

  if (value.oldPassword && value.newPassword && value.oldPassword === value.newPassword) {
    error.confirmPassword = 'hasło musi się róznić od starego';
  }

  return error;
};
