import React from 'react';
import { useDropzone } from "react-dropzone";
import plus from '~/assets/plus.svg';
import * as P from './parts';
import { DroppedFile, DropzoneFieldProps, DropzoneProps, } from './types';
import { useField } from 'react-final-form-hooks';

const Dropzone = ({ input: { onChange, value, }, label, multiple, className }: DropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const files: File[] = acceptedFiles.map((file) => {
        return Object.assign((file), {
          preview: URL.createObjectURL(file)
        })
      });
      onChange((multiple ? files : files[0]) as DroppedFile);
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

export const DropzoneField = <T extends string | number | boolean | null | undefined | object | DroppedFile>({ name, form, ...rest }: DropzoneFieldProps<T>) => {
  const field = useField(name, form);

  return (
    <Dropzone {...rest} {...field} />
  )
}
export default Dropzone;
