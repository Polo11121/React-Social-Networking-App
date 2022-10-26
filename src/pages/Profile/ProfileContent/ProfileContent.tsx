import { Route, Routes } from 'react-router-dom';
import { profileContentRoutes } from 'routes/routes';
import './ProfileContent.scss';

export const ProfileContent = () => (
  <div className="profile-content">
    <Routes>
      {profileContentRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
    </Routes>
  </div>
);
