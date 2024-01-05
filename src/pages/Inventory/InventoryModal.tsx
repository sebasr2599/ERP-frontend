import { FC } from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { useFormik } from 'formik';
import { Button, DialogActions, DialogContent, MenuItem, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { UseQueryResult } from '@tanstack/react-query';
import AcceptButton from '../../layouts/Buttons/AcceptButton/AcceptButton';
import CancelButton from '../../layouts/Buttons/CancelButton/CancelButton';

interface InventoryModalProps {
  open: boolean;
  product: Product;
  categories: UseQueryResult<Category[], Error>;
  units: UseQueryResult<Unit[], Error>;
  mode: modes;
  onClose: () => void;
  onCreateAccept: (product: Product) => void;
  onEditAccept: (product: Product) => void;
  onDeleteAccept: (Product: Product) => void;
}

type modes = 'Product' | 'Delete' | '';

const InventoryModal: FC<InventoryModalProps> = ({
  open,
  categories,
  units,
  product,
  mode,
  onClose,
  onCreateAccept,
  onEditAccept,
  onDeleteAccept,
}) => {
  const formik = useFormik({
    initialValues: product,
    onSubmit: (values, { resetForm }) => {
      product.id ? onEditAccept(values) : onCreateAccept(values);
      resetForm();
    },
    enableReinitialize: true,
  });
  return (
    <ModalTemplate
      open={open}
      title={mode === 'Product' ? (product.id ? 'Actualizar producto' : 'Agregar producto') : 'Borrar Producto'}
      handleOnClose={onClose}
    >
      {mode === 'Product' ? (
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
                  value={product.id && formik.values.priceUnit}
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
                  value={product.id && formik.values.priceWholesale}
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
            {/* <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit">Aceptar</Button> */}
            <CancelButton onClick={onClose} text="Cancelar" />
            <AcceptButton text="Aceptar" type="submit" />
          </DialogActions>
        </form>
      ) : (
        <div>
          <DialogContent>Seguro que quieres borrar el producto &apos;{product?.name}&apos;</DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={() => onDeleteAccept(product)}>Aceptar</Button>
          </DialogActions>
        </div>
      )}
    </ModalTemplate>
  );
};

export default InventoryModal;
//  <DialogContent>Seguro que quieres Borrar el usuario?</DialogContent>
