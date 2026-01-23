import React from 'react';
import { useDropzone } from "react-dropzone";
import plus from '~/assets/plus.svg';
import * as P from './parts';
import { DropzoneProps } from './types';

const Dropzone = ({ input: { onChange, value }, label, className }: DropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const files: File[] = acceptedFiles.map((file) => {
        return Object.assign((file), {
          preview: URL.createObjectURL(file)
        })
      });
      onChange(files[0]);
    }
  });

  return (
    <P.Wrapper className={className}>
      <P.Label>{label}</P.Label>
      <P.Dropzone {...getRootProps()}>
        <P.Image src={value.preview || plus} />
        <input {...getInputProps()} />
      </P.Dropzone>
    </P.Wrapper>
  );
};

export default Dropzone;
