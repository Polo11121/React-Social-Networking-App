import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmEmail } from 'api/useConfirmEmail';
import { useAuthContext } from 'contexts/AuthContext';
import { useLogout } from 'api/useLogout';
import { timeout } from 'shared/functions';
import { WithLoader } from 'shared/features/WithLoader/WithLoader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import './ChangeEmail.scss';

export const ChangeEmail = () => {
  const { token } = useParams();
  const { isAuthenticated } = useAuthContext();
  const { mutateAsync: logoutHandler } = useLogout('');
  const navigate = useNavigate();

  const { mutateAsync, isLoading, status, error } = useConfirmEmail(token);

  useEffect(() => {
    mutateAsync({}).finally(() => {
      timeout(3000).then(async () => {
        if (isAuthenticated) {
          await logoutHandler();
        }

        navigate('/');
      });
    });
  }, []);

  return (
    <div className="change-email">
      <WithLoader isLoading={isLoading || status === 'idle'}>
        <div className="change-email__message">
          {status === 'success' ? (
            <>
              <FavoriteIcon style={{ fontSize: '8rem' }} />
              <h2>Pomyślnie zmieniono adres e-mail!</h2>
            </>
          ) : (
            <>
              <HeartBrokenIcon style={{ fontSize: '8rem' }} />
              <h2>{error}</h2>
            </>
          )}
          <h3>Powrót do ekranu logowania...</h3>
        </div>
      </WithLoader>
    </div>
  );
};
