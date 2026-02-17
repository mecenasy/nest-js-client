
import React, { FC, useContext, useState } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import * as P from './parts';
import { validateLoginForm } from './helpers';
import { LoggedStatus, ChangePasswordData, ChangePasswordField } from '~/src/store/auth/constants';
import { changePasswordRequest } from '~/src/store/auth/reducers';
import { loggedInStatusSelector } from '~/src/store/auth/reducers';
import { Helmet } from 'react-helmet';
import { FormApi } from 'final-form';
import { Button } from '../../Components/Buttons/Button';
import { ServerStatusContext } from '~/src/Providers/ServerProvider/ServerStatusProvider';
import FormAdapter from '../../Components/FormWrapper/FormAdapter';
import { InputField } from '../../Components/Input/InputWithLabel';
import { useDispatch } from 'react-redux';

const ChangePassword: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const [isPasswordChanged, setChangedPassword] = useState(false);
  const serverContext = useContext(ServerStatusContext);
  const dispatch = useDispatch();

  const onSubmit = async ({ oldPassword, newPassword }: ChangePasswordData, form: FormApi<ChangePasswordData>) => {
    try {
      const error: any = await new Promise((resolve, reject) => {
        dispatch(changePasswordRequest({ newPassword, oldPassword, resolve, reject }));
      });

      form.batch(() => {
        form.change(ChangePasswordField.OldPassword, '');
        form.change(ChangePasswordField.NewPassword, '');
        form.change(ChangePasswordField.ConfirmPassword, '');
      });
      setChangedPassword(true);
      return error?.errorMessage;

    } catch (error: any) {
      return error?.errorMessage;
    };
  };



  if (isLoggedIn === LoggedStatus.LoggedOut || isPasswordChanged) {
    if (serverContext) {
      serverContext.url = '/';
      return null;
    }
    return <Navigate to={'/'} replace />
  }

  if (isLoggedIn === LoggedStatus.Unknown) {
    return null;
  }

  return (
    <P.Wrapper>
      <Helmet>
        <title>Zmiana hasła</title>
        <meta name="description" content={'Zmiana hasła użytkownika'} />
      </Helmet>
      <P.BoxWithShadow>
        <P.Title>Zmiana hasła</P.Title>
        <P.SubTitle>Aby zmienić hasło wpisz swoje stare hasło oraz nowe i potwierdź je.</P.SubTitle>
        <FormAdapter<ChangePasswordData>
          onSubmit={onSubmit}
          validate={validateLoginForm}
        >
          {({ form }) => {
            return (
              <>
                <InputField<ChangePasswordData, any>
                  form={form}
                  name={ChangePasswordField.OldPassword}
                  type={'password'}
                  placeholder={'Stare hasło'}
                />
                <InputField<ChangePasswordData, any>
                  form={form}
                  name={ChangePasswordField.NewPassword}
                  type={'password'}
                  placeholder={'Nowe hasło'}
                />

                <InputField<ChangePasswordData, any>
                  form={form}
                  name={ChangePasswordField.ConfirmPassword}
                  type={'password'}
                  placeholder={'Podwierdź hasło'}
                />
                <Button type={'submit'}>Zaloguj</Button>              </>
            )
          }}
        </FormAdapter>
      </P.BoxWithShadow>
    </P.Wrapper>
  );
};

export default ChangePassword;
