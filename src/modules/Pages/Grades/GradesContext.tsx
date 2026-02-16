import React, { createContext, useState } from 'react';
import { FormRenderProps, useForm } from 'react-final-form-hooks';
import { useDispatch } from 'react-redux';
import { GradeField } from '~/src/store/grade/constants';
import { addGradesRequest, updateGradesRequest } from '~/src/store/grade/reducer';

interface GradesProviderProps {
  children: React.ReactNode;
}
export interface GradesField {
  newGrades: Record<string, GradeField>;
  editGrades: Record<string, GradeField>;
}

interface GradesContext {
  form: FormRenderProps<GradesField> | null;
  setEdit: (id: string) => void;
  isEditing: Record<string, boolean>;
}
export const GradesContext = createContext<GradesContext>({
  isEditing: {},
  form: null,
  setEdit: () => {}
});

const GradesProvider = ({ children }: GradesProviderProps) => {
  const dispatch = useDispatch();
  const [isEditing, setEditState] = useState<Record<string, boolean>>({});

  const setEdit = (id: string) => {
    setEditState((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const form = useForm<GradesField>({
    onSubmit: async ({ editGrades, newGrades }, form) => {
      const toAdd: GradeField[] = Object.values(newGrades);
      const toUpdate: GradeField[] = Object.values(editGrades);
      await Promise.all([
        new Promise((resolve, reject) => {
          dispatch(addGradesRequest({ toAdd, resolve, reject }));
        }),
        new Promise((resolve, reject) => {
          dispatch(updateGradesRequest({ toUpdate, resolve, reject }));
        }),
      ]);

      form.reset();
      setEditState({});
    }
  })

  return (
    <GradesContext.Provider value={{ form, setEdit, isEditing }}>
      <form onSubmit={form.handleSubmit}>
        {children}
      </form>
    </GradesContext.Provider >
  )
};

export default GradesProvider;
