
import React, { ChangeEvent, useCallback, useState } from 'react';
import * as P from './parts';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getSubjectSelector } from '~/src/store/subject/selectors';
import { ApplicationState } from '~/src/store/configuration/constants';
import PageWrapper from '../../Components/Containers/PageWrapper/PageWrapper';
import { useDebounce } from 'ahooks';
import SubjectItem from './SubjectItem';
import ControlSubject from './ControlSubject';
import { useDispatch } from 'react-redux';
import { deleteSubjectRequest } from '~/src/store/subject/actions';
import Modal from '../../Components/Modal/Modal';
import { FormAdapter } from './AddSubject/SubjectForm';
import AddSubjects from './AddSubjects';
import { Subject } from '~/src/store/subject/constants';

const SubjectPage = () => {
  const [search, setSearch] = useState('');
  const filterSearch = useDebounce(search, { wait: 300 });
  const [isModalOpen, setModalOpen] = useState(false);
  const [item, setSubjectItem] = useState<Subject | null>(null);

  const dispatch = useDispatch();

  const subjects = useSelector(
    (state: ApplicationState) => getSubjectSelector(
      state,
      { group: '', year: '', search: filterSearch }
    )
  );

  const edit = useCallback((subject: Subject) => {
    setSubjectItem(subject);
    toggleModal();
  }, []);

  const remove = useCallback((id: string) => {
    dispatch(deleteSubjectRequest(id))
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, []);

  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  }, [setSearch]);

  return (
    <PageWrapper>
      <Helmet>
        <title>Zmiana hasła</title>
        <meta name="description" content={'Zamia hasła użytkownika'} />
      </Helmet>
      <P.SubjectWrapper>

        <ControlSubject
          onChange={onChange}
          add={toggleModal}
          search={filterSearch}
        />
        <P.SubjectWrapper>
          {subjects?.map((item) => (
            <SubjectItem
              key={item.name}
              edit={edit}
              remove={remove}
              item={item}
            />
          ))}
        </P.SubjectWrapper>
      </P.SubjectWrapper>
      <>
        {!SERVER_BUILD && (
          <Modal
            onClose={toggleModal}
            isOpen={isModalOpen}
            title={item ? 'Edytuj przedmiot' : 'Nowy przedmiot'}
          >
            <AddSubjects after={toggleModal} item={item} />
          </Modal>
        )}
      </>
    </PageWrapper>
  )
};

export default SubjectPage;
