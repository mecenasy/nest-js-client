
import React from 'react';
import * as P from './parts';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getSubjectSelector } from '~/src/store/subject/selectors';
import { ApplicationState } from '~/src/store/configuration/constants';
import PageWrapper from '../../Components/Containers/PageWrapper/PageWrapper';

const Subject = () => {
  const subjects = useSelector((state: ApplicationState) => getSubjectSelector(state, { group: '', year: '' }))
  console.log("🚀 ~ Subject ~ subjects:", subjects)

  return (
    <PageWrapper>
      <Helmet>
        <title>Zmiana hasła</title>
        <meta name="description" content={'Zamia hasła użytkownika'} />
      </Helmet>

      <P.SubjectWrapper>


        {subjects?.map((item) => (
          <P.BoxWithShadow key={item.id}>
            <P.Title>{item.name}</P.Title>
            <div>
              <P.SubjectRow><P.SubjectTitle>Nazwa: </P.SubjectTitle><span>{item.name}</span></P.SubjectRow>
              <P.SubjectRow><P.SubjectTitle>Audytorium: </P.SubjectTitle><span>{item.auditorium}</span></P.SubjectRow>
              <P.SubjectRow><P.SubjectTitle>Wykładowca: </P.SubjectTitle><span>{item.teacher.name}</span></P.SubjectRow>
            </div>
            <div>
              <P.SubjectRow><P.SubjectTitle>Grupy: </P.SubjectTitle><span>{item.groups.map(({ name }) => name).join(', ')}</span></P.SubjectRow>
              <P.SubjectRow><P.SubjectTitle>Lata: </P.SubjectTitle><span>{item.years.map(({ name }) => name).join(', ')}</span></P.SubjectRow>
              <P.SubjectRow><P.SubjectTitle>Specjalności: </P.SubjectTitle><span>{item.specialties.map(({ name }) => name).join(', ')}</span></P.SubjectRow>
            </div>
            <P.Buttons
              onEdit={() => {}}
              onRemove={() => {}}
            />
          </P.BoxWithShadow>

        ))}
      </P.SubjectWrapper>
      {/* <P.Title>Dodaj przedmiot</P.Title>
      <P.SubTitle> Wybierz roczniki, grupy specjalności i nauczyciela</P.SubTitle> */}
    </PageWrapper>
  )
};

export default Subject;
