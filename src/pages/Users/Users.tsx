import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import 'react-data-grid/lib/styles.css';
import { createUser, getUsers } from '../../services/user.service';
import { toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { Add } from '@mui/icons-material';
import UsersModal from './UsersModal';

interface column {
  label: string;
  renderCell: (item: User) => string;
}
const Users = () => {
  const users = useQuery({ queryKey: ['users'], queryFn: getUsers });
  const { mutate } = useMutation({
    mutationFn: (user: User) => createUser(user),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Error al crear un nuevo usuario'),
  });
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState('');
  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: true,
    highlightOnHover: true,
  });
  const theme = useTheme(materialTheme);

  if (users.isPending) {
    console.log('users is querying');
    return <h1>Loading..</h1>;
  }
  if (users.isError) {
    console.log('Something went wrong :(');
    toast.error('Error al obtener al usuaro');
  }
  const handleOnOpenModal = () => setOpenModal(true);
  const handleOnCloseModal = () => {
    setOpenModal(false);
    setMode('');
  };
  const tableColumns: column[] = [
    { label: 'Nombre del Usuario', renderCell: (item) => item.username },
    { label: 'Nombre', renderCell: (item) => item.first_name },
    { label: 'Apellido', renderCell: (item) => item.last_name },
    { label: 'Rol', renderCell: (item) => item.rol },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  let data = {};
  if (users?.data) {
    data = { nodes: users?.data.filter((item) => item.username.toLowerCase().includes(search.toLowerCase())) };
  }
  const onSubmit = (values: User) => {
    console.log('form submitted', values);
    mutate(values);
  };
  // TODO: Have a way to show loading table
  return (
    <>
      <div className="p-8 flex justify-between mx-auto ">
        <h1 className="font-bold text-3xl">Usuarios</h1>
        <div className="flex flex-row w-1/3 gap-4">
          <Button
            onClick={handleOnOpenModal}
            variant="contained"
            style={{ backgroundColor: '#900A20', color: 'white' }}
            endIcon={<Add />}
          >
            Agregar usuario
          </Button>
          <TextField
            sx={{ backgroundColor: '#FFF' }}
            fullWidth
            label="Buscar Usuario"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className=" min-w-full rounded-md drop-shadow-md justify-center w-full p-8 ">
        {users?.data && <CompactTable columns={tableColumns} data={data} theme={theme} className="max-w-full " />}
      </div>
      <UsersModal
        open={openModal}
        mode={mode}
        onAccept={onSubmit}
        onClose={handleOnCloseModal}
        onDeleteAccept={handleOnCloseModal}
      />
    </>
  );
};

export default Users;
