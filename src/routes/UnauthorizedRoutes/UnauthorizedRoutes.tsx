import { unauthorizedRoutes } from 'routes/routes';
import { Route, Routes } from 'react-router-dom';

export const UnauthorizedRoutes = () => (
  <Routes>
    {unauthorizedRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={Component} />
    ))}
  </Routes>
);
