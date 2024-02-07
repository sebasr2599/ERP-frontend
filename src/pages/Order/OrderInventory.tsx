import { SwipeableDrawer, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { ShoppingCart } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '../../services/category.service';
import { getUnits } from '../../services/unit.service';
import { getProducts } from '../../services/product.service';
// import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import NoItems from '../../layouts/NoItems/NoItems';
import { useCartStore } from '../../store/cart-store';
import OrderCart from './OrderCart';

const OrderInventory = () => {
  // Hooks
  const queryClient = useQueryClient();
  const orderStatus = useCartStore((state) => state.order.status);
  const orderDetailsLen = useCartStore((state) => state.order.orderDetails.length);
  const addToOrder = useCartStore((state) => state.addOrderDetail);

  // Use states
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState<boolean>(false);

  // Use effects
  useEffect(() => {
    if (orderStatus === 'NOT STARTED') {
      setModalOpen(true);
    }
  }, []);

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
    addToOrder(orderDetail);
  };

  const handleOnOpenTab = () => {
    setOpenTab(true);
  };

  const handleOnCloseTab = () => {
    setOpenTab(false);
  };

  // TODO: Solve filtering with react query
  return (
    <>
      <InfoBar pageTitle="Orden">
        <button
          className="flex flex-row items-center p-4 gap-2 rounded-full bg-white border border-slate-400 hover:bg-slate-100 hover:border-slate-700 hover:cursor-pointer"
          onClick={handleOnOpenTab}
        >
          <span className="text-xl text-slate-400">{orderDetailsLen}</span>
          <ShoppingCart className="text-xl text-slate-400" />
        </button>
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
      <SwipeableDrawer anchor="right" open={openTab} onOpen={handleOnOpenTab} onClose={handleOnCloseTab}>
        <OrderCart />
      </SwipeableDrawer>
    </>
  );
};

export default OrderInventory;
