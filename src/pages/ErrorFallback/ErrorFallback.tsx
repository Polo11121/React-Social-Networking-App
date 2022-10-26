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
  const { userInfo } = useAuthContext();

  const { mutateAsync, isLoading } = useLogout();

  const navigateToProfile = () => {
    resetErrorBoundary();
    navigate(`/profile/${userInfo._id}`);
  };

  const logout = () => {
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
          onClick={navigateToProfile}
          text="Powrót do profil"
          buttonStyleType="primary"
        />
        <Button
          size="big"
          isDisabled={isLoading}
          onClick={logout}
          text="Wyloguj"
          buttonStyleType="mandy"
        />
      </div>
    </div>
  );
};
