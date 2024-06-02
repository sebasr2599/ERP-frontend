import { UseQueryResult } from '@tanstack/react-query';
import ProductCard from './ProductCard';

export interface OrderInventoryGridProps {
  productsQuery: UseQueryResult<Product[], Error>;
  onEditClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}
const InventoryGrid: React.FC<OrderInventoryGridProps> = ({ productsQuery, onEditClick, onDeleteClick }) => {
  // Hooks

  // handlers and helper funcionts
  return (
    <div className="w-full grid prodGridContainer gap-4 justify-center items-center p-4">
      {productsQuery.data?.map((product) => (
        <ProductCard product={product} key={product.id} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  );
};

export default InventoryGrid;
