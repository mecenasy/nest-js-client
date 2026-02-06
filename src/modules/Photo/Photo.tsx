import React, { FC } from 'react';
import { Border, Image, ImageWrapper } from './parts';

interface PhotoProps {
  src: string;
  title?: string;
  alt?: string;
  className?: string;
}

const Photo: FC<PhotoProps> = (props) => {
  console.log("🚀 ~ Photo ~ props:", props)

  return (
    <Border>
      <ImageWrapper className={props.className}>
        <Image {...props} />
      </ImageWrapper>
    </Border>
  )
};

export default Photo;
