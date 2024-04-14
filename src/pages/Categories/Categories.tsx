import { Button, IconButton } from '@mui/material';
import InfoBar from '../../layouts/InfoBar/InfoBar';
import { Add, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../services/category.service';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui';
import { useState } from 'react';
import CategoriesModal from './CategoriesModal';
import { toast } from 'react-toastify';

type modes = 'Category' | 'Delete' | '';

const model: Category = {
  id: undefined,
  name: '',
};
const Categories = () => {
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
  const [categoryModel, setCategoryModel] = useState<Category>(model);
  const [modalMode, setModalMode] = useState<modes>('');
  // React query functions
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  // React Query Mutations
  const { mutate: createCategoryMutate } = useMutation({
    mutationFn: (category: Category) => createCategory(category),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => toast.error('Error al crear una nueva categoria'),
  });

  const { mutate: editCategoryMutate } = useMutation({
    mutationFn: (category: Category) => updateCategory(category),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: () => toast.error('Error al editar categoria'),
  });

  const { mutate: deleteCategoryMutate } = useMutation({
    mutationFn: (category: Category) => deleteCategory(category),
    onSuccess: () => {
      handleOnCloseModal();
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },

    onError: () => toast.error('Error al borrar'),
  });

  // handlers and helper funcionts
  const data = {
    nodes: categoriesQuery?.data?.sort((a, b) => {
      return a.name.localeCompare(b.name);
    }),
  };
  // TODO: Add actions column
  const columns: Column<Category>[] = [
    { label: 'Nombre', renderCell: (item) => item.name },
    {
      label: 'Acciones',
      renderCell: (item) => (
        <div className="flex flex-row gap 2">
          <IconButton onClick={() => handleOnEditCategory(item)}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleOnDeleteCategory(item)}>
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
    setCategoryModel(model);
  };

  const handleOnAddCategory = () => {
    setCategoryModel(model);
    setModalMode('Category');
    handleOnOpenModal();
  };

  const handleOnEditCategory = (category: Category) => {
    setCategoryModel(category);
    setModalMode('Category');
    handleOnOpenModal();
  };

  const handleOnDeleteCategory = (category: Category) => {
    setCategoryModel(category);
    setModalMode('Delete');
    handleOnOpenModal();
  };
  return (
    <>
      <InfoBar pageTitle="Categorías">
        <Button
          onClick={handleOnAddCategory}
          variant="contained"
          fullWidth
          style={{ backgroundColor: '#900A20', color: 'white' }}
          endIcon={<Add />}
        >
          Agregar Categoria
        </Button>
      </InfoBar>
      <div className=" min-w-full flex flex-col gap-6 rounded-md drop-shadow-md justify-center w-full px-8 ">
        {categoriesQuery?.data && <CompactTable columns={columns} data={data} theme={theme} />}
      </div>
      <CategoriesModal
        open={openModal}
        category={categoryModel}
        mode={modalMode}
        onClose={handleOnCloseModal}
        onCreateAccept={createCategoryMutate}
        onEditAccept={editCategoryMutate}
        onDeleteAccept={deleteCategoryMutate}
      />
    </>
  );
};

export default Categories;
