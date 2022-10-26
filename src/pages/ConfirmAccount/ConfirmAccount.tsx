import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useConfirmAccount } from 'api/useConfirmAccount';
import { timeout } from 'shared/functions';
import { useAuthContext } from 'contexts/AuthContext';
import { AxiosResponse } from 'axios';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import './ConfirmAccount.scss';

export const ConfirmAccount = () => {
  const { token } = useParams();
  const { authenticationHandler } = useAuthContext();

  const { mutateAsync, isLoading, status } = useConfirmAccount(token);

  useEffect(() => {
    mutateAsync({}).then((data: AxiosResponse<any, any>) => {
      timeout(3000).then(() => authenticationHandler(data));
    });
  }, []);

  return (
    <div className="confirm-account">
      <WithLoader isLoading={isLoading}>
        {status === 'success' ? (
          <>
            <div className="confirm-account__message">
              <FavoriteIcon style={{ fontSize: '8rem' }} />
              <h2>Pomyślnie potwierdzono założenie konta!</h2>
            </div>
            <h3>Logowanie...</h3>
          </>
        ) : (
          <>
            <div className="confirm-account__message">
              <HeartBrokenIcon style={{ fontSize: '8rem' }} />
              <h2>Nie udało się potwierdzić założenia konta</h2>
            </div>
            <h3>Spróbuj ponownie</h3>
          </>
        )}
      </WithLoader>
    </div>
  );
};
