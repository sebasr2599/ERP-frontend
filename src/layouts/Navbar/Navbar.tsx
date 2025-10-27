import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getFirstName, getLastName, useAccessToken } from '../../store/auth-store';
import { logoutAuth } from '../../utils/auth-util';

const Navbar: React.FC = () => {
  // const { firstName, lastName } = useUser();
  const firstName = getFirstName();
  const lastName = getLastName();
  const token = useAccessToken();
  const navigateTo = useNavigate();
  const handleOnClickLogOut = () => {
    logoutAuth();
    localStorage.removeItem('user_first_name');
    localStorage.removeItem('user_last_name');
    localStorage.removeItem('user_role');
    navigateTo('/login');
  };
  return (
    <nav
      style={{ backgroundColor: 'white' }}
      className={`w-full bg-white shadow-md border-b-4 border-primary ${!token ? 'hidden' : ''}`}
    >
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="flex flex-row gap-2 md:gap-8  justify-center items-center">
          <h1 className="text-2xl py-2">Puesto Basañez</h1>
          <Link to="/" className="text-lg font-bold">
            Menu principal
          </Link>
        </div>

        <ul className="flex gap-4 text-lg">
          <p>{`${firstName} ${lastName}`}</p>
          <button className="flex flex-row gap-1" onClick={handleOnClickLogOut}>
            <p>Salir</p>
            <ExitToAppIcon />
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
