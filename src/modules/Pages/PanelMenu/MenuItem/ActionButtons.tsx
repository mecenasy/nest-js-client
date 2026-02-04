import React, { FC } from 'react';
import * as P from '../parts';
import edit from '~/assets/pencil.svg';
import minus from '~/assets/minus.svg';
import WhiteButton from '~/src/modules/Components/Buttons/IconButton';

interface ActionButtonsProps {
  onEditMenuItem: () => void;
  onRemoveMenuItem: () => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({
  onEditMenuItem,
  onRemoveMenuItem,
}) => (
  <P.BoxColumn columnWidth={48} direction={'column'}>
    <WhiteButton
      icon={edit}
      onClick={onEditMenuItem}
    />
    <WhiteButton
      icon={minus}
      onClick={onRemoveMenuItem}
    />
  </P.BoxColumn>
);

export default ActionButtons;
