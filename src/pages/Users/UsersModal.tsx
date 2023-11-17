import { Button, DialogActions, DialogContent, MenuItem, Select, TextField } from '@mui/material';
import ModalTemplate from '../../components/ModalTemplate/ModalTemplate';
import { useFormik } from 'formik';

interface ImageModalProps {
  open: boolean;
  mode: string;
  onClose: () => void;
  onDeleteAccept: (id: number | null | undefined) => void;
  onAccept: (values: User) => void;
}

const UsersModal: React.FC<ImageModalProps> = ({ open, mode, onClose, onDeleteAccept, onAccept }) => {
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
  return (
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
              label="Nombre"
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
  );
};

export default UsersModal;
