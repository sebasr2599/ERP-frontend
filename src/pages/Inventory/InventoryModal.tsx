import { FC } from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { useFormik } from 'formik';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';

interface InventoryModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const InventoryModal: FC<InventoryModalProps> = ({ open, onClose, product }) => {
  const formik = useFormik({
    initialValues: product,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      onClose();
    },
    enableReinitialize: true,
  });
  return (
    <ModalTemplate open={open} title="Agregar Producto" handleOnClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <TextField
              onChange={formik.handleChange}
              className="w-full"
              required
              label="Nombre del producto"
              name="name"
              value={formik.values.name}
            />

            <TextField
              onChange={formik.handleChange}
              className="w-full"
              required
              multiline
              maxRows={3}
              label="Descripción"
              name="description"
              value={formik.values.description}
            />
            <TextField
              onChange={formik.handleChange}
              className="w-full"
              required
              label="Imagen url del producto"
              name="image"
              value={formik.values.image}
            />
            <NumericFormat
              onValueChange={(values) => {
                const { floatValue } = values;
                console.log(floatValue);
                formik.setFieldValue('priceUnit', floatValue);
              }}
              className="w-full"
              required
              name="priceUnit"
              // removed this so we can get the pure number and not "$ number"
              //   value={formik.values.priceUnit}
              allowNegative={false}
              thousandSeparator=","
              prefix={'$ '}
              customInput={TextField}
              {...{ label: 'Precio por unidad' }}
            />
            <NumericFormat
              onValueChange={(values) => {
                const { floatValue } = values;
                console.log(floatValue);
                formik.setFieldValue('priceWholesale', floatValue);
              }}
              className="w-full"
              required
              name="priceWholesale"
              //   value={formik.values.priceWholesale}
              allowNegative={false}
              thousandSeparator=","
              prefix={'$ '}
              customInput={TextField}
              {...{ label: 'Precio por mayoreo' }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Aceptar</Button>
        </DialogActions>
      </form>
    </ModalTemplate>
  );
};

export default InventoryModal;
