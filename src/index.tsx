import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthContextProvider } from 'contexts/AuthContext';
import { ErrorFallback } from 'pages/ErrorFallback/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const queryClient = new QueryClient();

const root = document.getElementById('root');

axios.defaults.baseURL = 'https://praca-inzynierska-backend.vercel.app';

render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
            <ToastContainer />
          </ErrorBoundary>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  root
);
