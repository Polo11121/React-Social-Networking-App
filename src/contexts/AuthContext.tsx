import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useGetUser } from 'api/useGetUser';
import { CircularProgress } from '@mui/material';
import { ResponseUserType } from 'shared/types/responseTypes';

const AuthContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line
  authenticationHandler: (data: any) => {},
  userInfo: {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(
    () => setIsAuthenticated(Boolean(localStorage.getItem('userId'))),
    []
  );

  const authenticationHandler = useCallback(
    ({ data }: { data: ResponseUserType }) => {
      if (isAuthenticated) {
        localStorage.removeItem('userId');
      } else {
        localStorage.setItem('userId', data.data.user?._id);
      }

      setIsAuthenticated((prevState) => !prevState);
    },
    [isAuthenticated]
  );

  const { data: userInfo, isLoading } = useGetUser(
    localStorage.getItem('userId')
  );

  const value = useMemo(
    () => ({ isAuthenticated, authenticationHandler, userInfo }),
    [isAuthenticated, authenticationHandler, userInfo]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
