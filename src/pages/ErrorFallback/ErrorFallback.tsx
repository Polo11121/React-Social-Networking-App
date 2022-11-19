import { useAuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLogout } from 'api/useLogout';
import { Button } from 'components';
import HeartBrokenSharpIcon from '@mui/icons-material/HeartBrokenSharp';
import './ErrorFallback.scss';

export const ErrorFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => {
  const navigate = useNavigate();
  const { userInfo, isAdmin } = useAuthContext();

  const { mutateAsync, isLoading } = useLogout();

  const navigateToProfileHandler = () => {
    resetErrorBoundary();
    navigate(`/${isAdmin ? 'admin-' : ''}profile/${userInfo._id}`);
  };

  const logoutHandler = () => {
    mutateAsync().then(() => {
      resetErrorBoundary();
    });
  };

  return (
    <div className="error-fallback">
      <div className="error-fallback__message">
        <HeartBrokenSharpIcon style={{ fontSize: '8rem' }} />
        <h2>Coś poszło nie tak....</h2>
      </div>
      <div className="error-fallback__buttons">
        <Button
          size="big"
          onClick={navigateToProfileHandler}
          text="Powrót do profil"
          buttonStyleType="primary"
        />
        <Button
          size="big"
          isDisabled={isLoading}
          onClick={logoutHandler}
          text="Wyloguj"
          buttonStyleType="mandy"
        />
      </div>
    </div>
  );
};
