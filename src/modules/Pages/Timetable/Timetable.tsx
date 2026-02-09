import React from "react";
import { Helmet } from "react-helmet";
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import { loggedInStatusSelector, userRoleSelector } from "~/src/store/auth/selectors";
import { LoggedStatus } from "~/src/store/auth/constants";
import { getTimeTable } from '~/src/store/timeTable/selectors';
import Table from './Table/Table';
import Control from './Control/Control';
import { RoleType } from '~/src/store/role/constants';

export const Timetable = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const table = useSelector(getTimeTable);
  const role = useSelector(userRoleSelector);


  if (isLoggedIn !== LoggedStatus.LoggedIn) {
    return null
  }

  return (
    <PageWrapper >
      <Helmet>
        <title>Kalendaż</title>
        <meta name="description" content={'to jest system zzarządzania uczelnianego'} />
      </Helmet>
      <P.Wrapper >
        <div>
          <h2>Kalendarz</h2>
          {role === RoleType.Admin && <Control />}
        </div>
        {table?.map(({ name, year, timeTable }, index) => (
          <Table
            year={year}
            name={name}
            timeTable={timeTable}
            key={index}
          />
        ))}
      </P.Wrapper>
    </PageWrapper >
  )
};

export default Timetable
