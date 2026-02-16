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

export type InputFieldsProps<T, R> = {
  disabled?: boolean;
  name: string;
  form: FormApi<T, Partial<T>>;
  className?: string;
  placeholder?: string;
  inputType?: InputType;
  label?: string;
  type?: string;
  autoFocus?: boolean;
} & ({
  type: 'text';
  onCustomChange: (event: ChangeEvent<HTMLInputElement>) => R;
  parseValue: (value: any) => string
} | {
  type: 'text';
  onCustomChange?: (event: ChangeEvent<HTMLInputElement>) => R;
  parseValue?: (value: any) => string
} | {
  type: 'textarea';
  onCustomChange: (event: ChangeEvent<HTMLAreaElement>) => R;
  parseValue: (value: any) => string
} | {
  type: 'textarea';
  onCustomChange?: (event: ChangeEvent<HTMLAreaElement>) => R;
  parseValue?: (value: any) => string
});


export type InputProps<T> = {
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (event: ChangeEvent<T>) => void;
  type?: string;
  [key: string]: any;
}

export enum InputType {
  all = 'all',
  onlyError = 'onlyError',
  onlyInput = 'input',
}

export type InputFormWrapperProps<T, R> = FieldRenderPropsDep<T> & {
  autoFocus?: boolean;
  placeholder?: string;
  inputType?: InputType;
  type?: string;
} & ({
  type: 'text';
  onCustomChange: (event: ChangeEvent<HTMLInputElement>) => R;
  parseValue: (value: any) => string
} | {
  type: 'text';
  onCustomChange?: (event: ChangeEvent<HTMLInputElement>) => R;
  parseValue?: (value: T) => string
} | {
  type: 'textarea';
  onCustomChange: (event: ChangeEvent<HTMLAreaElement>) => R;
  parseValue: (value: any) => string
} | {
  type: 'textarea';
  onCustomChange?: (event: ChangeEvent<HTMLAreaElement>) => R;
  parseValue?: (value: T) => string
});


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
