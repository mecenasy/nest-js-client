import React, { FC } from "react";
import { Helmet } from "react-helmet";
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import { loggedInStatusSelector } from "~/src/store/auth/selectors";
import { LoggedStatus } from "~/src/store/auth/constants";
import { getTimeTable } from '~/src/store/timeTable/selectors';

import Table from './Table';

export const Timetable: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const table = useSelector(getTimeTable);

  if (!(table.length && isLoggedIn === LoggedStatus.LoggedIn)) {
    return null
  }

  return (
    <PageWrapper >
      <Helmet>
        <title>Kalendaż</title>
        <meta name="description" content={'to jest system zzarządzania uczelnianego'} />
      </Helmet>
      <P.Wrapper >
        <h2>Kalendarz</h2>
        {table.map(({ name, year, timeTable }, index) => (
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
