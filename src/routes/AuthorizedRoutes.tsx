import { AppBottomHeader } from 'shared/fixtures/AppBottomHeader/AppBottomHeader';
import { AppTopHeader } from 'shared/fixtures/AppTopHeader/AppTopHeader';
import { Route, Routes } from 'react-router-dom';
import { authorizedRoutes } from 'routes/routes';

export const AuthorizedRoutes = ({ userId }: { userId: string }) => (
  <>
    <AppTopHeader />
    <Routes>
      {authorizedRoutes(userId).map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
    </Routes>
    <AppBottomHeader />
  </>
);
