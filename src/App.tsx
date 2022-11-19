import { UnauthorizedRoutes } from 'routes/UnauthorizedRoutes/UnauthorizedRoutes';
import { AuthorizedRoutes } from 'routes/AuthorizedRoutes/AuthorizedRoutes';
import { useAuthContext } from 'contexts/AuthContext';
import './App.scss';

const App = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="App">
      {isAuthenticated ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
    </div>
  );
};

export default App;
