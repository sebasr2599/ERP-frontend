import { TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import {} from '@mui/icons-material';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '../../services/category.service';
import { getUnits } from '../../services/unit.service';
import { getProducts } from '../../services/product.service';
// import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import NoItems from '../../layouts/NoItems/NoItems';

const OrderInventory = () => {
  // Hooks
  const queryClient = useQueryClient();
  // Use states
  const [search, setSearch] = useState('');

  // React query functions
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const categoriesQuery = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
  });

  const unitsQuery = useQuery({
    queryKey: ['units'],
    queryFn: getUnits,
  });

  // React Query Mutations
  // const { mutate: createProductMutate } = useMutation({
  //   mutationFn: (product: Product) => createProduct(product),
  //   onSuccess: () => {
  //     handleOnCloseModal();
  //     queryClient.invalidateQueries({ queryKey: ['products'] });
  //   },
  //   onError: () => toast.error('Error al crear un nuevo usuario'),
  // });

  // handlers and helper funcionts

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleOnProductSubmit = (orderDetail: OrderDetail) => {
    console.log(orderDetail);
  };

  // TODO: Solve filtering with react query
  return (
    <>
      <InfoBar pageTitle="Orden">
        <TextField sx={{ backgroundColor: '#FFF' }} fullWidth label="Buscar Categoria" onChange={handleSearch} />
        <TextField
          sx={{ backgroundColor: '#FFF' }}
          fullWidth
          label="Buscar producto"
          // onChange={handleSearch}
        />
      </InfoBar>
      {productsQuery.data?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <NoItems text="No se encontro ningun producto" />
        </div>
      ) : (
        <div className="w-full grid prodGridContainer gap-4 justify-center items-center p-4">
          {productsQuery.data?.map((product) => (
            <ProductCard onProductSubmit={handleOnProductSubmit} product={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default OrderInventory;
