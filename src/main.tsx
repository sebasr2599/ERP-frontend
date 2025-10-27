import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getActions } from './store/auth-store';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {(() => {
      const { setAccessToken, setUserInformation } = getActions();
      const token = localStorage.getItem('access_token');
      const firstName = localStorage.getItem('user_first_name') || undefined;
      const lastName = localStorage.getItem('user_last_name') || undefined;
      const role = localStorage.getItem('user_role') || undefined;
      if (token) {
        setAccessToken(token);
      }
      if (firstName || lastName || role) {
        setUserInformation({ firstName, lastName, role });
      }
      return null;
    })()}
    <QueryClientProvider client={queryClient}>
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
        <QueryClientProvider client={queryClient}>
          {/* The rest of your application */}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
