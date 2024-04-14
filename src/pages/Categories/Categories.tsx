import { Button, TextField } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add } from '@mui/icons-material';

const Categories = () => {
  // Hooks
  //
  // Use states

  // React query functions

  // React Query Mutations

  // handlers and helper funcionts

  return (
    <>
      <InfoBar pageTitle="Categorias">
        <Button
          onClick={() => console.log('button clicked')}
          variant="contained"
          fullWidth
          style={{ backgroundColor: '#900A20', color: 'white' }}
          endIcon={<Add />}
        >
          Agregar Categoria
        </Button>
        <TextField sx={{ backgroundColor: '#FFF' }} fullWidth label="Buscar Categoria" />
        <TextField
          sx={{ backgroundColor: '#FFF' }}
          fullWidth
          label="Buscar producto"
          // onChange={handleSearch}
        />
      </InfoBar>
      <div>Aqui va las categorias</div>
    </>
  );
};

export default Categories;
