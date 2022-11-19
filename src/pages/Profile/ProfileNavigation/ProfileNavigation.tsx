import { ProfileNavigationReport } from 'pages/Profile/ProfileNavigation/ProfileNavigationReport/ProfileNavigationReport';
import { Avatar, Collapse } from '@mui/material';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { goToTop } from 'shared/functions';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './ProfileNavigation.scss';

const navigationItems = [
  { label: 'Posty', link: 'posts' },
  { label: 'Zdjęcia', link: 'photos' },
  { label: 'Informacje', link: 'details' },
];

export const ProfileNavigation = ({ isVisible }: { isVisible: boolean }) => {
  const { user, isOwner } = useProfileInfo();

  return (
    <div className="profile-navigation">
      <Collapse in={isVisible}>
        <div
          className={classNames('profile-navigation__content', {
            'profile-navigation__content--center': isOwner,
          })}
        >
          <nav
            className="profile-navigation__links"
            style={isVisible ? {} : { border: 'none' }}
          >
            {navigationItems.map(({ label, link }) => (
              <NavLink
                key={label}
                className={({ isActive }) =>
                  classNames('profile-navigation__link', {
                    'profile-navigation__link--active': isActive,
                  })
                }
                to={link}
                data-testid={`${link}-link`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          {!isOwner && user.status === 'active' && <ProfileNavigationReport />}
        </div>
      </Collapse>
      <Collapse in={!isVisible}>
        <nav
          className={classNames('profile-navigation__avatar', {
            'profile-navigation__content--hidden': !isVisible,
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
