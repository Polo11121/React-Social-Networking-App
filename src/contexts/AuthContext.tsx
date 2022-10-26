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
import { useLocation } from 'react-router-dom';
import { customToast } from 'shared/hooks/customToast';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const queryClient = useQueryClient();
  const socket = useRef<Socket<any, any> | undefined>();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsAuthenticated(Boolean(userId));

    if (userId && !socket.current) {
      socket.current = io();
      socket.current.emit('add-user', userId);
    }

    if (socket.current) {
      socket.current.on(
        'msg-receive',
        ({ sender, text }: { sender: string; text: string }) => {
          if (path[1] === 'chat' && path[2]) {
            queryClient.invalidateQueries(['messages', sender]);
            queryClient.invalidateQueries('lastMessages');
          } else if (path[1] === 'chat' && !path[2]) {
            queryClient.invalidateQueries('lastMessages');
            queryClient.invalidateQueries('unreadMessages');
          } else {
            queryClient.invalidateQueries('unreadMessages');
            customToast({
              text,
              style: { whiteSpace: 'nowrap', width: 'fit-content' },
            });
          }
        }
      );

      socket.current.on(
        'match-status',
        ({ text, users }: { text: string; users: string[] }) => {
          users.forEach((user) => {
            if (user !== userId) {
              queryClient.invalidateQueries(['user', user]);
            }
          });

          if (path[1] === 'matches') {
            queryClient.invalidateQueries('matches');
          } else {
            queryClient.invalidateQueries('newMatches');
          }

          if (text) {
            customToast({ text });
          }
        }
      );
    }

    return () => {
      if (socket.current) {
        socket.current.removeAllListeners();
      }
    };
  }, [path, queryClient]);

  const authenticationHandler = useCallback(
    ({ data }: { data: ResponseUserType }) => {
      if (isAuthenticated) {
        localStorage.removeItem('userId');
      } else {
        localStorage.setItem('userId', data.data?._id);
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
