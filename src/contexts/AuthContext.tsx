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
import { WithLoader } from 'shared/features/WithLoader/WithLoader';
import { useQueryClient } from 'react-query';

import { io, Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { customToast } from 'shared/hooks/customToast';
import axios from 'axios';

const initialUserInfo = {
  name: '',
  surname: '',
  _id: '',
  profileImage: '',
} as UserType;

const AuthContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authenticationHandler: (data?: any) => {},
  invalidateUserData: () => new Promise(() => {}),
  userInfo: initialUserInfo,
  socket: null as unknown as MutableRefObject<Socket<any, any> | undefined>,
  isAdmin: false,
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
  const isProduction = process.env.NODE_ENV === 'production';

  const authenticationHandler = useCallback(
    ({ data }: { data: ResponseUserType | null }) => {
      if (isAuthenticated && !data) {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');

        socket.current = undefined;
      } else if (data) {
        localStorage.setItem('userId', data.data._id);
        localStorage.setItem('token', data.token);

        axios.defaults.headers.common = isProduction
          ? {
              Authorization: `Bearer ${data.token}`,
            }
          : {};
      }

      setIsAuthenticated((prevState) => !prevState);
    },
    [isAuthenticated, isProduction]
  );

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userToken = localStorage.getItem('token');

    if (userId && userToken && !socket.current) {
      axios.defaults.headers.common = isProduction
        ? {
            Authorization: `Bearer ${userToken}`,
          }
        : {};

      setIsAuthenticated(true);

      socket.current =
        process.env.NODE_ENV === 'production'
          ? io(process.env.REACT_APP_API_KEY as string)
          : io();

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
            });
          }
        }
      );

      socket.current.on(
        'match-status',
        ({ text, users }: { text: string; users: string[] }) => {
          users.forEach((user) => {
            queryClient.invalidateQueries(['user', user]);
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

      socket.current.on('new-report', () => {
        queryClient.invalidateQueries('newReports');
        queryClient.invalidateQueries('dashboardCounters');
        queryClient.invalidateQueries('reports');
        customToast({ text: 'Dodano nowe zgłoszenie' });
      });

      socket.current.on('user-blocked', () => {
        authenticationHandler({ data: null });
        customToast({
          text: 'Konto zostało zablokowane, po więcej informacji sprawdź skrzynkę pocztową',
          autoClose: 5000,
        });
      });
    }

    return () => {
      if (socket.current) {
        socket.current.removeAllListeners();
      }
    };
  }, [path, queryClient, isProduction, authenticationHandler]);

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
      isAdmin: userInfo.role === 'admin',
    }),
    [isAuthenticated, authenticationHandler, userInfo, invalidateUserData]
  );

  axios.defaults.baseURL = isProduction ? process.env.REACT_APP_API_KEY : '';

  return (
    <AuthContext.Provider value={value}>
      <WithLoader isLoading={isLoading}>{children}</WithLoader>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
