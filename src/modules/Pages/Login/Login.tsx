
import React, { FC, useContext } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import * as P from './parts';
import { validateLoginForm } from './helpers';
import { LoggedStatus, LoginData, LoginField } from '~/src/store/auth/constants';
import { loginRequest } from '~/src/store/auth/reducers';
import { getIsDefaultPassword, loggedInStatusSelector } from '~/src/store/auth/reducers';
import { Helmet } from 'react-helmet';
import { FormApi } from 'final-form';
import { Button } from '../../Components/Buttons/Button';
import { ServerStatusContext } from '~/src/Providers/ServerProvider/ServerStatusProvider';
import FormAdapter from '../../Components/FormWrapper/FormAdapter';
import { InputField } from '../../Components/Input/InputWithLabel';
import { useDispatch } from 'react-redux';

const Login: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const isDefaultPassword = useSelector(getIsDefaultPassword);
  const serverContext = useContext(ServerStatusContext);
  const dispatch = useDispatch();

  const onSubmit = async ({ password, user }: LoginData, form: FormApi<LoginData>) => {
    try {
      const error: any = await new Promise((resolve, reject) => {
        dispatch(loginRequest({ user, password, resolve, reject }));
      });

      form.batch(() => {
        form.change(LoginField.User, '');
        form.change(LoginField.Password, '');
      });

      return error?.errorMessage;

    } catch (error: any) {
      return error?.errorMessage;
    };
  }

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
        <FormAdapter<LoginData>
          onSubmit={onSubmit}
          validate={validateLoginForm}
        >
          {({ form }) => (
            <>
              <InputField<LoginData, any>
                form={form}
                name={LoginField.User}
                type={'text'}
                placeholder={'Login'}
              />
              <InputField<LoginData, any>
                form={form}
                name={LoginField.Password}
                type={'password'}
                placeholder={'Hasło'}
              />
              <Button type={'submit'}>Zaloguj</Button>              </>
          )}
        </FormAdapter>
      </P.BoxWithShadow>
    </P.Wrapper>
  );
};

export default Login;
