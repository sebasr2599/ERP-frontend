import { FC } from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { Form, Formik } from 'formik';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import AcceptButton from '../../layouts/Buttons/AcceptButton/AcceptButton';
import CancelButton from '../../layouts/Buttons/CancelButton/CancelButton';

interface ClientsModalProps {
  open: boolean;
  client: Client;
  mode: modes;
  onClose: () => void;
  onCreateAccept: (category: Category) => void;
  onEditAccept: (category: Category) => void;
  onDeleteAccept: (category: Category) => void;
}

type modes = 'Client' | 'Delete' | '';

const ClientsModal: FC<ClientsModalProps> = ({
  open,
  client,
  mode,
  onClose,
  onCreateAccept,
  onEditAccept,
  onDeleteAccept,
}) => {
  return (
    <ModalTemplate
      open={open}
      title={mode === 'Client' ? (client.id ? 'Actualizar cliente' : 'Agregar cliente') : 'Borrar cliente'}
      handleOnClose={onClose}
    >
      {mode === 'Client' ? (
        // move form into <Formik> component and add field array
        <Formik
          initialValues={client}
          onSubmit={(values, { resetForm }) => {
            client.id ? onEditAccept(values) : onCreateAccept(values);
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
                    label="Nombre del cliente"
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
          <DialogContent>Seguro que quieres borrar el cliente &apos;{client?.name}&apos;</DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={() => onDeleteAccept(client)}>Aceptar</Button>
          </DialogActions>
        </div>
      )}
    </ModalTemplate>
  );
};

export default ClientsModal;
