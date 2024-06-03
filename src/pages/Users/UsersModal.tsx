import { Button, DialogActions, DialogContent, MenuItem, Select, TextField } from '@mui/material';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { useFormik } from 'formik';

interface ImageModalProps {
  open: boolean;
  modalMode: modes;
  id: number;
  user: UserTable;
  userUserName?: string;
  onClose: () => void;
  onDeleteAccept: (id: number) => void;
  onChangePasswordAccept: (id: number, password: string) => void;
  onAccept: (values: User) => void;
  onAcceptEdit: (values: UserTable) => void;
}
type modes = 'Add' | 'Edit' | 'Delete' | 'Update' | '';
const UsersModal: React.FC<ImageModalProps> = ({
  open,
  modalMode,
  onClose,
  onDeleteAccept,
  onAccept,
  id,
  user,
  userUserName,
  onAcceptEdit,
  onChangePasswordAccept,
}) => {
  const formikContext = useFormik({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      rol: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      onAccept(values);
      resetForm();
    },
  });
  const formikEdit = useFormik({
    initialValues: user,
    onSubmit: (values, { resetForm }) => {
      onAcceptEdit(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  const formikPassword = useFormik({
    initialValues: {
      id: id | 0,
      username: userUserName || '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      onChangePasswordAccept(id, values.password);
      resetForm();
    },
    enableReinitialize: true,
  });

  let modalContent: React.ReactNode;

  switch (modalMode) {
    case 'Add':
      modalContent = (
        <>
          <ModalTemplate open={open} title="Agregar usuario" handleOnClose={onClose}>
            <form onSubmit={formikContext.handleSubmit}>
              <DialogContent>
                <div className="flex flex-col gap-4">
                  <TextField
                    onChange={formikContext.handleChange}
                    className="w-full"
                    required
                    label="Nombre del usuario"
                    name="username"
                    value={formikContext.values.username}
                  />
                  <TextField
                    onChange={formikContext.handleChange}
                    value={formikContext.values.first_name}
                    className="w-full"
                    required
                    label="Nombre"
                    name="first_name"
                  />
                  <TextField
                    onChange={formikContext.handleChange}
                    value={formikContext.values.last_name}
                    className="w-full"
                    required
                    label="Apellido"
                    name="last_name"
                  />
                  <Select
                    onChange={formikContext.handleChange}
                    value={formikContext.values.rol ?? 'usuario'}
                    label="Role"
                    name="rol"
                    required
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="usuario">Usuario</MenuItem>
                  </Select>
                  <TextField
                    onChange={formikContext.handleChange}
                    value={formikContext.values.password}
                    label="Password"
                    type="password"
                    name="password"
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Aceptar</Button>
              </DialogActions>
            </form>
          </ModalTemplate>
        </>
      );
      break;
    case 'Edit':
      modalContent = (
        <>
          <ModalTemplate open={open} title="Editar Usiario" handleOnClose={onClose}>
            <form onSubmit={formikEdit.handleSubmit}>
              <DialogContent>
                <div className="flex flex-col gap-4">
                  <TextField
                    onChange={formikEdit.handleChange}
                    className="w-full"
                    required
                    label="Nombre del usuario"
                    name="username"
                    value={formikEdit.values.username}
                  />
                  <TextField
                    onChange={formikEdit.handleChange}
                    value={formikEdit.values.first_name}
                    className="w-full"
                    required
                    label="Nombre"
                    name="first_name"
                  />
                  <TextField
                    onChange={formikEdit.handleChange}
                    value={formikEdit.values.last_name}
                    className="w-full"
                    required
                    label="Apellido"
                    name="last_name"
                  />
                  <TextField
                    select
                    label="Rol"
                    fullWidth
                    variant="outlined"
                    value={formikEdit.values.rol}
                    onChange={formikEdit.handleChange('rol')}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </TextField>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Aceptar</Button>
              </DialogActions>
            </form>
          </ModalTemplate>
        </>
      );
      break;
    case 'Delete':
      if (id) {
        modalContent = (
          <>
            <ModalTemplate open={open} title="Borrar Usuario" handleOnClose={onClose}>
              <DialogContent>Seguro que quieres Borrar el usuario?</DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={() => onDeleteAccept(id)}>Aceptar</Button>
              </DialogActions>
            </ModalTemplate>
          </>
        );
      }
      break;
    case 'Update':
      modalContent = (
        <ModalTemplate open={open} title="Cambiar Contraseña" handleOnClose={onClose}>
          <form onSubmit={formikPassword.handleSubmit} className="flex flex-col gap-4 p-4">
            <TextField
              onChange={formikPassword.handleChange}
              disabled
              className="w-full"
              required
              label="Nueva Contraseña"
              name="password"
              value={formikPassword.values.username}
            />
            <TextField
              onChange={formikPassword.handleChange}
              className="w-full"
              required
              label="Nueva Contraseña"
              name="password"
              value={formikPassword.values.password}
            />
            <DialogActions>
              <Button onClick={onClose}>Cancelar</Button>
              <Button type="submit">Aceptar</Button>
            </DialogActions>
          </form>
        </ModalTemplate>
      );
      break;
    default:
      modalContent = null;
  }
  return <>{modalContent}</>;
};

export default UsersModal;
