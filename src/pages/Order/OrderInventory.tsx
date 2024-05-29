import { SwipeableDrawer, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { ShoppingCart, ViewList, ViewModule } from '@mui/icons-material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/product.service';
// import { toast } from 'react-toastify';
import NoItems from '../../layouts/NoItems/NoItems';
import { useCartStore } from '../../store/cart-store';
import OrderCart from './OrderCart';
import OrderInventoryTable from './OrderInventoryTable';
import OrderInventoryGrid from './OrderInventoryGrid';

const OrderInventory = () => {
  // Hooks
  // const queryClient = useQueryClient();
  // const order = useCartStore((state) => state.order);
  const orderDetailsLen = useCartStore((state) => state.order.orderDetails.length);
  const addToOrder = useCartStore((state) => state.addOrderDetail);

  // Use states
  const [search, setSearch] = useState('');
  const [openTab, setOpenTab] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState('list');

  // Use effects

  // React query functions
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // React Query Mutations

  // handlers and helper funcionts

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOnProductSubmit = (orderDetail: OrderDetail) => {
    addToOrder(orderDetail);
  };

  const handleOnOpenTab = () => {
    setOpenTab(true);
  };

  const handleOnCloseTab = () => {
    setOpenTab(false);
  };

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView) console.log(nextView);
    if (nextView) setViewMode(nextView);
  };

  // TODO: Solve filtering with react query
  return (
    <>
      <InfoBar pageTitle="Orden">
        <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange}>
          <ToggleButton value="list" aria-label="list">
            <ViewList />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid">
            <ViewModule />
          </ToggleButton>
        </ToggleButtonGroup>
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
      ) : viewMode === 'list' ? (
        <OrderInventoryTable productsQuery={productsQuery} onProductSubmit={handleOnProductSubmit} />
      ) : (
        // send this to a component for grid view
        <OrderInventoryGrid productsQuery={productsQuery} onProductSubmit={handleOnProductSubmit} />
      )}
      <SwipeableDrawer anchor="right" open={openTab} onOpen={handleOnOpenTab} onClose={handleOnCloseTab}>
        <OrderCart />
      </SwipeableDrawer>
    </>
  );
};

export default OrderInventory;
