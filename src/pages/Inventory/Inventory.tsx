import { Button, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import InventoryModal from './InventoryModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '../../services/category.service';
import { getUnits } from '../../services/unit.service';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../services/product.service';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import NoItems from '../../layouts/NoItems/NoItems';

const model: Product = {
  id: undefined,
  name: '',
  description: '',
  image: '',
  priceUnit: 0,
  priceWholesale: 0,
  unitId: 1,
  categoryId: 1,
  equivalencies: [],
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
  const { mutate: createProductMutate } = useMutation({
    mutationFn: (product: Product) => createProduct(product),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => toast.error('Error al crear un nuevo usuario'),
  });

  const { mutate: editProductMutate } = useMutation({
    mutationFn: (product: Product) => updateProduct(product),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => toast.error('Error al crear un nuevo usuario'),
  });

  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: (product: Product) => deleteProduct(product),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError: () => toast.error('Error al crear un nuevo usuario'),
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
  // TODO: Solve filtering with react query
  return (
    <>
      <InfoBar pageTitle="Inventario">
        <Button
          onClick={handleOnAddProduct}
          variant="contained"
          fullWidth
          style={{ backgroundColor: '#900A20', color: 'white' }}
          endIcon={<Add />}
        >
          Agregar producto
        </Button>
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
            <ProductCard
              product={product}
              key={product.id}
              onEditClick={handleOnEditClick}
              onDeleteClick={handleOnDeleteClick}
            />
          ))}
        </div>
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
