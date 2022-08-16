import { Avatar, Collapse } from '@mui/material';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { goToTop } from 'shared/functions';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './ProfileNavigation.scss';

export const ProfileNavigation = ({ isVisible }: { isVisible: boolean }) => {
  const { user } = useProfileInfo();

  return (
    <div className="profile-navigation">
      <Collapse in={isVisible}>
        <nav
          className="profile-navigation__content"
          style={isVisible ? {} : { border: 'none' }}
        >
          <NavLink
            className={({ isActive }) =>
              classNames('profile-navigation__link', {
                'profile-navigation__link--active': isActive,
              })
            }
            to="posts"
          >
            Posty
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames('profile-navigation__link', {
                'profile-navigation__link--active': isActive,
              })
            }
            to="photos"
          >
            Zdjęcia
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames('profile-navigation__link', {
                'profile-navigation__link--active': isActive,
              })
            }
            to="info"
          >
            Informacje
          </NavLink>
        </nav>
      </Collapse>
      <Collapse in={!isVisible}>
        <nav
          className={classNames('profile-navigation__content', {
            'profile-navigation__content--avatar': !isVisible,
          })}
        >
          <div onClick={goToTop} className="profile-navigation__button">
            <Avatar src={user.profileImage} />
            <p className="profile-navigation__username">{user.fullName}</p>
          </div>
        </nav>
      </Collapse>
    </div>
  );
};
