import { FormApi } from 'final-form';
import { ChangeEvent } from 'react';
import { FieldRenderProps as FieldRenderPropsDep } from 'react-final-form';
import { FieldRenderProps } from 'react-final-form-hooks';
export interface DroppedFile extends File {
  path: string;
  preview: string;
  lastModifiedDate: Date;
  size: number;
  type: string;
}

export interface InputProps {
  placeholder: string,
  onChange: (event: ChangeEvent) => void;
  type?: string;
}

export enum InputType {
  all = 'all',
  onlyError = 'onlyError',
  onlyInput = 'input',
}

export type InputFormWrapperProps<T> = FieldRenderPropsDep<T> & {
  placeholder: string,
  inputType: InputType
  label: string;
};

export interface Option<T> {
  value: T;
  label: string;
}

export type DropzoneProps = FieldRenderPropsDep<DroppedFile> & { label: string; multiple: boolean }

export type DropdownPropsDep<T> = FieldRenderPropsDep<Option<T>> & {
  options: Array<any>;
  isMulti: boolean;
  label: string;
  name?: string;
}

export type DropdownProps<T> = FieldRenderProps<Option<T>> & {
  placeholder?: string;
  options: Array<Option<T>>;
  className?: string;
  isMulti: boolean;
  label: string;
  name?: string;
  [otherProp: string]: any;
}

export type SelectProps<T> = {
  name: string;
  value?: Option<T> | Array<Option<T>>;
  className?: string;
  onChange: any;
  options: Array<Option<T>>;
  isMulti: boolean;
  label: string;
  [key: string]: any;
}

export type ToggleProps = FieldRenderPropsDep<string> & {
  icons: boolean;
  label: string;
  leftText?: string;
  rightText?: string
  className?: string;
}

export interface SelectFieldProps<T, R> {
  name: string;
  form: FormApi<R, Partial<R>>;
  placeholder?: string;
  options: Array<Option<T>>;
  className?: string;
  isMulti: boolean;
  label: string;
}

