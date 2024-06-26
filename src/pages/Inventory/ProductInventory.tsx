import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { readProduct } from '../../services/product.service';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Button, Skeleton, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { createInventoryRegistry } from '../../services/inventory.service';
import ErrorImage from '../../assets/ErrorImage.png';
const ProductInventory = () => {
  //hooks
  const { productId } = useParams();

  const navigateTo = useNavigate();
  const id = Number(productId);
  const inventoryProduct: Inventory = {
    id: undefined,
    quantity: 0,
    productId: id,
  };
  const formik = useFormik({
    initialValues: inventoryProduct,
    onSubmit: (values, { resetForm }) => {
      createInventory(values);
      resetForm();
    },
    enableReinitialize: true,
  });
  // Use states

  // React query functions
  const productQuery = useQuery({
    queryKey: ['product'],
    queryFn: () => readProduct(id),
  });
  const { mutate: createInventory } = useMutation({
    mutationFn: (inventoryRegistry: Inventory) => createInventoryRegistry(inventoryRegistry),
    onSuccess: () => navigateTo('/inventory'),
    onError: () => toast.error('Error al crear el registro'),
  });
  // Other
  const pageTitle = `Inventario del producto ${productQuery?.data?.name}`;
  const handleOnCancel = () => {
    navigateTo('/inventory');
  };

  // const onImageError = (event: React.ReactEventHandler<HTMLImageElement>) => {
  //   event;
  // };
  return (
    <>
      <InfoBar pageTitle={pageTitle} />
      <div className="md:mx-8  rounded-md drop-shadow-md " style={{ backgroundColor: 'white' }}>
        {productQuery.isLoading ? (
          <Skeleton variant="rectangular" width={320} height={400} />
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 justify-center items-center w-full md:p-20 sm:p-2 "
          >
            {/* Todo change image to proper queried image */}
            <img
              src={productQuery?.data?.image}
              alt={productQuery?.data?.name}
              width={320}
              height={400}
              // placeholder={<Skeleton variant="rectangular" width={320} height={400} />}
              onError={(event) => (event.currentTarget.src = ErrorImage)}
            />
            <TextField
              className="w-full"
              label="Nombre del producto"
              name="name"
              value={productQuery?.data?.name}
              disabled
            />
            <div className="w-full flex flex-row gap-4">
              <NumericFormat
                className="w-full"
                name="priceUnit"
                value={productQuery?.data?.priceUnit}
                allowNegative={false}
                thousandSeparator=","
                prefix={'$ '}
                customInput={TextField}
                {...{ label: 'Precio por unidad' }}
                disabled
              />
            </div>
            <div className="w-full flex flex-row gap-4">
              <TextField
                className="w-full"
                label="Categoria del producto"
                fullWidth
                variant="outlined"
                value={productQuery?.data?.category?.name}
                disabled
              />
              <TextField
                className="w-full"
                label="Unidad del producto"
                fullWidth
                variant="outlined"
                value={productQuery?.data?.unit?.name}
                disabled
              />
            </div>
            <NumericFormat
              onValueChange={(values) => {
                const { floatValue } = values;
                // console.log(floatValue);
                formik.setFieldValue('quantity', floatValue);
              }}
              className="w-full"
              required
              name="quantity"
              allowNegative={false}
              thousandSeparator=","
              customInput={TextField}
              {...{ label: 'Cantidad' }}
            />
            <div className="w-full flex flex-row gap-4">
              <Button
                onClick={handleOnCancel}
                variant="contained"
                style={{ backgroundColor: '#F6F6FB', color: 'black' }}
                className="w-full text-black"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#900A20' }}
                className="w-full text-white"
              >
                Aceptar
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ProductInventory;
