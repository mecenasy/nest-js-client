import React, { FC } from 'react';
import * as P from './parts';
import edit from '~/assets/pencil.svg';
import minus from '~/assets/minus.svg';
import WhiteButton from '~/src/modules/Components/Buttons/IconButton';

interface ActionButtonsProps {
  onEdit: () => void;
  onRemove: () => void;
  className?: string;
}

const ActionButtons: FC<ActionButtonsProps> = ({
  onEdit,
  onRemove,
  className
}) => (
  <P.BoxColumn className={className} >
    <WhiteButton
      icon={edit}
      onClick={onEdit}
    />
    <WhiteButton
      icon={minus}
      onClick={onRemove}
    />
  </P.BoxColumn>
);

export default ActionButtons;
