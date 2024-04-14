import { FC } from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { Form, Formik } from 'formik';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import AcceptButton from '../../layouts/Buttons/AcceptButton/AcceptButton';
import CancelButton from '../../layouts/Buttons/CancelButton/CancelButton';

interface UnitsModalProps {
  open: boolean;
  unit: Unit;
  mode: modes;
  onClose: () => void;
  onCreateAccept: (unit: Unit) => void;
  onEditAccept: (unit: Unit) => void;
  onDeleteAccept: (unit: Unit) => void;
}

type modes = 'Unit' | 'Delete' | '';

const UnitsModal: FC<UnitsModalProps> = ({
  open,
  unit,
  mode,
  onClose,
  onCreateAccept,
  onEditAccept,
  onDeleteAccept,
}) => {
  return (
    <ModalTemplate
      open={open}
      title={mode === 'Unit' ? (unit.id ? 'Actualizar Unidad' : 'Agregar Unidad') : 'Borrar Unidad'}
      handleOnClose={onClose}
    >
      {mode === 'Unit' ? (
        // move form into <Formik> component and add field array
        <Formik
          initialValues={unit}
          onSubmit={(values, { resetForm }) => {
            unit.id ? onEditAccept(values) : onCreateAccept(values);
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
                    className="w-full"
                    required
                    label="Nombre de la unidad"
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
          <DialogContent>Seguro que quieres borrar la unidad &apos;{unit?.name}&apos;</DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={() => onDeleteAccept(unit)}>Aceptar</Button>
          </DialogActions>
        </div>
      )}
    </ModalTemplate>
  );
};

export default UnitsModal;
