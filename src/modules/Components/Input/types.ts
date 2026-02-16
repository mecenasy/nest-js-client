import { FormApi } from 'final-form';
import { ChangeEvent } from 'react';
import { FieldRenderProps as FieldRenderPropsDep } from 'react-final-form-hooks';
import { FieldRenderProps } from 'react-final-form-hooks';
export interface DroppedFile extends File {
  path: string;
  preview: string;
  lastModifiedDate: Date;
  size: number;
  type: string;
}

export interface SubjectFieldsProps<T> {
  disabled?: boolean;
  name: string;
  form: FormApi<T, Partial<T>>;
  className?: string;
  placeholder: string;
  inputType?: InputType;
  label?: string;
  type?: string;
}

export interface InputWithLabelProps<T> extends InputFormWrapperProps<T> {
  label?: string;
}

export interface InputProps<T> {
  placeholder: string;
  onChange: (event: ChangeEvent<T>) => void;
  type?: string;
  [key: string]: any;
}

export enum InputType {
  all = 'all',
  onlyError = 'onlyError',
  onlyInput = 'input',
}

export type InputFormWrapperProps<T> = FieldRenderPropsDep<T> & {
  placeholder: string;
  inputType?: InputType;
  type?: string;
};

export interface Option<T> {
  value: T;
  label: string;
}

export type DropzoneProps = FieldRenderPropsDep<DroppedFile> & {
  label: string;
  multiple: boolean;
  className?: string;
};

export interface DropzoneFieldProps<T> {
  name: string;
  form: FormApi<T, Partial<T>>;
  className?: string;
  label: string;
  multiple: boolean;
}

export type DropdownPropsDep<T> = FieldRenderPropsDep<Option<T>> & {
  options: Array<any>;
  isMulti: boolean;
  label: string;
  name?: string;
};

export type DropdownProps<T> = FieldRenderProps<Option<T>> & {
  placeholder?: string;
  options: Array<Option<T>>;
  className?: string;
  isMulti: boolean;
  label: string;
  name?: string;
  [otherProp: string]: any;
};

export type SelectProps<T> = {
  name: string;
  value?: Option<T> | Array<Option<T>>;
  className?: string;
  onChange: any;
  options: Array<Option<T>>;
  isMulti: boolean;
  label: string;
  [key: string]: any;
};

export type ToggleProps = FieldRenderPropsDep<string> & {
  icons: boolean;
  label: string;
  leftText?: string;
  rightText?: string;
  className?: string;
};

export type ToggleFieldProps<T> = {
  form: FormApi<T, Partial<T>>;
  name: string;
  icons: boolean;
  label: string;
  leftText?: string;
  rightText?: string;
  className?: string;
};

export interface SelectFieldProps<T, R> {
  name: string;
  form: FormApi<R, Partial<R>>;
  placeholder?: string;
  options: Array<Option<T>>;
  className?: string;
  isMulti: boolean;
  label: string;
}
