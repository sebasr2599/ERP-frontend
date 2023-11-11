import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider
      authType="cookie"
      authName="access_token"
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
    >
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="bottom-left"
              autoClose={2000}
              hideProgressBar={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              rtl={false}
            />
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
