import { Button, IconButton } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createClient, deleteClient, getClients, updateClient } from '../../services/client.service';
import ClientsModal from './ClientsModal';

type modes = 'Client' | 'Delete' | '';

const model: Client = {
  id: undefined,
  name: '',
};
const Clients = () => {
  // Hooks
  const queryClient = useQueryClient();
  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });
  const theme = useTheme(materialTheme);

  // Use states
  const [openModal, setOpenModal] = useState(false);
  const [clientModel, setClientModel] = useState<Client>(model);
  const [modalMode, setModalMode] = useState<modes>('');
  //
  // React query functions
  const clientQuery = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  // React Query Mutations
  const { mutate: createClientMutate } = useMutation({
    mutationFn: (client: Client) => createClient(client),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: () => toast.error('Error al crear una nuevo cliente'),
  });

  const { mutate: editClientMutate } = useMutation({
    mutationFn: (client: Client) => updateClient(client),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: () => toast.error('Error al editar cliente'),
  });

  const { mutate: deleteClientMutate } = useMutation({
    mutationFn: (client: Client) => deleteClient(client),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },

    onError: () => toast.error('Error al borrar cliente'),
  });

  // handlers and helper funcionts
  const data = {
    nodes: clientQuery?.data?.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }),
  };

  const columns: Column<Client>[] = [
    { label: 'Nombre', renderCell: (item) => item.name },
    {
      label: 'Acciones',
      renderCell: (item) => (
        <div className="flex flex-row gap 2">
          <IconButton onClick={() => handleOnEditClient(item)}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleOnDeleteClient(item)}>
            <DeleteOutline />
          </IconButton>
        </div>
      ),
      pinRight: true,
    },
  ];
  const handleOnOpenModal = () => setOpenModal(true);

  const handleOnCloseModal = () => {
    setOpenModal(false);
    setClientModel(model);
  };

  const handleOnAddClient = () => {
    setClientModel(model);
    setModalMode('Client');
    handleOnOpenModal();
  };

  const handleOnEditClient = (category: Client) => {
    setClientModel(category);
    setModalMode('Client');
    handleOnOpenModal();
  };

  const handleOnDeleteClient = (category: Client) => {
    setClientModel(category);
    setModalMode('Delete');
    handleOnOpenModal();
  };

  return (
    <>
      <InfoBar pageTitle="Clientes">
        <Button
          onClick={handleOnAddClient}
          variant="contained"
          fullWidth
          style={{ backgroundColor: '#900A20', color: 'white' }}
          endIcon={<Add />}
        >
          Agregar Cliente
        </Button>
      </InfoBar>
      <div className=" min-w-full flex flex-col gap-6 rounded-md drop-shadow-md justify-center w-full px-8 ">
        {clientQuery?.data && <CompactTable columns={columns} data={data} theme={theme} />}
      </div>
      <ClientsModal
        open={openModal}
        client={clientModel}
        mode={modalMode}
        onClose={handleOnCloseModal}
        onCreateAccept={createClientMutate}
        onEditAccept={editClientMutate}
        onDeleteAccept={deleteClientMutate}
      />
    </>
  );
};

export default Clients;
