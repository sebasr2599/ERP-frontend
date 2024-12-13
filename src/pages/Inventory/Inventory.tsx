import { Button, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import InventoryModal from './InventoryModal';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '../../services/category.service';
import { getUnits } from '../../services/unit.service';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../services/product.service';
import { toast } from 'react-toastify';
import NoItems from '../../layouts/NoItems/NoItems';
import InventoryGrid from './InventoryGrid';
import InventoryTable from './InventoryTable';
import CustomLoading from '../../components/CustomLoading/CustomLoading';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import ViewSlider from '../../components/ViewSlider/ViewSlider';
import Pagination from '../../components/Pagination/Pagination';

const model: Product = {
  id: undefined,
  name: '',
  description: '',
  image: '',
  priceUnit: 0,
  unitId: 1,
  categoryId: 1,
  equivalentUnits: [],
};

type modes = 'Product' | 'Delete' | '';
const Inventory = () => {
  // Hooks
  const queryClient = useQueryClient();
  // Use states
  const [openModal, setOpenModal] = useState(false);
  const [productModel, setProductModel] = useState<Product>(model);
  const [modalMode, setModalMode] = useState<modes>('');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [prevPage, setPrevPage] = useState<number[] | []>([]);
  const [cursor, setCursor] = useState<number | undefined>();

  // React query functions
  const productsQuery = useQuery({
    queryKey: ['products', search, selectedCategory, cursor],
    queryFn: () => getProducts(search, selectedCategory, cursor),
    placeholderData: keepPreviousData,
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
  const { mutate: createProductMutate } = useMutation({
    mutationFn: (product: Product) => createProduct(product),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => toast.error('Error al crear un nuevo producto'),
  });

  const { mutate: editProductMutate } = useMutation({
    mutationFn: (product: Product) => updateProduct(product),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => toast.error('Error al editar producto'),
  });

  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: (product: Product) => deleteProduct(product),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError: () => toast.error('Error al borrar'),
  });

  // handlers and helper funcionts
  const handleOnOpenModal = () => setOpenModal(true);

  const handleOnCloseModal = () => {
    setOpenModal(false);
    setProductModel(model);
  };

  const handleOnAddProduct = () => {
    setProductModel(model);
    setModalMode('Product');
    handleOnOpenModal();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOnEditClick = (product: Product) => {
    setProductModel(product);
    setModalMode('Product');
    handleOnOpenModal();
  };

  const handleOnDeleteClick = (product: Product) => {
    setProductModel(product);
    setModalMode('Delete');
    handleOnOpenModal();
  };

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView) setViewMode(nextView); // If needed to always have a value selected
  };

  const handleOnCategorySelect = (event: React.MouseEvent<HTMLElement>, selected: number) => {
    setSelectedCategory(selected);
  };
  // TODO: Move pagination into custom hook
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

  return (
    <>
      <InfoBar pageTitle="Inventario">
        <CategorySlider
          categoriesQuery={categoriesQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={handleOnCategorySelect}
        />
        <ViewSlider viewMode={viewMode} handleViewModeChange={handleViewModeChange} />
        <Button
          onClick={handleOnAddProduct}
          variant="contained"
          style={{ backgroundColor: '#900A20', color: 'white' }}
          endIcon={<Add />}
        >
          Agregar producto
        </Button>
        <TextField
          sx={{ backgroundColor: '#FFF' }}
          label="Buscar producto"
          onChange={handleSearch}
          autoComplete="off"
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
          {viewMode === 'list' ? (
            <InventoryTable
              productsQuery={productsQuery}
              onEditClick={handleOnEditClick}
              onDeleteClick={handleOnDeleteClick}
            />
          ) : (
            <InventoryGrid
              productsQuery={productsQuery}
              onEditClick={handleOnEditClick}
              onDeleteClick={handleOnDeleteClick}
            />
          )}
          <Pagination
            isPlaceholderData={productsQuery.isPlaceholderData}
            prevPage={prevPage}
            onPrevClick={handleOnPrevClick}
            onNextClick={handleOnNextClick}
          />
        </>
      )}
      <InventoryModal
        open={openModal}
        mode={modalMode}
        categories={categoriesQuery}
        units={unitsQuery}
        product={productModel}
        onClose={handleOnCloseModal}
        onCreateAccept={createProductMutate}
        onEditAccept={editProductMutate}
        onDeleteAccept={deleteProductMutate}
      />
    </>
  );
};

export default Inventory;
