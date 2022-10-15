/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const SuggestionsContext = createContext({
  requestedUsers: [] as string[],
  addRequestedUser: (userId: string) => {},
  removeRequestedUser: (userId: string) => {},
});

export const SuggestionsContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [requestedUsers, setRequestedUsers] = useState<string[]>([]);

  const addRequestedUser = useCallback(
    (userId: string) =>
      setRequestedUsers((prevState) => [...prevState, userId]),
    []
  );

  const removeRequestedUser = useCallback(
    (userId: string) =>
      setRequestedUsers((prevState) => prevState.filter((id) => id !== userId)),
    []
  );

  const value = useMemo(
    () => ({
      requestedUsers,
      addRequestedUser,
      removeRequestedUser,
    }),
    [requestedUsers, addRequestedUser, removeRequestedUser]
  );

  return (
    <SuggestionsContext.Provider value={value}>
      {children}
    </SuggestionsContext.Provider>
  );
};

export const useSuggestionsContext = () => useContext(SuggestionsContext);
