
import React from 'react';
import * as P from './parts';
import { Helmet } from 'react-helmet';
import { Button } from '../../Components/Buttons/Button';
import { SubjectForm } from './SubjectForm';
import { FieldsArray } from './SubjectFields';

const Subject = () => (
  <P.Wrapper>
    <Helmet>
      <title>Zmiana hasła</title>
      <meta name="description" content={'Zamia hasła użytkownika'} />
    </Helmet>
    <P.BoxWithShadow>
      <P.Title>Dodaj przedmiot</P.Title>
      <P.SubTitle> Wybierz roczniki, grupy specjalności i nauczyciela</P.SubTitle>
      <SubjectForm>
        {(props) => {
          return (
            <>
              <FieldsArray  {...props} />
              <Button type='button' onClick={() => {
                props.form.mutators.push('subjects', undefined)
              }}   >dodaj przedmiot</Button>
              <Button type='submit'>Zapisz</Button>
            </>
          )
        }}
      </SubjectForm>


    </P.BoxWithShadow>
  </P.Wrapper>
);

export default Subject;
