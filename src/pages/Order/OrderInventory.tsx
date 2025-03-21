import { SwipeableDrawer, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { ShoppingCart } from '@mui/icons-material';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProducts } from '../../services/product.service';
// import { toast } from 'react-toastify';
import NoItems from '../../layouts/NoItems/NoItems';
import { useCartStore } from '../../store/cart-store';
import OrderCart from './OrderCart';
import OrderInventoryTable from './OrderInventoryTable';
import OrderInventoryGrid from './OrderInventoryGrid';
import { getCategories } from '../../services/category.service';
import CustomLoading from '../../components/CustomLoading/CustomLoading';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import ViewSlider from '../../components/ViewSlider/ViewSlider';
import Pagination from '../../components/Pagination/Pagination';

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
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [prevPage, setPrevPage] = useState<number[] | []>([]);
  const [cursor, setCursor] = useState<number | undefined>();
  // Use effects

  // React query functions
  const productsQuery = useQuery({
    queryKey: ['products', search, selectedCategory, cursor],
    queryFn: () => getProducts(search, selectedCategory, cursor),
    placeholderData: keepPreviousData,
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // React Query Mutations

  // handlers and helper funcionts

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    resetCursor();
    setPrevPage([]);
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
    if (nextView) setViewMode(nextView); // If needed to always have a value selected
  };

  const handleOnCategorySelect = (event: React.MouseEvent<HTMLElement>, selected: number) => {
    setSelectedCategory(selected);
    resetCursor();
    setPrevPage([]);
  };
  const handleOnPrevClick = () => {
    if (!productsQuery.isPlaceholderData && productsQuery?.data) {
      setCursor(handleRemoveItem);
    }
  };
  const handleOnNextClick = () => {
    if (!productsQuery.isPlaceholderData && productsQuery.data) {
      const nextId = productsQuery.data[productsQuery.data?.length - 1]?.id;
      const oldPage = productsQuery.data[0]?.id;
      handleAddItem(oldPage);
      setCursor(nextId);
    }
  };
  const handleAddItem = (num: number | undefined) => {
    if (num) setPrevPage([...prevPage, num]);
  };

  const handleRemoveItem = () => {
    const newItems = [...prevPage];
    const x = newItems.pop();
    setPrevPage(newItems);
    return x;
  };
  const resetCursor = () => {
    setCursor(undefined);
  };

  return (
    <>
      <InfoBar pageTitle="Orden">
        <CategorySlider
          categoriesQuery={categoriesQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={handleOnCategorySelect}
        />
        <ViewSlider viewMode={viewMode} handleViewModeChange={handleViewModeChange} />
        {/* Cart  */}
        <button
          className="flex flex-row items-center p-4 gap-2 rounded-full bg-white border border-slate-400 hover:bg-slate-100 hover:border-slate-700 hover:cursor-pointer"
          onClick={handleOnOpenTab}
        >
          <span className="text-xl text-slate-400">{orderDetailsLen}</span>
          <ShoppingCart className="text-xl text-slate-400" />
        </button>
        {/* Search Field  */}
        <TextField sx={{ backgroundColor: '#FFF' }} fullWidth label="Buscar producto" onChange={handleSearch} />
      </InfoBar>
      {productsQuery.isLoading ? (
        <CustomLoading />
      ) : productsQuery.data?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <NoItems text="No se encontro ningun producto" />
        </div>
      ) : (
        <>
          {viewMode === 'list' ? (
            <OrderInventoryTable productsQuery={productsQuery} onProductSubmit={handleOnProductSubmit} />
          ) : (
            <OrderInventoryGrid productsQuery={productsQuery} onProductSubmit={handleOnProductSubmit} />
          )}
          <Pagination
            isPlaceholderData={productsQuery.isPlaceholderData}
            prevPage={prevPage}
            onPrevClick={handleOnPrevClick}
            onNextClick={handleOnNextClick}
          />
        </>
      )}
      <SwipeableDrawer anchor="right" open={openTab} onOpen={handleOnOpenTab} onClose={handleOnCloseTab}>
        <OrderCart />
      </SwipeableDrawer>
    </>
  );
};

export default OrderInventory;
