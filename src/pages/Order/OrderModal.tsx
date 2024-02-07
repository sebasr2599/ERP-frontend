import { FC } from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { Form, Formik } from 'formik';
import { DialogActions, DialogContent, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';

import AcceptButton from '../../layouts/Buttons/AcceptButton/AcceptButton';
import CancelButton from '../../layouts/Buttons/CancelButton/CancelButton';
import { useNavigate } from 'react-router-dom';

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  onCreateAccept: (order: Order) => void;
}

const OrderModal: FC<OrderModalProps> = ({ open, onCreateAccept }) => {
  const navigateTo = useNavigate();

  const order: Order = {
    name: '',
    location: '',
    wholesale: false,
    status: 'NOT STARTED',
    total: 0,
    orderDetails: [],
  };
  return (
    <ModalTemplate open={open} title="Crear nueva orden" handleOnClose={() => navigateTo('/')}>
      <Formik
        initialValues={order}
        onSubmit={(values, { resetForm }) => {
          onCreateAccept(values);
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
                  label="Nombre de la orden"
                  name="name"
                  value={props.values.name}
                />
                <TextField
                  onChange={props.handleChange}
                  className="w-full"
                  required
                  label="Ubicación"
                  name="location"
                  value={props.values.location}
                />
              </div>
              <RadioGroup row name="wholesale" value={props.values.wholesale} onChange={props.handleChange}>
                <FormControlLabel value={false} label="Menudeo" control={<Radio />} />
                <FormControlLabel value={true} label="Mayoreo" control={<Radio />} />
              </RadioGroup>
            </DialogContent>
            <DialogActions sx={{ paddingBottom: '1.5em' }}>
              {/* <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit">Aceptar</Button> */}
              <CancelButton onClick={() => navigateTo('/')} text="Cancelar" />
              <AcceptButton text="Aceptar" type="submit" />
            </DialogActions>
          </Form>
        )}
      </Formik>
    </ModalTemplate>
  );
};

export default OrderModal;
