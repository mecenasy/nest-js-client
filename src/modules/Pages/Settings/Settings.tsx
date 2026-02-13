import React, { FC } from "react";
import { Helmet } from "react-helmet";
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import { getPerson } from "~/src/store/person/reducer";
import { loggedInStatusSelector } from "~/src/store/auth/selectors";
import { LoggedStatus } from "~/src/store/auth/constants";

export const Settings: FC = () => {
  const isLoggedIn = useSelector(loggedInStatusSelector);
  const person = useSelector(getPerson);
  return (
    <PageWrapper pickUp >
      <Helmet>
        <title>System zarządzania uczelnianego</title>
        <meta name="description" content={'to jest system zzarządzania uczelnianego'} />
      </Helmet>
      {isLoggedIn === LoggedStatus.LoggedIn && (
        <P.Wrapper >
          <P.Row >
            <P.BoxUser >
              <P.Photo src={person?.photo || ''} />
              <div>

              </div>
            </P.BoxUser>
          </P.Row>
        </P.Wrapper>
      )}
    </PageWrapper >
  )
};

export default Settings;
