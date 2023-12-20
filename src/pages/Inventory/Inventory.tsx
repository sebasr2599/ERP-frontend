import { Button, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import InventoryModal from './InventoryModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '../../services/category.service';
import { getUnits } from '../../services/unit.service';
import { createProduct, getProducts } from '../../services/product.service';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';

const model: Product = {
  id: undefined,
  name: '',
  description: '',
  image: undefined,
  priceUnit: undefined,
  priceWholesale: undefined,
  unitId: 1,
  categoryId: 1,
};

const Inventory = () => {
  // Hooks
  const queryClient = useQueryClient();
  // Use states
  const [openModal, setOpenModal] = useState(false);
  const [productModel, setProductModel] = useState<Product>(model);
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

  // handlers and helper funcionts
  const handleOnOpenModal = () => setOpenModal(true);

  const handleOnCloseModal = () => {
    setOpenModal(false);
  };

  const handleOnAddProduct = () => {
    setProductModel(model);
    handleOnOpenModal();
  };
  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

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
      {/* TODO: do a single card component then the whole grid */}
      <div className="flex flex-auto gap-4 justify-center items-center">
        {productsQuery.data?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <InventoryModal
        open={openModal}
        categories={categoriesQuery}
        units={unitsQuery}
        product={productModel}
        onClose={handleOnCloseModal}
        onCreateAccept={createProductMutate}
      />
    </>
  );
};

export default Inventory;
