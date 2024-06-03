import { UseQueryResult } from '@tanstack/react-query';
import ProductCard from './ProductCard';

export interface OrderInventoryGridProps {
  productsQuery: UseQueryResult<Product[], Error>;
  onProductSubmit: (orderDetail: OrderDetail) => void;
}
const OrderInventoryGrid: React.FC<OrderInventoryGridProps> = ({ productsQuery, onProductSubmit }) => {
  // Hooks

  // handlers and helper funcionts
  return (
    <div className="w-full grid prodGridContainer gap-4 justify-center items-center p-4">
      {productsQuery.data?.map((product) => (
        <ProductCard onProductSubmit={onProductSubmit} product={product} key={product.id} />
      ))}
    </div>
  );
};

export default OrderInventoryGrid;
