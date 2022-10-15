import { NavLink } from 'react-router-dom';
import { useGetUnreadMessages } from 'api/useGetUnreadMessages';
import { useGetNewMatches } from 'api/useGetNewMatches';
import { Badge } from '@mui/material';
import { Tooltip } from 'components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import classNames from 'classnames';
import CasinoIcon from '@mui/icons-material/Casino';
import MessageIcon from '@mui/icons-material/Message';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import './HeaderNavigation.scss';

export const HeaderNavigation = () => {
  const { data: unreadMessages } = useGetUnreadMessages();
  const { data: newMatches } = useGetNewMatches();

  const navigationItems = [
    {
      label: 'Ślepy strzał',
      id: 'game',
      path: '',
      Icon: <CasinoIcon fontSize="large" />,
    },
    {
      label: 'Czat',
      id: 'chat',
      path: 'chat',
      Icon: <MessageIcon fontSize="large" />,
      counter: unreadMessages,
    },
    {
      label: 'Dopasowania',
      id: 'matches',
      path: 'matches',
      Icon: <FavoriteIcon fontSize="large" />,
      counter: newMatches,
    },
    {
      label: 'Proponowani',
      id: 'suggestions',
      path: 'suggestions',
      Icon: <VolunteerActivismIcon fontSize="large" />,
    },
  ];
  return (
    <nav className="header-navigation">
      {navigationItems.map(({ label, id, path, Icon, counter }) => (
        <>
          <Tooltip backgroundColor="#006f71" text={label} id={id} />
          <NavLink
            data-tip
            data-for={id}
            className={({ isActive }) =>
              classNames('header-navigation__link', {
                'header-navigation__link--active': isActive,
              })
            }
            to={path}
          >
            {counter ? (
              <Badge badgeContent={counter} color="primary">
                {Icon}
              </Badge>
            ) : (
              Icon
            )}
          </NavLink>
        </>
      ))}
    </nav>
  );
};
