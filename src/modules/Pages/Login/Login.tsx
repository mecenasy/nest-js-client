
import React, { FC, useContext, useRef } from 'react';
import { Field } from 'react-final-form';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import * as P from './parts';
import { validateLoginForm } from './helpers';
import InputFormWrapper from '../../Components/Input/Input';
import { LoggedStatus, LoginData, LoginField } from '~/src/store/auth/constants';
import { loginRequest, loginSuccess, loginFail } from '~/src/store/auth/reducers';
import { getIsDefaultPassword, loggedInStatusSelector } from '~/src/store/auth/reducers';
import FormWrapper from '../../Components/FormWrapper/FormWrapper';
import { AlertType } from '../../Components/Alert/types';
import { Helmet } from 'react-helmet';
import { FormApi } from 'final-form';
import { Button } from '../../Components/Buttons/Button';
import { ServerStatusContext } from '~/src/Providers/ServerProvider/ServerStatusProvider';
import { UnknownAction } from 'redux';

const Login: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const isDefaultPassword = useSelector(getIsDefaultPassword);
  const formRef = useRef<FormApi>(null);
  const serverContext = useContext(ServerStatusContext);

  const onSubmit = (action: any, { password, user }: LoginData) => {
    return loginRequest({ user, password });
  };

  const getPayload = (action: any): Record<string, string> | undefined => {
    if (formRef.current) {
      formRef.current.batch(() => {
        if (formRef.current) {

          formRef.current.change('password', '');
          formRef.current.change('user', '');
        }
      });
    }

    if (action.type === loginSuccess.type) {
      return action.errorMessage;
    }
  };

  if (isLoggedIn === LoggedStatus.LoggedIn) {
    const redirectPath = isDefaultPassword ? '/change_password' : '/';

    if (serverContext) {
      serverContext.url = redirectPath;
      return null;
    }

    return <Navigate to={redirectPath} replace />
  }

  return (
    <P.Wrapper>
      <Helmet>
        <title>Logowanie</title>
        <meta name="description" content={'Logowanie do systemu zarządzania uczelnianego'} />
      </Helmet>
      <P.BoxWithShadow>
        <P.Title>Witaj w systemie uczelnianym</P.Title>
        <P.SubTitle>Aby wejść do systemu należy podać login i hasło</P.SubTitle>

        <FormWrapper<UnknownAction, LoginData>
          start={loginRequest.type}
          resolve={loginSuccess.type}
          reject={loginFail.type}
          setPayload={onSubmit}
          getPayload={getPayload}
          validate={validateLoginForm}
        >
          {({ form }) => {
            formRef.current = form;
            return (
              <>
                <Field name={LoginField.Error} >
                  {({ meta }) => (
                    <>
                      {meta.submitError &&
                        <P.Alert message={meta.submitError} type={AlertType.error} />
                      }
                    </>
                  )}
                </Field>
                <Field
                  name={LoginField.User}
                  component={InputFormWrapper}
                  type={'text'}
                  placeholder={'Login'}
                />
                <Field
                  name={LoginField.Password}
                  component={InputFormWrapper}
                  type={'password'}
                  placeholder={'Hasło'}
                />
                <Button type={'submit'}>Zaloguj</Button>
              </>
            )
          }}
        </FormWrapper>
      </P.BoxWithShadow>
    </P.Wrapper>
  );
};

export default Login;
