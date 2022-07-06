import { useLogout } from 'api/useLogout';

export const Home = () => {
  const { mutate } = useLogout();

  return (
    <div>
      <button type="button" onClick={() => mutate()}>
        logout
      </button>
    </div>
  );
};
