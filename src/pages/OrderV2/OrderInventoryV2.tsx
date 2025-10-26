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
import OrderInventoryGrid from './OrderInventoryGrid';
import { getCategories } from '../../services/category.service';
import CustomLoading from '../../components/CustomLoading/CustomLoading';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import Pagination from '../../components/Pagination/Pagination';

const OrderInventoryV2 = () => {
  // Hooks
  // const queryClient = useQueryClient();
  // const order = useCartStore((state) => state.order);
  const orderDetailsLen = useCartStore((state) => state.order.orderDetails.length);
  // const addToOrder = useCartStore((state) => state.addOrderDetail);

  // Use states
  const [search, setSearch] = useState('');
  const [openTab, setOpenTab] = useState<boolean>(false);
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

  const handleOnProductSubmit = (product: Product) => {
    // For now, just log the product object
    // eslint-disable-next-line no-console
    console.log('Add product clicked:', product);
  };

  const handleOnOpenTab = () => {
    setOpenTab(true);
  };

  const handleOnCloseTab = () => {
    setOpenTab(false);
  };
  const handleOnCategorySelect = (event: React.MouseEvent<HTMLElement>, selected: number) => {
    setSelectedCategory(selected);
    resetCursor();
    setPrevPage([]);
  };
  const handleOnPrevClick = () => {
    if (productsQuery.isPlaceholderData || !productsQuery.data?.length) return;
    setCursor(handleRemoveItem());
  };
  const handleOnNextClick = () => {
    if (productsQuery.isPlaceholderData || !productsQuery.data?.length) return;
    const nextId = productsQuery.data[productsQuery.data.length - 1]?.id;
    const firstId = productsQuery.data[0]?.id;
    if (!nextId || !firstId) return;
    handleAddItem(firstId);
    setCursor(nextId);
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
      <InfoBar pageTitle="Orden V2">
        <CategorySlider
          categoriesQuery={categoriesQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={handleOnCategorySelect}
        />
        {/* Cart  */}
        <button
          className="flex flex-row items-center gap-2 rounded-full border border-slate-300 bg-white p-3 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Abrir carrito"
          tabIndex={0}
          onClick={handleOnOpenTab}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOnOpenTab();
            }
          }}
        >
          <span className={`text-base ${orderDetailsLen ? 'text-primary font-semibold' : 'text-slate-400'}`}>
            {orderDetailsLen}
          </span>
          <ShoppingCart className={`text-xl ${orderDetailsLen ? 'text-primary' : 'text-slate-400'}`} />
        </button>
        {/* Search Field  */}
        <TextField
          aria-label="Buscar producto"
          sx={{ backgroundColor: '#FFF' }}
          fullWidth
          label="Buscar producto"
          onChange={handleSearch}
          inputProps={{ inputMode: 'search' }}
        />
      </InfoBar>
      {productsQuery.isLoading ? (
        <CustomLoading />
      ) : productsQuery.data?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <NoItems text="No se encontro ningun producto" />
        </div>
      ) : (
        <>
          <OrderInventoryGrid productsQuery={productsQuery} onProductSubmit={handleOnProductSubmit} />
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

export default OrderInventoryV2;
