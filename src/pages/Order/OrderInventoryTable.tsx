import { EditOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';

export interface OrderInventoryTableProps {
  productsQuery: UseQueryResult<Product[], Error>;
}
const OrderInventoryTable: React.FC<OrderInventoryTableProps> = ({ productsQuery }) => {
  // Hooks
  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });
  const theme = useTheme(materialTheme);

  // handlers and helper funcionts
  const data = {
    nodes: productsQuery?.data,
  };
  const columns: Column<Product>[] = [
    { label: 'Nombre', renderCell: (item) => item.name },
    { label: 'Categoría', renderCell: (item) => item.category?.name },
    {
      label: 'Acciones',
      renderCell: (item) => (
        <div className="flex flex-row gap 2">
          <IconButton onClick={() => console.log(item)}>
            <EditOutlined />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <div className=" min-w-full flex flex-col gap-6 rounded-md drop-shadow-md justify-center w-full px-8 ">
      {productsQuery?.data && <CompactTable columns={columns} data={data} theme={theme} />}
    </div>
  );
};

export default OrderInventoryTable;
