import { ProfilePreview } from 'pages/Profile/ProfilePreview/ProfilePreview';
import { ProfileInfo } from 'pages/Profile/ProfileInfo/ProfileInfo';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { ProfilePosts } from 'pages/Profile/ProfilePosts/ProfilePosts';
import { useHandleScroll } from 'pages/Profile/useHandleScroll';
import { ProfileHeader } from 'pages/Profile/ProfileHeader/ProfileHeader';
import { Spinner } from 'components';
import './Profile.scss';

export const Profile = () => {
  const { isLoading, user } = useProfileInfo();
  const { ref, isVisible } = useHandleScroll();

  return (
    <div className="profile">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ProfilePreview ref={ref} user={user} />
          {!isVisible && (
            <ProfileHeader
              avatar={user.profileImage}
              user={`${user.name} ${user.surname}`}
            />
          )}
          <div className="profile__content">
            <ProfileInfo />
            <ProfilePosts />
          </div>
        </>
      )}
    </div>
  );
};
