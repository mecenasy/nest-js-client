
import React, { FC, useContext, useRef, useState } from 'react';
import { Field } from 'react-final-form';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import * as P from './parts';
import { validateLoginForm } from './helpers';
import InputFormWrapper from '../../Components/Input/Input';
import { LoggedStatus, ChangePasswordData, ChangePasswordField } from '~/src/store/auth/constants';
import { changePasswordRequest, changePasswordSuccess, changePasswordFail } from '~/src/store/auth/reducers';
import { loggedInStatusSelector } from '~/src/store/auth/reducers';
import FormWrapper from '../../Components/FormWrapper/FormWrapper';
import { Helmet } from 'react-helmet';
import { FormApi } from 'final-form';
import { Button } from '../../Components/Buttons/Button';
import { ServerStatusContext } from '~/src/Providers/ServerProvider/ServerStatusProvider';

const ChangePassword: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const [isPasswordChanged, setChangedPassword] = useState(false);
  const formRef = useRef<FormApi>(null);
  const serverContext = useContext(ServerStatusContext);

  const onSubmit = (action: any, { oldPassword, newPassword }: ChangePasswordData) => {
    return changePasswordRequest({ newPassword, oldPassword });
  };

  const getPayload = (action: any): Record<string, string> | undefined => {
    setChangedPassword(true)

    if (formRef.current) {
      setTimeout(formRef.current.reset)
    }

    if (action.type === changePasswordSuccess.type) {
      return action.errorMessage;
    }
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

        <FormWrapper<any, ChangePasswordData>
          start={changePasswordRequest.type}
          resolve={changePasswordSuccess.type}
          reject={changePasswordFail.type}
          setPayload={onSubmit}
          getPayload={getPayload}
          validate={validateLoginForm}
        >
          {({ form }) => {
            formRef.current = form;
            return (
              <>
                <Field
                  name={ChangePasswordField.OldPassword}
                  component={InputFormWrapper}
                  type={'password'}
                  placeholder={'Stare hasło'}
                />
                <Field
                  name={ChangePasswordField.NewPassword}
                  component={InputFormWrapper}
                  type={'password'}
                  placeholder={'Nowe hasło'}
                />
                <Field
                  name={ChangePasswordField.ConfirmPassword}
                  component={InputFormWrapper}
                  type={'password'}
                  placeholder={'Podwierdź hasło'}
                />
                <Button type={'submit'}>Zmień hasło</Button>
              </>
            )
          }}
        </FormWrapper>
      </P.BoxWithShadow>
    </P.Wrapper>
  );
};

export default ChangePassword;
