import { Button, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import InventoryModal from './InventoryModal';

const model: Product = {
  id: undefined,
  name: '',
  description: '',
  image: undefined,
  priceUnit: undefined,
  priceWholesale: undefined,
  unitId: undefined,
  categoryId: undefined,
};

const Inventory = () => {
  // Use states
  const [openModal, setOpenModal] = useState(false);
  const [productModel, setProductModel] = useState<Product>(model);
  // React query functions

  // handlers and helper funcionts
  const handleOnOpenModal = () => setOpenModal(true);

  const handleOnCloseModal = () => {
    setOpenModal(false);
  };

  const handleOnAddProduct = () => {
    setProductModel(model);
    handleOnOpenModal();
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
        <TextField
          sx={{ backgroundColor: '#FFF' }}
          fullWidth
          label="Buscar Categoria"
          // onChange={handleSearch}
        />
        <TextField
          sx={{ backgroundColor: '#FFF' }}
          fullWidth
          label="Buscar producto"
          // onChange={handleSearch}
        />
      </InfoBar>
      <InventoryModal open={openModal} onClose={handleOnCloseModal} product={productModel} />
    </>
  );
};

export default Inventory;
