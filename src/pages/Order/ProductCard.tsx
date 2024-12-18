import { Button, MenuItem, TextField } from '@mui/material';
import { FC } from 'react';
import { NumericFormat } from 'react-number-format';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ErrorImage from '../../assets/ErrorImage.png';
import { Form, Formik } from 'formik';
import { totalHelper } from '../../utils/orderUtil';
export interface ProductCardProps {
  product: Product;
  onProductSubmit: (orderDetail: OrderDetail) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onProductSubmit }) => {
  // TODO: Get this out of the single component
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
    <div
      key={product.id}
      className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
      style={{ backgroundColor: 'white', borderColor: '#F6F6F6' }}
    >
      <div className="relative">
        <div className="w-full flex items-center justify-center">
          <LazyLoadImage
            src={product.image}
            alt={product.name}
            placeholderSrc={ErrorImage}
            className="relative h-80 m-2.5 overflow-hidden text-white rounded-md"
            width={300}
          />
        </div>
      </div>
      <Formik
        initialValues={model}
        onSubmit={(values, { resetForm }) => {
          onProductSubmit(values);
          resetForm();
        }}
        enableReinitialize
      >
        {(props) => (
          <Form className="px-5 pb-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-row justify-center items-center gap-2">
                <span className="text-xl font-semibold tracking-tight text-gray-900 ">{product.name}</span>
                <span className="text-sm  text-gray-500 ">{product?.category?.name}</span>
              </div>
              <span className="text-3xl font-bold text-gray-900 flex items-center">
                <NumericFormat
                  // value={totalHelper(props.values.quantity, props.values.equivalency, props.values.unitId)}
                  value={props.values.total}
                  prefix="$"
                  thousandSeparator
                  displayType="text"
                  disabled
                />
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              {/* TODO: Change to Numeric format */}
              <TextField
                onChange={async (e) => {
                  props.handleChange(e);
                  await props.setFieldValue(
                    'total',
                    totalHelper(+e.target.value, props.values.price, props.values.unitId, product),
                  );
                }}
                value={props.values.quantity}
                required
                label="Cantidad"
                name="quantity"
                fullWidth
                type="number"
              />
              <TextField
                required
                onChange={(e) => props.handleChange(e)}
                select
                label="Unidad del producto"
                fullWidth
                variant="outlined"
                name="unitId"
                value={props.values.unitId}
                disabled={product.equivalentUnits?.length < 1}
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
            </div>
            <div className="flex items-center justify-center w-full">
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#900A20' }}
                className=" text-white"
                fullWidth
                disabled={props.values.quantity > 0 ? false : true}
              >
                Agregar a carrito
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    // <div
    //   key={product.id}
    //   className="w-full max-w-sm  border border-gray-800 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    //   style={{ backgroundColor: 'white', borderColor: '#F6F6F6' }}
    // >
    //   <img
    //     className="p-8 rounded-t-lg"
    //     src="https://drive.google.com/uc?export=view&id=1oJgY3Fjd28ihFUWBowB6n1tdXfEfumDn"
    //     alt="Product"
    //   />

    // </div>
  );
};
export default ProductCard;
