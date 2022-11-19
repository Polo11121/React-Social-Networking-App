import { useAuthContext } from 'contexts/AuthContext';
import { AdminAuthorizedRoutes } from 'routes/AuthorizedRoutes/AdminAuthorizedRoutes/AdminAuthorizedRoutes';
import { UserAuthorizedRoutes } from 'routes/AuthorizedRoutes/UserAuthorizedRoutes/UserAuthorizedRoutes';

export const AuthorizedRoutes = () => {
  const { isAdmin } = useAuthContext();

  return isAdmin ? <AdminAuthorizedRoutes /> : <UserAuthorizedRoutes />;
};
