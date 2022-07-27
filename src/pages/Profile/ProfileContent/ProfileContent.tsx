import { ProfileInfo } from 'pages/Profile/ProfileContent/ProfileInfo/ProfileInfo';
import { ProfilePosts } from 'pages/Profile/ProfileContent/ProfilePosts/ProfilePosts';
import './ProfileContent.scss';

export const ProfileContent = () => {
  return (
    <div className="profile-content">
      <ProfileInfo />
      <ProfilePosts />
    </div>
  );
};
