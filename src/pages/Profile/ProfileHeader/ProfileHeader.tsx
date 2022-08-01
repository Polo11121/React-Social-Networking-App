import { Avatar } from '@mui/material';
import './ProfileHeader.scss';

export const ProfileHeader = ({
  avatar,
  user,
}: {
  avatar: string;
  user: string;
}) => {
  const goToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  return (
    <div className="profile-header">
      <div className="profile-header__content">
        <div onClick={goToTop} className="profile-header__button">
          <Avatar src={avatar} />
          <p className="profile-header__username">{user}</p>
        </div>
      </div>
    </div>
  );
};
