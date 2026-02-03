import React, { FC } from 'react';
import * as P from '../parts';
import edit from '~/assets/pencil.svg';
import minus from '~/assets/minus.svg';

interface ActionButtonsProps {
  onEditMenuItem: () => void;
  onRemoveMenuItem: () => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({
  onEditMenuItem,
  onRemoveMenuItem,
}) => (
  <P.BoxColumn columWidth={30} direction={'column'}>
    <P.Button onClick={onEditMenuItem}>
      <P.Pen src={edit} />
    </P.Button>
    <P.Button onClick={onRemoveMenuItem}>
      <P.Pen src={minus} />
    </P.Button>
  </P.BoxColumn>
);

export default ActionButtons;
