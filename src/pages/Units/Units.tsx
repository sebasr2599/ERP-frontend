import { Button, IconButton } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUnit, deleteUnit, getUnits, updateUnit } from '../../services/unit.service';
import UnitsModal from './UnitsModal';

type modes = 'Unit' | 'Delete' | '';

const model: Unit = {
  id: undefined,
  name: '',
};
const Units = () => {
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
  const [unitModel, setUnitModel] = useState<Unit>(model);
  const [modalMode, setModalMode] = useState<modes>('');
  //
  // React query functions
  const unitsQuery = useQuery({
    queryKey: ['units'],
    queryFn: getUnits,
  });

  // React Query Mutations
  const { mutate: createUnitMutate } = useMutation({
    mutationFn: (unit: Unit) => createUnit(unit),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
    onError: () => toast.error('Error al crear una nueva unidad'),
  });

  const { mutate: editUnitMutate } = useMutation({
    mutationFn: (unit: Unit) => updateUnit(unit),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
    onError: () => toast.error('Error al editar unidad'),
  });

  const { mutate: deleteUnitMutate } = useMutation({
    mutationFn: (unit: Unit) => deleteUnit(unit),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },

    onError: () => toast.error('Error al borrar unidad'),
  });

  // handlers and helper funcionts
  const data = {
    nodes: unitsQuery?.data?.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }),
  };

  const columns: Column<Unit>[] = [
    { label: 'Nombre', renderCell: (item) => item.name },
    {
      label: 'Acciones',
      renderCell: (item) => (
        <div className="flex flex-row gap 2">
          <IconButton onClick={() => handleOnEditUnit(item)}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleOnDeleteUnit(item)}>
            <DeleteOutline />
          </IconButton>
        </div>
      ),
    },
  ];
  const handleOnOpenModal = () => setOpenModal(true);

  const handleOnCloseModal = () => {
    setOpenModal(false);
    setUnitModel(model);
  };

  const handleOnAddUnit = () => {
    setUnitModel(model);
    setModalMode('Unit');
    handleOnOpenModal();
  };

  const handleOnEditUnit = (category: Unit) => {
    setUnitModel(category);
    setModalMode('Unit');
    handleOnOpenModal();
  };

  const handleOnDeleteUnit = (category: Unit) => {
    setUnitModel(category);
    setModalMode('Delete');
    handleOnOpenModal();
  };

  return (
    <>
      <InfoBar pageTitle="Unidades">
        <Button
          onClick={handleOnAddUnit}
          variant="contained"
          fullWidth
          style={{ backgroundColor: '#900A20', color: 'white' }}
          endIcon={<Add />}
        >
          Agregar Unidad
        </Button>
      </InfoBar>
      <div className=" min-w-full flex flex-col gap-6 rounded-md drop-shadow-md justify-center w-full px-8 mb-3">
        {unitsQuery?.data && <CompactTable columns={columns} data={data} theme={theme} />}
      </div>
      <UnitsModal
        open={openModal}
        unit={unitModel}
        mode={modalMode}
        onClose={handleOnCloseModal}
        onCreateAccept={createUnitMutate}
        onEditAccept={editUnitMutate}
        onDeleteAccept={deleteUnitMutate}
      />
    </>
  );
};

export default Units;
