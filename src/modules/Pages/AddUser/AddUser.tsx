import React, { FC, useRef } from "react";
import { Helmet } from "react-helmet";
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import { loggedInStatusSelector } from "~/src/store/auth/selectors";
import { LoggedStatus } from "~/src/store/auth/constants";
import { PersonAction, PersonActionType, PersonField, PersonFormData } from "~/src/store/person/constants";
import FormWrapper, { SetPayload } from "../../Components/FormWrapper/FormWrapper";
import AddressFields from "./Fields/Address";
import StudentFields from "./Fields/Student";
import DefaultFields from "./Fields/Default";
import { RoleType } from "~/src/store/role/constants";
import { addPersonRequest } from "~/src/store/person/actions";
import { FormApi } from "final-form";

export const AddUser: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const formRef: React.MutableRefObject<FormApi | null> = useRef<FormApi | null>(null);
  const setPayload: SetPayload<PersonAction, any> = (action, values) => {
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
          <FormWrapper<PersonAction, PersonActionType>
            start={PersonActionType.AddPersonRequest}
            resolve={PersonActionType.AddPersonSuccess}
            reject={PersonActionType.AddPersonFail}
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
                  <P.PersonBox>
                    <DefaultFields />
                    <StudentFields />
                    <AddressFields />
                  </P.PersonBox>
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
