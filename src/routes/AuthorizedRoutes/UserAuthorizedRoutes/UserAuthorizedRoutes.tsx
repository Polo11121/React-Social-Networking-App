import { AppBottomHeader } from 'shared/features/AppBottomHeader/AppBottomHeader';
import { userAuthorizedRoutes } from 'routes/routes';
import { AppTopHeader } from 'shared/features/AppTopHeader/AppTopHeader';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';

export const UserAuthorizedRoutes = () => {
  const { userInfo } = useAuthContext();
  const location = useLocation();

  const pathname = location.pathname.split('/')[1];

  return (
    <>
      {pathname !== 'change-email' && <AppTopHeader />}
      <Routes>
        {userAuthorizedRoutes(userInfo._id).map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      </Routes>
      {pathname !== 'change-email' && <AppBottomHeader />}
    </>
  );
};
