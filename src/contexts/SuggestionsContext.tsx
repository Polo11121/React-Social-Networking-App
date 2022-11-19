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
  addRequestedUserHandler: (userId: string) => {},
  removeRequestedUserHandler: (userId: string) => {},
});

export const SuggestionsContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [requestedUsers, setRequestedUsers] = useState<string[]>([]);

  const addRequestedUserHandler = useCallback(
    (userId: string) =>
      setRequestedUsers((prevState) => [...prevState, userId]),
    []
  );

  const removeRequestedUserHandler = useCallback(
    (userId: string) =>
      setRequestedUsers((prevState) => prevState.filter((id) => id !== userId)),
    []
  );

  const value = useMemo(
    () => ({
      requestedUsers,
      addRequestedUserHandler,
      removeRequestedUserHandler,
    }),
    [requestedUsers, addRequestedUserHandler, removeRequestedUserHandler]
  );

  return (
    <SuggestionsContext.Provider value={value}>
      {children}
    </SuggestionsContext.Provider>
  );
};

export const useSuggestionsContext = () => useContext(SuggestionsContext);
