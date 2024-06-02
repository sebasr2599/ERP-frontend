import { UseQueryResult } from '@tanstack/react-query';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import InventoryTableRow from './InventoryTableRow';

export interface InventoryTableProps {
  productsQuery: UseQueryResult<Product[], Error>;
  onEditClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}
const InventoryTable: React.FC<InventoryTableProps> = ({ productsQuery, onEditClick, onDeleteClick }) => {
  // Hooks
  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    verticalSpacing: 10,
    striped: true,
    highlightOnHover: true,
  });
  const customTheme = useTheme({
    Table: `
      --data-table-library_grid-template-columns: repeat(2, minmax(0, 1fr)) 55% ;
    `,
  });
  const theme = useTheme([materialTheme, customTheme]);

  // handlers and helper funcionts
  const data = {
    nodes: productsQuery?.data,
  };
  const columns: Column<Product>[] = [
    { label: 'Nombre', renderCell: (item) => item.name },
    { label: 'Categoría', renderCell: (item) => item.category?.name },
    {
      label: 'Acciones',
      renderCell: (product) => (
        <InventoryTableRow product={product} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
      ),
    },
  ];
  return (
    <div className=" min-w-full flex flex-col gap-6 rounded-md drop-shadow-md justify-center w-full px-8 ">
      {productsQuery?.data && <CompactTable columns={columns} data={data} theme={theme} layout={{ custom: true }} />}
    </div>
  );
};

export default InventoryTable;
