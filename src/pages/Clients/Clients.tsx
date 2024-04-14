import { Button, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add } from '@mui/icons-material';

const Clients = () => {
  // Hooks
  //
  // Use states

  // React query functions

  // React Query Mutations

  // handlers and helper funcionts

  return (
    <>
      <InfoBar pageTitle="Clientes">
        <Button
          onClick={() => console.log('button clicked')}
          variant="contained"
          fullWidth
          style={{ backgroundColor: '#900A20', color: 'white' }}
          endIcon={<Add />}
        >
          Agregar producto
        </Button>
        <TextField sx={{ backgroundColor: '#FFF' }} fullWidth label="Buscar cliente" />
        <TextField
          sx={{ backgroundColor: '#FFF' }}
          fullWidth
          label="Buscar producto"
          // onChange={handleSearch}
        />
      </InfoBar>
      <div>Aqui va los clientes</div>
    </>
  );
};

export default Clients;
