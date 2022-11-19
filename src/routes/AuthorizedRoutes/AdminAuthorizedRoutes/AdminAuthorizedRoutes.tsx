import { AdminHeader } from 'shared/features/AdminHeader/AdminHeader';
import { adminAuthorizedRoutes } from 'routes/routes';
import { Route, Routes } from 'react-router-dom';
import { AdminNavbar } from 'shared/features/AdminNavbar/AdminNavbar';

export const AdminAuthorizedRoutes = () => (
  <>
    <AdminHeader />
    <div style={{ display: 'flex' }}>
      <AdminNavbar />
      <div style={{ flex: 0.8 }}>
        <Routes>
          {adminAuthorizedRoutes().map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}
        </Routes>
      </div>
    </div>
  </>
);
