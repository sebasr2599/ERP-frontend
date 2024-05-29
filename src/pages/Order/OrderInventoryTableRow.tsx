import { Form, Formik } from 'formik';
import { totalHelper } from '../../utils/orderUtil';
import { FC } from 'react';
import { NumericFormat } from 'react-number-format';
import { Button, MenuItem, TextField } from '@mui/material';

export interface OrderInventoryTableRow {
  product: Product;
  onProductSubmit: (orderDetail: OrderDetail) => void;
}
const OrderInventoryTableRow: FC<OrderInventoryTableRow> = ({ product, onProductSubmit }) => {
  const model: OrderDetail = {
    quantity: 0,
    price: product.priceUnit,
    // price: totalHelper(0, product?.priceUnit, product.unitId) || 0,
    unitId: product.unitId || 1,
    productId: product.id || 1,
    total: totalHelper(0, product?.priceUnit, product.unitId, product) || 0,
    productName: product.name,
    unitName: product.unit?.name,
    // total: product.priceUnit,
  };
  return (
    <div className="flex flex-row gap 2 w-full">
      <Formik
        initialValues={model}
        onSubmit={(values, { resetForm }) => {
          onProductSubmit(values);
          resetForm();
        }}
        enableReinitialize
      >
        {(props) => (
          <Form className="flex flex-row gap-6 w-full">
            <TextField
              onChange={async (e) => {
                props.handleChange(e);
                await props.setFieldValue(
                  'total',
                  totalHelper(+e.target.value, props.values.price, props.values.unitId, product),
                );
              }}
              value={props.values.quantity}
              sx={{ '& .MuiInputBase-input': { height: 55 } }}
              required
              name="quantity"
              fullWidth
              type="number"
            />

            <TextField
              required
              onChange={(e) => props.handleChange(e)}
              select
              fullWidth
              variant="outlined"
              name="unitId"
              value={props.values.unitId}
              disabled={product.equivalentUnits?.length < 1}
              sx={{ '& .MuiInputBase-input': { height: 55 } }}
            >
              <MenuItem
                value={product.unit?.id}
                onClick={() => {
                  props.setFieldValue('price', product.priceUnit);
                  props.setFieldValue(
                    'total',
                    totalHelper(props.values.quantity, product.priceUnit, product.unitId, product),
                  );
                  props.setFieldValue('unitName', product.unit?.name);
                }}
              >
                {product.unit?.name}
              </MenuItem>
              {product.equivalentUnits?.map((equivalentUnit) => (
                <MenuItem
                  key={equivalentUnit.unit?.id}
                  value={equivalentUnit.unit?.id}
                  onClick={() => {
                    props.setFieldValue('price', equivalentUnit.equivalent);
                    props.setFieldValue(
                      'total',
                      totalHelper(props.values.quantity, equivalentUnit.equivalent, equivalentUnit.unitId, product),
                    );
                    props.setFieldValue('unitName', equivalentUnit.unit.name);
                  }}
                >
                  {equivalentUnit.unit?.name}
                </MenuItem>
              ))}
            </TextField>

            <span className="text-xl font-bold text-gray-900 flex items-center">
              <NumericFormat
                // value={totalHelper(props.values.quantity, props.values.equivalency, props.values.unitId)}
                value={props.values.total}
                prefix="$"
                thousandSeparator
                displayType="text"
                disabled
              />
            </span>
            <Button
              type="submit"
              variant="contained"
              sx={{
                '&.Mui-disabled': {
                  color: '#c0c0c0',
                },
              }}
              style={{ backgroundColor: '#900A20' }}
              className=" text-white"
              fullWidth
              disabled={props.values.quantity > 0 ? false : true}
            >
              Agregar a carrito
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrderInventoryTableRow;
