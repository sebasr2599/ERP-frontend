import { FC } from 'react';
import { Button, IconButton } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export interface InventoryTableRow {
  product: Product;
  onEditClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}
const InventoryTableRow: FC<InventoryTableRow> = ({ product, onEditClick, onDeleteClick }) => {
  const navigateTo = useNavigate();
  const handleProductClick = () => {
    navigateTo(`/inventory/${product.id}`);
  };
  return (
    <div className="flex flex-row gap 2 w-full">
      <IconButton onClick={() => onEditClick(product)}>
        <EditOutlined />
      </IconButton>
      <IconButton onClick={() => onDeleteClick(product)}>
        <DeleteOutline />
      </IconButton>
      <Button
        onClick={handleProductClick}
        variant="contained"
        style={{ backgroundColor: '#900A20' }}
        className=" text-white"
      >
        Hacer inventario
      </Button>
    </div>
  );
};

export default InventoryTableRow;
