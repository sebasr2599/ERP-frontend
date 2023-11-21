import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changePassword, createUser, deleteUser, getUsers, updateUser } from '../../services/user.service';
import { toast } from 'react-toastify';
import { Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { Add, DeleteOutline, EditOutlined, PasswordOutlined } from '@mui/icons-material';
import UsersModal from './UsersModal';

const userModel: UserTable = {
  id: 0,
  username: '',
  first_name: '',
  last_name: '',
  rol: 'Admin',
};
type modes = 'Add' | 'Edit' | 'Delete' | 'Update' | '';
const Users = () => {
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<modes>('');
  const [userId, setUserId] = useState<number>(0);
  const queryClient = useQueryClient();
  const [userModelState, setUserModelState] = useState(userModel);
  const [userUsername, setUserUsername] = useState<string | undefined>();

  const users = useQuery({ queryKey: ['users'], queryFn: getUsers });
  const { mutate: createUserMutate } = useMutation({
    mutationFn: (user: User) => createUser(user),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Error al crear un nuevo usuario'),
  });
  const { mutate: editUserMutate } = useMutation({
    mutationFn: (user: UserTable) => updateUser(user.id, user),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Error al crear un nuevo usuario'),
  });

  const { mutate: deleteUserMutete } = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Error al borrar el usuario usuario'),
  });

  const { mutate: changePasswordMutate } = useMutation({
    mutationFn: (user: { id: number; password: string }) => changePassword(user.id, user.password),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Error al cambiar la contraseña'),
  });

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
  const tableColumns: Column<UserTable>[] = [
    { label: 'Nombre del Usuario', renderCell: (item) => item.username },
    { label: 'Nombre', renderCell: (item) => item.first_name },
    { label: 'Apellido', renderCell: (item) => item.last_name },
    { label: 'Rol', renderCell: (item) => item.rol },
    {
      label: 'Acciones',
      renderCell: (item) => (
        <div className="flex flex-row gap 2">
          <IconButton onClick={() => handleOnChangePassword(item)}>
            <PasswordOutlined />
          </IconButton>
          <IconButton onClick={() => handleOnEdit(item)}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleOnDelete(item.id)}>
            <DeleteOutline />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleOnOpenModal = () => setOpenModal(true);

  const handleOnCloseModal = () => {
    setOpenModal(false);
    setMode('');
  };

  const handleOnAddUser = () => {
    setMode('Add');
    handleOnOpenModal();
  };

  const handleOnChangePassword = (user: UserTable) => {
    setUserUsername(user.username);
    setUserId(user.id);
    setMode('Update');
    handleOnOpenModal();
  };

  const handleOnDelete = (id: number) => {
    setMode('Delete');
    setUserId(id);
    handleOnOpenModal();
  };

  const handleOnEdit = (user: UserTable) => {
    setMode('Edit');
    setUserModelState(user);
    handleOnOpenModal();
  };

  const handleOnDeleteConfirm = (id: number) => {
    deleteUserMutete(id);
  };

  const handleOnEditAccept = (user: UserTable) => {
    editUserMutate(user);
  };

  const handleOnChangePasswordAccept = (id: number, password: string) => {
    changePasswordMutate({ id, password });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  let data = {};
  if (users?.data) {
    data = { nodes: users?.data.filter((item) => item.username.toLowerCase().includes(search.toLowerCase())) };
  }
  const onSubmit = (values: User) => {
    createUserMutate(values);
  };

  // TODO: Have a way to show loading table
  // TODO: Add delete, edit and change password modal functions
  // TODO: Sort table alphabetical
  return (
    <>
      <div className="p-8 flex justify-between mx-auto ">
        <h1 className="font-bold text-3xl">Usuarios</h1>
        <div className="flex flex-row w-1/3 gap-4">
          <Button
            onClick={handleOnAddUser}
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
        modalMode={mode}
        onAccept={onSubmit}
        onAcceptEdit={handleOnEditAccept}
        onClose={handleOnCloseModal}
        onDeleteAccept={handleOnDeleteConfirm}
        id={userId}
        user={userModelState}
        userUserName={userUsername}
        onChangePasswordAccept={handleOnChangePasswordAccept}
      />
    </>
  );
};

export default Users;
