import React, { FC } from 'react';
import * as P from '../parts';
import Modal from '../../../Components/Modal/Modal';
import { Select } from '../../../Components/Input/Dropdown';
import { Subject } from '~/src/store/subject/constants';
import { Option } from '../../../Components/Input/types';
import { getSubjectOption } from '../getOptions';

interface SddSubjectModalProps {
  subjects: Subject[];
  onClose: () => void;
  onChangePlace: (value: Option<Subject>) => void;
  place: { day: string, hour: string } | undefined;
}

const AddSubjectModal: FC<SddSubjectModalProps> = ({
  subjects,
  onClose,
  place,
  onChangePlace
}) => {
  if (SERVER_BUILD) {
    return null;
  }

  return (
    <Modal
      onClose={onClose}
      isOpen={!!place}
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
