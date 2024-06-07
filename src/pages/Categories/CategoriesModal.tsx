import { FC } from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { Form, Formik } from 'formik';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import AcceptButton from '../../layouts/Buttons/AcceptButton/AcceptButton';
import CancelButton from '../../layouts/Buttons/CancelButton/CancelButton';

interface CategoriesModalProps {
  open: boolean;
  category: Category;
  mode: modes;
  onClose: () => void;
  onCreateAccept: (category: Category) => void;
  onEditAccept: (category: Category) => void;
  onDeleteAccept: (category: Category) => void;
}

type modes = 'Category' | 'Delete' | '';

const CategoriesModal: FC<CategoriesModalProps> = ({
  open,
  category,
  mode,
  onClose,
  onCreateAccept,
  onEditAccept,
  onDeleteAccept,
}) => {
  return (
    <ModalTemplate
      open={open}
      title={mode === 'Category' ? (category.id ? 'Actualizar categoría' : 'Agregar Categoría') : 'Borrar Categoría'}
      handleOnClose={onClose}
    >
      {mode === 'Category' ? (
        // move form into <Formik> component and add field array
        <Formik
          initialValues={category}
          onSubmit={(values, { resetForm }) => {
            category.id !== undefined ? onEditAccept(values) : onCreateAccept(values);
            resetForm();
          }}
          enableReinitialize
        >
          {(props) => (
            <Form>
              <DialogContent>
                <div className="flex flex-col gap-4">
                  <TextField
                    onChange={props.handleChange}
                    autoComplete="off"
                    className="w-full"
                    required
                    label="Nombre de la categoría"
                    name="name"
                    value={props.values.name}
                  />
                </div>
              </DialogContent>
              <DialogActions sx={{ paddingBottom: '1.5em' }}>
                <CancelButton onClick={onClose} text="Cancelar" />
                <AcceptButton text="Aceptar" type="submit" />
              </DialogActions>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <DialogContent>Seguro que quieres borrar la Categoria &apos;{category?.name}&apos;</DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={() => onDeleteAccept(category)}>Aceptar</Button>
          </DialogActions>
        </div>
      )}
    </ModalTemplate>
  );
};

export default CategoriesModal;
//  <DialogContent>Seguro que quieres Borrar el usuario?</DialogContent>
