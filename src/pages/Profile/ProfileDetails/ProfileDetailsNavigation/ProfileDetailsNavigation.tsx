import { NavLink } from 'react-router-dom';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import classNames from 'classnames';
import './ProfileDetailsNavigation.scss';

const navigationItems = (isOwner: boolean) => {
  const ownerNavigationItems = isOwner
    ? [
        {
          label: 'Zmień e-mail',
          link: 'change-email',
        },
        isOwner && {
          label: 'Zmień hasło',
          link: 'change-password',
        },
        isOwner && {
          label: ' Usuń konto',
          link: 'delete-account',
        },
      ]
    : [];

  return [
    { label: 'Przegląd', link: 'overview' },
    { label: 'Praca i wykształcenie', link: 'work-and-education' },
    { label: 'Wcześniejsze miejsce zamieszkania', link: 'places' },
    {
      label: 'Dane kontaktowe i podstawowe informacje',
      link: 'contact-and-basic-info',
    },
    ...ownerNavigationItems,
  ];
};

export const ProfileDetailsNavigation = () => {
  const { isOwner } = useProfileInfo();

  return (
    <div className="profile-details-navigation">
      <nav className="profile-details-navigation__content">
        <h3 className="profile-details-navigation__title">Informacje</h3>
        {navigationItems(isOwner).map(({ label, link }) => (
          <NavLink
            key={link}
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
      </nav>
    </div>
  );
};
