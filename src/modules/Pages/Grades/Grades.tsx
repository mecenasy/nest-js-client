import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as P from './parts';
import PageWrapper from '../../Components/Containers/PageWrapper/PageWrapper';

const Counter = () => {
  const dispatch = useDispatch();

  return (
    <PageWrapper>
      <Helmet>
        <title>Counter</title>
        <meta name="description" content={'to jest przykładowy counter prezentujący możiwości aplikacji'} />
      </Helmet>
      <P.CounterWrapper>
        <P.CounterInnerWrapper>
          <Link to={'/'}>Home</Link>
        </P.CounterInnerWrapper>

      </P.CounterWrapper>
    </PageWrapper>
  )
};

export default Counter;
