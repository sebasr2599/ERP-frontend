import { useCartStore } from '../../store/cart-store';
import NoItems from '../../layouts/NoItems/NoItems';
import StatusComponent from '../../components/StatusComponent/StatusComponent';
import { Button, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import OrderRow from './OrderRow';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createOrder } from '../../services/order.service';

const OrderCart = () => {
  const order = useCartStore((state) => state.order);
  const orderStatus = useCartStore((state) => state.order.status);
  const resetOrder = useCartStore((state) => state.reset);

  const handleOnOrderSubmit = () => {
    console.log(order);
    createOrderMutate(order);
  };
  // React Query Mutation
  const { mutate: createOrderMutate } = useMutation({
    // Set the status to pending
    mutationFn: (order: Order) => createOrder(order),

    onSuccess: () => {
      resetOrder();
      toast('Orden enviada correctamente');
    },
    onError: () => toast.error('Error al enviar orden'),
  });
  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex flex-col gap-2 p-4">
        <span className="text-4xl">Orden: {order.name}</span>
        <div className="flex flex-row gap-2 items-center">
          {/* TODO: Add here the Client */}
          <StatusComponent status={orderStatus} />
        </div>
        <Divider />
        {order.orderDetails.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Cantidad</TableCell>
                  <TableCell align="left">Unidad</TableCell>
                  <TableCell align="left">Precio</TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.orderDetails.map((item, index) => (
                  <OrderRow orderDetail={item} key={index} rowIndex={index} />
                ))}
              </TableBody>
            </Table>
            <span className="text-3xl font-bold text-gray-900 flex items-center gap-1">
              Total:
              <NumericFormat
                // value={totalHelper(props.values.quantity, props.values.equivalency, props.values.unitId)}
                value={order.total}
                prefix="$"
                thousandSeparator
                //   displayType="text"
                decimalScale={2}
                disabled
              />
            </span>
            <Button
              onClick={handleOnOrderSubmit}
              variant="contained"
              style={{ backgroundColor: '#900A20' }}
              className=" text-white"
              fullWidth
              disabled={order.orderDetails.length > 0 ? false : true}
            >
              Enviar Ticket de Orden
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#F6F6FB', color: 'GrayText' }}
              fullWidth
              disabled={order.orderDetails.length > 0 ? false : true}
              onClick={resetOrder}
            >
              Cancelar Orden
            </Button>
          </>
        ) : (
          <div className="h-full px-4 flex justify-center items-center">
            <NoItems text="No se ha agregado ningun producto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCart;
