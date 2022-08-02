import { AboutMe } from 'pages/Profile/ProfileInfo/AboutMe/AboutMe';
import { ProfilePhotos } from 'pages/Profile/ProfileInfo/ProfilePhotos/ProfilePhotos';
import './ProfileInfo.scss';

export const ProfileInfo = () => (
  <div className="profile-info">
    <div className="profile-info__content">
      <AboutMe />
      <ProfilePhotos />
    </div>
  </div>
);
