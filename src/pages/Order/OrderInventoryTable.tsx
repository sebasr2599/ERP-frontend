import { EditOutlined } from '@mui/icons-material';
import { Button, IconButton, MenuItem, TextField } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import OrderInventoryTableRow from './OrderInventoryTableRow';
import * as TYPES from '@table-library/react-table-library/types';
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
      --data-table-library_grid-template-columns: repeat(2, minmax(0, 1fr)) 65% ;
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
      renderCell: (product) => <OrderInventoryTableRow product={product} onProductSubmit={onProductSubmit} />,
    },
    // {
    //   label: 'Cantidad',
    //   renderCell: (item) => (
    //     <TextField
    //       // onChange={async (e) => {
    //       //   props.handleChange(e);
    //       //   await props.setFieldValue(
    //       //     'total',
    //       //     totalHelper(+e.target.value, props.values.price, props.values.unitId),
    //       //   );
    //       // }}
    //       // value={props.values.quantity}
    //       required
    //       name="quantity"
    //       fullWidth
    //       type="number"
    //     />
    //   ),
    // },
    // {
    //   label: 'Unidad',
    //   renderCell: (item) => (
    //     <TextField
    //       required
    //       // onChange={(e) => props.handleChange(e)}
    //       select
    //       fullWidth
    //       variant="outlined"
    //       name="unitId"
    //       // value={props.values.unitId}
    //       disabled={item.equivalentUnits?.length < 1}
    //     >
    //       <MenuItem
    //         value={item.unit?.id}
    //         //   onClick={() => {
    //         //     props.setFieldValue('price', item.priceUnit);
    //         //     props.setFieldValue('total', totalHelper(props.values.quantity, item.priceUnit, item.unitId));
    //         //     props.setFieldValue('unitName', item.unit?.name);
    //         //   }}
    //       >
    //         {item.unit?.name}
    //       </MenuItem>
    //       {item.equivalentUnits?.map((equivalentUnit) => (
    //         <MenuItem
    //           key={equivalentUnit.unit?.id}
    //           value={equivalentUnit.unit?.id}
    //           // onClick={() => {
    //           //   props.setFieldValue('price', equivalentUnit.equivalent);
    //           //   props.setFieldValue(
    //           //     'total',
    //           //     totalHelper(props.values.quantity, equivalentUnit.equivalent, equivalentUnit.unitId),
    //           //   );
    //           //   props.setFieldValue('unitName', equivalentUnit.unit.name);
    //           // }}
    //         >
    //           {equivalentUnit.unit?.name}
    //         </MenuItem>
    //       ))}
    //     </TextField>
    //   ),
    // },
    // { label: 'Total', renderCell: (_) => 0 },
    // {
    //   label: 'Acciones',
    //   renderCell: (item) => (
    //     <Button variant="contained" color="success" onClick={() => console.log(item)}>
    //       Agregar
    //     </Button>
    //   ),
    // },
  ];
  return (
    <div className=" min-w-full flex flex-col gap-6 rounded-md drop-shadow-md justify-center w-full px-8 ">
      {productsQuery?.data && <CompactTable columns={columns} data={data} theme={theme} layout={{ custom: true }} />}
    </div>
  );
};

export default OrderInventoryTable;
