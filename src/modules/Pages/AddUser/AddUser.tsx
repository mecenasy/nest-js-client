import React, { FC, useRef } from "react";
import { Helmet } from "react-helmet";
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import { loggedInStatusSelector } from "~/src/store/auth/reducers";
import { LoggedStatus } from "~/src/store/auth/constants";
import { PersonField, PersonFormData, RoleType } from "~/src/store/person/constants";
import FormWrapper, { SetPayload } from "../../Components/FormWrapper/FormWrapper";
import AddressFields from "./Fields/Address";
import StudentFields from "./Fields/Student";
import DefaultFields from "./Fields/Default";
import { addPersonRequest } from "~/src/store/person/reducer";
import { FormApi } from "final-form";
import Box from '../../Components/Box/Box';
import { UnknownAction } from 'redux';

export const AddUser: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const formRef: React.MutableRefObject<FormApi | null> = useRef<FormApi | null>(null);
  const setPayload: SetPayload<UnknownAction, any> = (action, values) => {
    delete values.step;
    const data: PersonFormData = {
      ...values,
      role: values.role.value,
    }
    if (values.role.label.toLowerCase() === RoleType.Student) {
      data.direction = values.direction.value;
      data.specialty = values.specialty.value;
      data.year = values.year.value;
      data.group = values.group.value;
    }
    return addPersonRequest(data)
  }
  return (
    <PageWrapper pickUp >
      <Helmet>
        <title>dodaj nowego użytkownika</title>
        <meta name="description" content={'to jest system zzarządzania uczelnianego'} />
      </Helmet>
      {isLoggedIn === LoggedStatus.LoggedIn && (
        <P.Wrapper  >
          <h3>Dodaj nowego urzytkownika</h3>
          <FormWrapper<any, any>
            start={'PersonActionType.AddPersonRequest'}
            resolve={'PersonActionType.AddPersonSucces'}
            reject={'PersonActionType.AddPersonFail'}
            setPayload={setPayload}
            getPayload={() => {
              formRef.current?.reset();
              return undefined;
            }}
            initialValues={{ [PersonField.Step]: 1 }}
          >
            {({ form }) => {
              formRef.current = form;
              return (
                <>
                  <Box>
                    <DefaultFields />
                    <StudentFields />
                    <AddressFields />
                  </Box>
                </>
              )
            }}
          </FormWrapper>
        </P.Wrapper>
      )}
    </PageWrapper >
  )
};

export default AddUser
