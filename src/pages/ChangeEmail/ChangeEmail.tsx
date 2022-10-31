import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmEmail } from 'api/useConfirmEmail';
import { timeout } from 'shared/functions';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import './ChangeEmail.scss';

export const ChangeEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { mutateAsync, isLoading, status, error } = useConfirmEmail(token);

  useEffect(() => {
    mutateAsync({}).then(() => {
      timeout(3000).then(() => navigate('/'));
    });
  }, []);

  return (
    <div className="change-email">
      <WithLoader isLoading={isLoading}>
        {status === 'success' ? (
          <>
            <div className="change-email__message">
              <FavoriteIcon style={{ fontSize: '8rem' }} />
              <h2>Pomyślnie zmieniono adres e-mail!</h2>
            </div>
            <h3>Przekierowanie do ekranu logowania...</h3>
          </>
        ) : (
          <>
            <div className="change-email__message">
              <HeartBrokenIcon style={{ fontSize: '8rem' }} />
              <h2>{error}</h2>
            </div>
            <h3>Spróbuj ponownie</h3>
          </>
        )}
      </WithLoader>
    </div>
  );
};
