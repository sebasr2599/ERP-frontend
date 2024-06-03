import { TableCell, TableRow } from '@mui/material';
import { FC } from 'react';
export interface OrderRowProps {
  orderDetail: OrderDetail;
}
const OrderRow: FC<OrderRowProps> = ({ orderDetail }) => {
  return (
    <TableRow className="flex flex-row gap-2 items-center">
      <TableCell align="left">{orderDetail.product?.name}</TableCell>
      <TableCell align="left">{orderDetail.quantity}</TableCell>
      <TableCell align="left">{orderDetail.unit?.name}</TableCell>
      <TableCell align="left">{orderDetail.price.toFixed(2)}</TableCell>
      <TableCell align="left">{(orderDetail.quantity * orderDetail.price).toFixed(2)}</TableCell>
    </TableRow>
  );
};

export default OrderRow;
