import { useQuery } from '@tanstack/react-query';
import fakeData from './Mock.json';
import { useMemo } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { getUsers } from '../../services/user.service';

const Users = () => {
  const data = useMemo(() => fakeData, []);
  const users = useQuery({ queryKey: ['users'], queryFn: getUsers });

  const columns = [
    { key: 'username', name: 'Nombre del Usuario' },
    { key: 'first_name', name: 'Nombre' },
    { key: 'last_name', name: 'Apellido' },
    { key: 'rol', name: 'Rol' },
  ];
  // TODO: Finish React Query and toast error
  // TODO: Have a way to show loading table
  return (
    <>
      <div className="p-8 flex justify-between mx-auto">
        <h1 className="font-bold text-3xl">Usuarios</h1>
        <p>Search component</p>
      </div>
      <div className="flex items-center justify-center w-full p-8 ">
        <DataGrid columns={columns} rows={data} className="rdg-light max-w-full min-w-full rounded-md drop-shadow-md" />
      </div>
    </>
  );
};

export default Users;
