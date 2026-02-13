
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import * as P from './parts';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { getSubjectSelector } from '~/src/store/subject/reducer';
import { ApplicationState } from '~/src/store/configuration/constants';
import PageWrapper from '../../Components/Containers/PageWrapper/PageWrapper';
import { useDebounce } from 'ahooks';
import SubjectItem from './SubjectItem';
import ControlSubject from './ControlSubject';
import { useDispatch } from 'react-redux';
import { deleteSubjectRequest } from '~/src/store/subject/reducer';
import Modal, { ModalRef } from '../../Components/Modal/Modal';
import AddSubjects from './AddSubjects';
import { Subject } from '~/src/store/subject/constants';

const SubjectPage = () => {
  const [search, setSearch] = useState('');
  const filterSearch = useDebounce(search, { wait: 300 });
  const [item, setSubjectItem] = useState<Subject | null>(null);
  const modalRef = useRef<ModalRef>(null);

  const dispatch = useDispatch();

  const subjects = useSelector(
    (state: ApplicationState) => getSubjectSelector(
      state,
      { group: '', year: '', search: filterSearch }
    )
  );

  const edit = useCallback((subject: Subject) => {
    setSubjectItem(subject);
    modalRef.current?.open();
  }, []);

  const remove = useCallback((id: string) => {
    dispatch(deleteSubjectRequest(id))
  }, [dispatch]);

  const toggleModal = useCallback(() => {
    setSubjectItem(null);
    modalRef.current?.toggle();
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
      <Modal
        ref={modalRef}
        title={item ? 'Edytuj przedmiot' : 'Nowy przedmiot'}
      >
        <AddSubjects after={toggleModal} item={item} />
      </Modal>
    </PageWrapper>
  )
};

export default SubjectPage;
