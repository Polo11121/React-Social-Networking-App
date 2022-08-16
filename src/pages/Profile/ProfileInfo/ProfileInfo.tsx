import { Photos } from 'components';
import { AboutMe } from 'pages/Profile/ProfileInfo/AboutMe/AboutMe';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import './ProfileInfo.scss';

export const ProfileInfo = () => {
  const { userPhotos } = useProfileInfo();

  return (
    <div className="profile-info">
      <div className="profile-info__content">
        <AboutMe />
        <Photos
          colsNum={3}
          maxHeight={328}
          rowHeight={168}
          photosList={userPhotos}
          title="Zdjęcia"
        />
      </div>
    </div>
  );
};
