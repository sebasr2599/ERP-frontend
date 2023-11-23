import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Navbar from '../layouts/Navbar/Navbar';
import Users from '../pages/Users/Users';
import { RequireAuth } from '../components/RequireAuth/RequireAuth';
import { useIsAuthenticated } from 'react-auth-kit';
import Inventory from '../pages/Inventory/Inventory';

// TODO: Add use state to get access_tocken from localStorage, then check if it's auth and set store
export function App() {
  const isIn = useIsAuthenticated();
  return (
    <>
      {isIn() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/users"
          element={
            <RequireAuth>
              <Users />
            </RequireAuth>
          }
        />
        <Route
          path="/inventory"
          element={
            <RequireAuth>
              <Inventory />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
