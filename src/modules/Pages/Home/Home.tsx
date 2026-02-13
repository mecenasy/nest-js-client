import React, { FC } from "react";
import { Helmet } from "react-helmet";
import * as P from './parts';
import PageWrapper from "../../Components/Containers/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import { getMenuSelector } from "~/src/store/menu/selectors";
import MenuItem from "../../MenuItem/MenuItem";
import { getPerson } from "~/src/store/person/reducer";
import { loggedInStatusSelector } from "~/src/store/auth/selectors";
import { LoggedStatus } from "~/src/store/auth/constants";
import PersonBox from './PersonBox';

export const Home: FC = () => {

  const isLoggedIn = useSelector(loggedInStatusSelector);
  const { leftSide, rightSide } = useSelector(getMenuSelector);
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
            <PersonBox person={person} />
          </P.Row>
          <P.Row  >
            {leftSide.filter(({ hidden }) => !hidden).map((item) => (
              <P.Col key={item.link}>
                <MenuItem {...item} />
              </P.Col>
            ))}
          </P.Row>
          <P.Row >
            {rightSide.map((item) => (
              <P.Col key={item.link}>
                <MenuItem {...item} />
              </P.Col>
            ))}
          </P.Row>
        </P.Wrapper>
      )}
    </PageWrapper >
  )
};

export default Home
