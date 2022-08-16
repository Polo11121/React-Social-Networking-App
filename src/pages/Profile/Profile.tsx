import { ProfilePreview } from 'pages/Profile/ProfilePreview/ProfilePreview';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { useCheckVisibility } from 'shared/hooks/useCheckVisibility';
import { ProfileNavigation } from 'pages/Profile/ProfileNavigation/ProfileNavigation';
import { ProfileContent } from 'pages/Profile/ProfileContent/ProfileContent';
import { Spinner } from 'components';
import './Profile.scss';

export const Profile = () => {
  const { isLoading } = useProfileInfo();
  const { ref, isVisible } = useCheckVisibility();

  return (
    <div className="profile">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ProfilePreview ref={ref} />
          <ProfileNavigation isVisible={isVisible} />
          <ProfileContent />
        </>
      )}
    </div>
  );
};
