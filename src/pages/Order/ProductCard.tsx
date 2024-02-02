import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ErrorImage from '../../assets/ErrorImage.png';
import { UseQueryResult } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
export interface ProductCardProps {
  product: Product;
  onProductSubmit: (orderDetail: OrderDetail) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onProductSubmit }) => {
  const [selectedUnit, setSetselectedUnit] = useState('');
  const model: OrderDetail = {
    quantity: 0,
    price: 0,
    unitId: product.unitId || 1,
    productId: product.id || 1,
    equivalency: product.priceUnit || 1,
  };
  const totalHelper = (quantity: number, equivalency: number | undefined): number => {
    // TODO: correct total
    return 0;
  };
  return (
    <div
      key={product.id}
      className="w-full max-w-sm border border-gray-800 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 justify-self-center"
      style={{ backgroundColor: 'white', borderColor: '#F6F6F6' }}
    >
      <div className="relative">
        <div className="p-8 rounded-t-lg">
          <LazyLoadImage src={product.image} alt={product.name} placeholderSrc={ErrorImage} width={350} height={320} />
        </div>
      </div>
      <Formik initialValues={model} onSubmit={onProductSubmit} enableReinitialize>
        {(props) => (
          <Form className="px-5 pb-5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-row justify-center items-center gap-2">
                <span className="text-xl font-semibold tracking-tight text-gray-900 ">{product.name}</span>
                <span className="text-sm  text-gray-500 ">{product?.category?.name}</span>
              </div>
              <span className="text-3xl font-bold text-gray-900 flex items-center">
                <NumericFormat
                  value={
                    props.values.quantity <= 0 && props.values.unitId === product.unitId
                      ? product?.priceUnit
                      : totalHelper(props.values.quantity, props.values.equivalency)
                    //  props.values.quantity * (props.values?.equivalency && 1)
                  }
                  prefix="$"
                  thousandSeparator
                  displayType="text"
                  disabled
                />
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <TextField
                onChange={props.handleChange}
                value={props.values.quantity}
                required
                label="Cantidad"
                name="quantity"
                fullWidth
                type="number"
              />
              <TextField
                required
                onChange={props.handleChange('unitId')}
                select
                label="Unidad del producto"
                fullWidth
                variant="outlined"
                value={props.values.unitId}
              >
                <MenuItem value={product.unit?.id}>{product.unit?.name}</MenuItem>
                {product.equivalentUnits?.map((equivalentUnit) => (
                  <MenuItem key={equivalentUnit.unit?.id} value={equivalentUnit.unit?.id}>
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
{
  /* 
  TODO: Make the default the product main unit
  TODO: Select maps the units inputed in array
  TODO: Handle Change with formik
  TODO: Quantity input select
  TODO: Post to console.log
  TODO: Add to Zustand store
  
*/
}
export default ProductCard;
