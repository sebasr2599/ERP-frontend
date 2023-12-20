import { FC } from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { useFormik } from 'formik';
import { Button, DialogActions, DialogContent, MenuItem, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { UseQueryResult } from '@tanstack/react-query';

interface InventoryModalProps {
  open: boolean;
  product: Product;
  categories: UseQueryResult<Category[], Error>;
  units: UseQueryResult<Unit[], Error>;
  onClose: () => void;
  onCreateAccept: (product: Product) => void;
}

const InventoryModal: FC<InventoryModalProps> = ({ open, categories, units, product, onClose, onCreateAccept }) => {
  const formik = useFormik({
    initialValues: product,
    onSubmit: (values, { resetForm }) => {
      onCreateAccept(values);
      resetForm();
    },
    enableReinitialize: true,
  });
  // TODO: solve the a component is changing uncontrolled input bug
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

            <div className="flex flex-row gap-4">
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
            <div className="flex flex-row gap-4">
              <TextField
                onChange={formik.handleChange('categoryId')}
                className="w-full"
                required
                select
                label="Categoria del producto"
                fullWidth
                variant="outlined"
                value={formik.values.categoryId}
              >
                {categories.data?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                onChange={formik.handleChange('unitId')}
                className="w-full"
                required
                select
                label="Unidad del producto"
                fullWidth
                variant="outlined"
                value={formik.values.unitId}
              >
                {units.data?.map((unit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
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
