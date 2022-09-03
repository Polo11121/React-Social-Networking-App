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
import { ResponseUserType, UserType } from 'shared/types/responseTypes';
import { Spinner } from 'components';
import { useQueryClient } from 'react-query';

const initialUserInfo = {
  name: '',
  surname: '',
  _id: '',
  profileImage: '',
} as UserType;

const AuthContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line
  authenticationHandler: (data: any) => {},
  invalidateUserData: () => new Promise(() => {}),
  userInfo: initialUserInfo,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const queryClient = useQueryClient();

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

  const invalidateUserData = useCallback(
    () =>
      queryClient.invalidateQueries(['user', localStorage.getItem('userId')]),
    [queryClient]
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      authenticationHandler,
      userInfo: userInfo || initialUserInfo,
      invalidateUserData,
    }),
    [isAuthenticated, authenticationHandler, userInfo, invalidateUserData]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoading && <Spinner />}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
