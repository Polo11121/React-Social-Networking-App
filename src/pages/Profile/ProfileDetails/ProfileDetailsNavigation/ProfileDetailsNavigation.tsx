import { NavLink } from 'react-router-dom';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import classNames from 'classnames';
import './ProfileDetailsNavigation.scss';

const navigationItems = [
  { label: 'Przegląd', link: 'overview' },
  { label: 'Praca i wykształcenie', link: 'work-and-education' },
  { label: 'Wcześniejsze miejsce zamieszkania', link: 'places' },
  {
    label: 'Dane kontaktowe i podstawowe informacje',
    link: 'contact-and-basic-info',
  },
];

export const ProfileDetailsNavigation = () => {
  const { isOwner } = useProfileInfo();

  return (
    <div className="profile-details-navigation">
      <nav className="profile-details-navigation__content">
        <h3 className="profile-details-navigation__title">Informacje</h3>
        {navigationItems.map(({ label, link }) => (
          <NavLink
            className={({ isActive }) =>
              classNames('profile-details-navigation__link', {
                'profile-details-navigation__link--active': isActive,
              })
            }
            to={link}
          >
            {label}
          </NavLink>
        ))}
        {isOwner && (
          <NavLink
            className={({ isActive }) =>
              classNames('profile-details-navigation__link', {
                'profile-details-navigation__link--active': isActive,
              })
            }
            to="change-password"
          >
            Zmień hasło
          </NavLink>
        )}
      </nav>
    </div>
  );
};
