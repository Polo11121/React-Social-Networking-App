import { UnauthorizedRoutes } from 'routes/UnauthorizedRoutes';
import { AuthorizedRoutes } from 'routes/AuthorizedRoutes';
import { useAuthContext } from 'contexts/AuthContext';
import './App.scss';

const App = () => {
  const { isAuthenticated, userInfo } = useAuthContext();

  return (
    <div className="App">
      {isAuthenticated ? (
        <AuthorizedRoutes userId={userInfo._id} />
      ) : (
        <UnauthorizedRoutes />
      )}
    </div>
  );
};

export default App;
