import { ProfilePreview } from 'pages/Profile/ProfilePreview/ProfilePreview';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { useCheckVisibility } from 'shared/hooks/useCheckVisibility';
import { ProfileNavigation } from 'pages/Profile/ProfileNavigation/ProfileNavigation';
import { ProfileContent } from 'pages/Profile/ProfileContent/ProfileContent';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import classNames from 'classnames';
import './Profile.scss';

export const Profile = () => {
  const { isLoading } = useProfileInfo();
  const { ref, isVisible } = useCheckVisibility();

  return (
    <div
      className={classNames('profile', { 'profile--with-spinner': isLoading })}
    >
      <WithLoader isLoading={isLoading}>
        <>
          <ProfilePreview ref={ref} />
          <ProfileNavigation isVisible={isVisible} />
          <ProfileContent />
        </>
      </WithLoader>
    </div>
  );
};
