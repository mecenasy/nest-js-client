
import React, { FC, useRef } from 'react';
import { Field } from 'react-final-form';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import * as P from './parts';
import { validateLoginForm } from './helpers';
import InputFormWrapper from '../../Components/Input/Input';
import { AuthAction, AuthActionType, LoggedStatus, LoginData, LoginField } from '~/src/store/auth/constants';
import { loginRequest } from '~/src/store/auth/actions';
import { getIsDefaultPassword, loggedInStatusSelector } from '~/src/store/auth/selectors';
import FormWrapper from '../../Components/FormWrapper/FormWrapper';
import { AlertType } from '../../Components/Alert/types';
import { Helmet } from 'react-helmet';
import { FormApi } from 'final-form';

const Login: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const isDefaultPassword = useSelector(getIsDefaultPassword)
  const formRef = useRef<FormApi>();

  const onSubmit = (action: AuthAction, { password, user }: LoginData) => {
    return loginRequest(user, password);
  };

  const getPayload = (action: AuthAction): Record<string, string> | undefined => {
    if (formRef.current) {
      formRef.current.batch(() => {
        if (formRef.current) {

          formRef.current.change('password', '');
          formRef.current.change('user', '');
        }
      });
    }

    if (action.type === AuthActionType.LoginSuccess) {
      return action.errorMessage;
    }
  };

  if (isLoggedIn === LoggedStatus.LoggedIn) {
    const redirectPath = isDefaultPassword ? '/change_password' : '/';

    return <Redirect to={redirectPath} />
  }

  return (
    <P.Wrapper>
      <Helmet>
        <title>Logowanie</title>
        <meta name="description" content={'Logowanie do systemu zarządzania uczelnianego'} />
      </Helmet>
      <P.BoxWithShadow>
        <P.Title>Witaj w systemie uczelnianym</P.Title>
        <P.SubTitle>Aby wejśc do systemy należy podać login i hasło</P.SubTitle>

        <FormWrapper<AuthAction, LoginData>
          start={AuthActionType.LoginRequest}
          resolve={AuthActionType.LoginSuccess}
          reject={AuthActionType.LoginFail}
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
                <P.SubmitButton type={'submit'}>Zaloguj</P.SubmitButton>
              </>
            )
          }}
        </FormWrapper>
      </P.BoxWithShadow>
    </P.Wrapper>
  );
};

export default Login;
