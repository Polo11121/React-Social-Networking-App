import {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useGetUser } from 'api/useGetUser';
import { ResponseUserType, UserType } from 'shared/types/responseTypes';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import { useQueryClient } from 'react-query';
import { io, Socket } from 'socket.io-client';

const initialUserInfo = {
  name: '',
  surname: '',
  _id: '',
  profileImage: '',
} as UserType;

const AuthContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authenticationHandler: (data: any) => {},
  invalidateUserData: () => new Promise(() => {}),
  userInfo: initialUserInfo,
  socket: io() as unknown as MutableRefObject<Socket<any, any> | undefined>,
});

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const queryClient = useQueryClient();
  const socket = useRef<Socket<any, any> | undefined>();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    setIsAuthenticated(Boolean(userId));

    if (userId) {
      socket.current = io();
      socket.current.emit('add-user', userId);
    }
  }, []);

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
      socket,
    }),
    [isAuthenticated, authenticationHandler, userInfo, invalidateUserData]
  );

  return (
    <AuthContext.Provider value={value}>
      <WithLoader isLoading={isLoading}>{children}</WithLoader>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
