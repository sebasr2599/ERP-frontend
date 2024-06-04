import { Button, IconButton } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { DeleteOutline, Send, Sync, Visibility } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { toast } from 'react-toastify';
import { deleteOrder, getOrder, getOrders, updateOrderStatus } from '../../services/order.service';
import { NumericFormat } from 'react-number-format';
import { useState } from 'react';
import SalesModal from './SalesModal';
import { formatDate } from '../../utils/orderUtil';
import StatusComponent from '../../components/StatusComponent/StatusComponent';

type modes = 'Order' | 'Send' | 'Delete' | '';
const orderModel: Order = {
  id: 0,
  date: new Date(),
  status: 'STARTED',
  orderDetails: [],
  total: 0,
};

const Sales = () => {
  // Hooks
  const queryClient = useQueryClient();

  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    verticalSpacing: 10,
    striped: true,
    highlightOnHover: true,
  });

  const theme = useTheme(materialTheme);

  // Use states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setmodalMode] = useState<modes>('');
  const [currentOrder, setCurrentOrder] = useState<Order>(orderModel);

  // React query functions
  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    refetchInterval: 15000,
  });

  const ReadOrderQuery = useQuery({
    queryKey: ['order', currentOrder],
    queryFn: () => getOrder(!currentOrder.id ? 0 : currentOrder.id),
    enabled: false,
  });
  // React Query Mutations
  const { mutate: editOrderStatusMutate } = useMutation({
    mutationFn: (order: Order) => updateOrderStatus(order),
    onSuccess: () => {
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => toast.error('Error al enviar orden'),
  });

  const { mutate: deletOrderMutate } = useMutation({
    mutationFn: (id: number) => deleteOrder(id),
    onSuccess: () => {
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => toast.error('Error al enviar orden'),
  });

  // handlers and helper funcionts

  const columns: Column<Order>[] = [
    { label: 'Cliente', renderCell: (item) => item.Client?.name },
    { label: 'Creador', renderCell: (item) => `${item.user?.first_name} ${item.user?.last_name}` },
    { label: 'Estatus', renderCell: (item) => <StatusComponent status={item.status} /> },
    // @ts-expect-error Date is not undefined, but has to be ? for other components
    { label: 'Fecha', renderCell: (item) => formatDate(item.date) },
    {
      label: 'Total',
      renderCell: (item) => (
        <NumericFormat value={item?.total.toFixed(2)} prefix="$" thousandSeparator displayType="text" disabled />
      ),
    },
    {
      label: 'Acciones',
      renderCell: (item) => (
        <div className="flex flex-row gap 2">
          <IconButton onClick={() => onViewSelect(item)}>
            <Visibility />
          </IconButton>
          {(item.status === 'NOT STARTED' || item.status === 'STARTED') && (
            <>
              <IconButton onClick={() => onSendSelect(item)}>
                <Send />
              </IconButton>
              <IconButton onClick={() => onDeleteSelect(item)}>
                <DeleteOutline />
              </IconButton>
            </>
          )}
        </div>
      ),
    },
  ];
  const data = {
    nodes: ordersQuery?.data,
  };

  const handleOnClickRefetch = () => {
    ordersQuery.refetch();
  };

  const onViewSelect = (order: Order) => {
    setCurrentOrder(order);
    // ReadOrderQuery.refetch();
    setmodalMode('Order');
    handleOpenModal();
  };

  const onSendSelect = (order: Order) => {
    setCurrentOrder(order);
    setmodalMode('Send');
    handleOpenModal();
  };

  const onDeleteSelect = (order: Order) => {
    setCurrentOrder(order);
    setmodalMode('Delete');
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentOrder(orderModel);
    setModalOpen(false);
  };

  return (
    <>
      <InfoBar pageTitle="Ventas">
        <Button
          onClick={handleOnClickRefetch}
          variant="contained"
          style={{ backgroundColor: '#66301E', color: 'white' }}
          startIcon={<Sync />}
        >
          Sincronizar
        </Button>
      </InfoBar>
      <div className=" min-w-full flex flex-col gap-6 rounded-md drop-shadow-md justify-center w-full px-8 ">
        {ordersQuery?.data && <CompactTable columns={columns} data={data} theme={theme} />}
      </div>
      <SalesModal
        mode={modalMode}
        open={modalOpen}
        order={currentOrder}
        onClose={handleCloseModal}
        onSendAccept={editOrderStatusMutate}
        onDeleteAccept={deletOrderMutate}
        orderQuery={ReadOrderQuery}
      />
    </>
  );
};

export default Sales;
