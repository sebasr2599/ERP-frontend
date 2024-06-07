import { Button, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add, ViewList, ViewModule } from '@mui/icons-material';
import { useState } from 'react';
import InventoryModal from './InventoryModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '../../services/category.service';
import { getUnits } from '../../services/unit.service';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../services/product.service';
import { toast } from 'react-toastify';
import NoItems from '../../layouts/NoItems/NoItems';
import InventoryGrid from './InventoryGrid';
import InventoryTable from './InventoryTable';

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

  // React query functions
  const productsQuery = useQuery({
    queryKey: ['products', search, selectedCategory],
    queryFn: () => getProducts(search, selectedCategory),
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

  return (
    <>
      <InfoBar pageTitle="Inventario">
        <div className="overflow-x-auto">
          <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleOnCategorySelect} className="flex">
            {categoriesQuery.data?.map((category) => (
              <ToggleButton key={category.id} value={category.id || 0} className="flex-shrink-0">
                {category.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        {/* Switch for List <-> Grid */}
        <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange}>
          <ToggleButton value="list" aria-label="list">
            <ViewList />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid">
            <ViewModule />
          </ToggleButton>
        </ToggleButtonGroup>
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
      {productsQuery.data?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full">
          <NoItems text="No se encontro ningun producto" />
        </div>
      ) : viewMode === 'list' ? (
        <InventoryTable
          productsQuery={productsQuery}
          onEditClick={handleOnEditClick}
          onDeleteClick={handleOnDeleteClick}
        />
      ) : (
        // send this to a component for grid view
        <InventoryGrid
          productsQuery={productsQuery}
          onEditClick={handleOnEditClick}
          onDeleteClick={handleOnDeleteClick}
        />
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
