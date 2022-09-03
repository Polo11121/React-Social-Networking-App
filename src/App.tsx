import { UnauthorizedRoutes } from 'routes/UnauthorizedRoutes';
import { AuthorizedRoutes } from 'routes/AuthorizedRoutes';
import { useAuthContext } from 'contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const App = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="App">
      {isAuthenticated ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
      <ToastContainer />
    </div>
  );
};

export default App;
