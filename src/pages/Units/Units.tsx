import { Button, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add } from '@mui/icons-material';

const Units = () => {
  // Hooks
  //
  // Use states

  // React query functions

  // React Query Mutations

  // handlers and helper funcionts

  return (
    <>
      <InfoBar pageTitle="Unidades">
        <Button
          onClick={() => console.log('button clicked')}
          variant="contained"
          fullWidth
          style={{ backgroundColor: '#900A20', color: 'white' }}
          endIcon={<Add />}
        >
          Agregar unidad
        </Button>
        <TextField sx={{ backgroundColor: '#FFF' }} fullWidth label="Buscar unidad" />
        <TextField
          sx={{ backgroundColor: '#FFF' }}
          fullWidth
          label="Buscar producto"
          // onChange={handleSearch}
        />
      </InfoBar>
      <div>Aqui va las unidades</div>
    </>
  );
};

export default Units;
