import { TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import { useCartStore } from '../../store/cart-store';
export interface OrderRowProps {
  orderDetail: OrderDetail;
  rowIndex: number;
}
const OrderRow: FC<OrderRowProps> = ({ orderDetail, rowIndex }) => {
  const deleteOrderDetail = useCartStore((state) => state.removeOrderDetail);
  return (
    <TableRow className="flex flex-row gap-2 items-center">
      <TableCell align="left">{orderDetail.productName}</TableCell>
      <TableCell align="left">{orderDetail.quantity}</TableCell>
      <TableCell align="left">{orderDetail.unitName}</TableCell>
      <TableCell align="left">{orderDetail.price.toFixed(2)}</TableCell>
      <TableCell align="left">{orderDetail.total?.toFixed(2)}</TableCell>
      <TableCell align="left">
        <button className="flex flex-row gap-1 items-center" onClick={() => deleteOrderDetail(rowIndex)}>
          <span>Borrar</span>
          <DeleteIcon className="text-slate-600" />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
