import { UseQueryResult } from '@tanstack/react-query';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import OrderInventoryTableRow from './OrderInventoryTableRow';
export interface OrderInventoryTableProps {
  productsQuery: UseQueryResult<Product[], Error>;
  onProductSubmit: (orderDetail: OrderDetail) => void;
}
const OrderInventoryTable: React.FC<OrderInventoryTableProps> = ({ productsQuery, onProductSubmit }) => {
  // Hooks
  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    verticalSpacing: 10,
    striped: true,
    highlightOnHover: true,
  });
  const customTheme = useTheme({
    Table: `
      --data-table-library_grid-template-columns: repeat(3, minmax(150px, 1fr)) minmax(500px,2fr) ;
    `,
  });
  const theme = useTheme([materialTheme, customTheme]);

  // handlers and helper funcionts
  const data = {
    nodes: productsQuery?.data,
  };
  const columns: Column<Product>[] = [
    { label: 'Clave', renderCell: (item) => item.productKey ?? 'N/A' },
    { label: 'Nombre', renderCell: (item) => item.name },
    { label: 'Categoría', renderCell: (item) => item.category?.name },
    {
      label: 'Acciones',
      renderCell: (product) => <OrderInventoryTableRow product={product} onProductSubmit={onProductSubmit} />,
    },
  ];
  return (
    <div className=" min-w-full flex flex-col gap-6 rounded-md drop-shadow-md justify-center w-full px-2 md:px-8 pt-2 md:py-0 ">
      {productsQuery?.data && <CompactTable columns={columns} data={data} theme={theme} layout={{ custom: true }} />}
    </div>
  );
};

export default OrderInventoryTable;
