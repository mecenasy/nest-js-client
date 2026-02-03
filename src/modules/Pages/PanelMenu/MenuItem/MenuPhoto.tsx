import React, { FC } from 'react';
import * as P from '../parts';

interface MenuPhotoProps {
  image: string;
}

const MenuPhoto: FC<MenuPhotoProps> = ({
  image
}) => (
  <P.BoxColumn columWidth={50} >
    <P.Photo src={image || ''} />
  </P.BoxColumn>
);

export default MenuPhoto;
