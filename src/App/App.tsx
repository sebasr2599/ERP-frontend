import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Navbar from '../layouts/Navbar/Navbar';
import Users from '../pages/Users/Users';
import { RequireAuth } from '../components/RequireAuth/RequireAuth';
import { useIsAuthenticated } from 'react-auth-kit';

export function App() {
  const isIn = useIsAuthenticated();
  // note, this variable is called in a single time, either change to hook or use effect
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
      </Routes>
    </>
  );
}

export default App;
