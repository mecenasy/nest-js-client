import React from "react";
import { Helmet } from "react-helmet";
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import { loggedInStatusSelector } from "~/src/store/auth/reducers";
import { LoggedStatus } from "~/src/store/auth/constants";
import { PersonField, PersonFormData, RoleType } from "~/src/store/person/constants";
import AddressFields from "./Fields/Address";
import StudentFields from "./Fields/Student";
import DefaultFields from "./Fields/Default";
import { addPersonRequest } from "~/src/store/person/reducer";
import { FormApi } from "final-form";
import Box from '../../Components/Box/Box';
import FormAdapter from '../../Components/FormWrapper/FormAdapter';
import { useDispatch } from 'react-redux';

export const AddUser = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const dispatch = useDispatch();
  const onChange = async (values: any, form: FormApi<any>) => {
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

    await new Promise((resolve, reject) => {
      dispatch(addPersonRequest({ ...data, resolve, reject }));
    })

    setTimeout(form.reset)
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
          <FormAdapter<PersonFormData>
            onSubmit={onChange}
            initialValues={{ [PersonField.Step]: 1 }}
          >
            {({ form }) => (
              <Box>
                <DefaultFields form={form} />
                <StudentFields form={form} />
                <AddressFields form={form} />
              </Box>
            )}
          </FormAdapter>
        </P.Wrapper>
      )}
    </PageWrapper >
  )
};

export default AddUser
