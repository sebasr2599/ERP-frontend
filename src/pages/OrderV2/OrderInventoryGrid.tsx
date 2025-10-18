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
    <div className="prodGridContainer grid w-full items-stretch justify-center gap-4 p-4">
      {productsQuery.data?.map((product) => (
        <div className="flex h-full" key={product.id}>
          <ProductCard onProductSubmit={onProductSubmit} product={product} />
        </div>
      ))}
    </div>
  );
};

export default OrderInventoryGrid;
