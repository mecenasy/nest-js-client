import React, { FC, RefObject } from 'react';
import * as P from '../parts';
import Modal, { ModalRef } from '../../../Components/Modal/Modal';
import { Select } from '../../../Components/Input/Dropdown';
import { Subject } from '~/src/store/subject/constants';
import { Option } from '../../../Components/Input/types';
import { getSubjectOption } from '../getOptions';

interface SddSubjectModalProps {
  subjects: Subject[];
  onClose: () => void;
  ref: RefObject<ModalRef | null>;
  onChangePlace: (value: Option<Subject>) => void;
}

const AddSubjectModal: FC<SddSubjectModalProps> = ({
  subjects,
  onClose,
  ref,
  onChangePlace
}) => {

  if (SERVER_BUILD) {
    return null;
  }

  return (
    <Modal
      onClose={onClose}
      ref={ref}
      title={'Dodaj przedmiot do kalendarza'}
    >
      <P.NodalContent>
        <Select<Subject>
          name={'subject'}
          label={'Wybierz Przedmiot'}
          onChange={onChangePlace}
          options={getSubjectOption(subjects)}
          isMulti={false}
        />
      </P.NodalContent>
    </Modal>
  )
};

export default AddSubjectModal;
