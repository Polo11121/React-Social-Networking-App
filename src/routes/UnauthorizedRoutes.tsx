import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from 'pages/Main/Main';
import { Login } from 'pages/Login/Login';
import { ForgotPassword } from 'pages/ForgotPassword/ForgotPassword';

export const UnauthorizedRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgotPassword" element={<ForgotPassword />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
