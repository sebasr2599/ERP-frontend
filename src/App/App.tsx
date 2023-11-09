import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import { RequireAuth, useIsAuthenticated } from 'react-auth-kit';
import Navbar from '../layouts/Navbar/Navbar';

export function App() {
  const isAuth = useIsAuthenticated();
  return (
    <>
      {isAuth() && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          // element={<Dashboard />}
          element={
            <RequireAuth loginPath="/login">
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
