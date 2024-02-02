import { FC } from 'react';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { FieldArray, Form, Formik } from 'formik';
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
  // const formik = useFormik({
  //   initialValues: product,
  //   onSubmit: (values, { resetForm }) => {
  //     product.id ? onEditAccept(values) : onCreateAccept(values);
  //     resetForm();
  //   },
  //   enableReinitialize: true,
  // });
  return (
    <ModalTemplate
      open={open}
      title={mode === 'Product' ? (product.id ? 'Actualizar producto' : 'Agregar producto') : 'Borrar Producto'}
      handleOnClose={onClose}
    >
      {mode === 'Product' ? (
        // move form into <Formik> component and add field array
        <Formik
          initialValues={product}
          onSubmit={(values, { resetForm }) => {
            product.id ? onEditAccept(values) : onCreateAccept(values);
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
                    label="Nombre del producto"
                    name="name"
                    value={props.values.name}
                  />

                  <TextField
                    onChange={props.handleChange}
                    className="w-full"
                    required
                    multiline
                    maxRows={3}
                    label="Descripción"
                    name="description"
                    value={props.values.description}
                  />
                  <TextField
                    onChange={props.handleChange}
                    className="w-full"
                    required
                    label="Imagen url del producto"
                    name="image"
                    value={props.values.image}
                  />

                  <div className="flex flex-row gap-4">
                    <NumericFormat
                      onValueChange={(values) => {
                        const { floatValue } = values;
                        props.setFieldValue('priceUnit', floatValue);
                      }}
                      className="w-full"
                      required
                      name="priceUnit"
                      // removed this so we can get the pure number and not "$ number"
                      value={product.id && props.values.priceUnit}
                      allowNegative={false}
                      thousandSeparator=","
                      prefix={'$ '}
                      customInput={TextField}
                      {...{ label: 'Precio por unidad' }}
                    />
                    <NumericFormat
                      onValueChange={(values) => {
                        const { floatValue } = values;
                        props.setFieldValue('priceWholesale', floatValue);
                      }}
                      className="w-full"
                      required
                      name="priceWholesale"
                      value={product.id && props.values.priceWholesale}
                      allowNegative={false}
                      thousandSeparator=","
                      prefix={'$ '}
                      customInput={TextField}
                      {...{ label: 'Precio por mayoreo' }}
                    />
                  </div>
                  <div className="flex flex-row gap-4">
                    <TextField
                      onChange={props.handleChange('categoryId')}
                      className="w-full"
                      required
                      select
                      label="Categoria del producto"
                      fullWidth
                      variant="outlined"
                      value={props.values.categoryId}
                    >
                      {categories.data?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      onChange={props.handleChange('unitId')}
                      className="w-full"
                      required
                      select
                      label="Unidad del producto"
                      fullWidth
                      variant="outlined"
                      value={props.values.unitId}
                    >
                      {units.data?.map((unit) => (
                        <MenuItem key={unit.id} value={unit.id}>
                          {unit.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <FieldArray
                    name="equivalentUnits"
                    render={(arrayHelpers) => (
                      <div className="w-full flex flex-col gap-4">
                        {props.values.equivalentUnits &&
                          props.values.equivalentUnits.length > 0 &&
                          props.values.equivalentUnits.map((_, index) => (
                            <div key={index} className="flex flex-row gap-4">
                              {/* <TextField
                                onChange={props.handleChange}
                                className="w-full"
                                required
                                label="Imagen url del producto"
                                name={`equivalencies.${index}`}
                                value={props.values.equivalencies?.[index]?.id}
                              /> */}
                              <NumericFormat
                                onValueChange={(values) => {
                                  const { floatValue } = values;
                                  props.setFieldValue(`equivalentUnits.${index}.equivalent`, floatValue);
                                }}
                                className="w-full"
                                required
                                name={`equivalentUnits.${index}.equivalent`}
                                value={product.id && props.values.equivalentUnits?.[index].equivalent}
                                allowNegative={false}
                                thousandSeparator=","
                                prefix={'$ '}
                                customInput={TextField}
                                {...{ label: 'Precio de la equivalencia' }}
                              />
                              <TextField
                                onChange={props.handleChange(`equivalentUnits.${index}.unitId`)}
                                className="w-full"
                                required
                                select
                                label="Unidad del producto"
                                fullWidth
                                variant="outlined"
                                value={props.values.equivalentUnits?.[index]?.unitId}
                              >
                                {units.data?.map((unit) => (
                                  <MenuItem key={unit.id} value={unit.id}>
                                    {unit.name}
                                  </MenuItem>
                                ))}
                              </TextField>

                              {!product.id && (
                                <Button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  Remover
                                </Button>
                              )}
                            </div>
                          ))}
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            backgroundColor: '#F6F6FB',
                            color: 'gray',
                            '&:hover': { backgroundColor: '#E5E5EC' },
                          }}
                          onClick={() =>
                            arrayHelpers.push({
                              equivalent: 0,
                              unitId: 1,
                            })
                          }
                        >
                          Agregar equivalencias
                        </Button>
                      </div>
                    )}
                  />
                </div>
              </DialogContent>
              <DialogActions sx={{ paddingBottom: '1.5em' }}>
                {/* <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit">Aceptar</Button> */}
                <CancelButton onClick={onClose} text="Cancelar" />
                <AcceptButton text="Aceptar" type="submit" />
              </DialogActions>
            </Form>
          )}
        </Formik>
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
