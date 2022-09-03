import { NavLink } from 'react-router-dom';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import classNames from 'classnames';
import './ProfileDetailsNavigation.scss';

export const ProfileDetailsNavigation = () => {
  const { isOwner } = useProfileInfo();

  return (
    <div className="profile-details-navigation">
      <nav className="profile-details-navigation__content">
        <h3 className="profile-details-navigation__title">Informacje</h3>
        <NavLink
          className={({ isActive }) =>
            classNames('profile-details-navigation__link', {
              'profile-details-navigation__link--active': isActive,
            })
          }
          to="overview"
        >
          Przegląd
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('profile-details-navigation__link', {
              'profile-details-navigation__link--active': isActive,
            })
          }
          to="work-and-education"
        >
          Praca i wykształcenie
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('profile-details-navigation__link', {
              'profile-details-navigation__link--active': isActive,
            })
          }
          to="places"
        >
          Wcześniejsze miejsce zamieszkania
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames('profile-details-navigation__link', {
              'profile-details-navigation__link--active': isActive,
            })
          }
          to="contact-and-basic-info"
        >
          Dane kontaktowe i podstawowe informacje
        </NavLink>
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
