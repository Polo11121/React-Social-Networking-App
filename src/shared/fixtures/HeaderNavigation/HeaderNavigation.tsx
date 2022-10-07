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

  return (
    <nav className="header-navigation">
      <Tooltip backgroundColor="#006f71" text="Ślepy strzał" id="game" />
      <NavLink
        data-tip
        data-for="game"
        className={({ isActive }) =>
          classNames('header-navigation__link', {
            'header-navigation__link--active': isActive,
          })
        }
        to=""
      >
        <CasinoIcon fontSize="large" />
      </NavLink>
      <Tooltip backgroundColor="#006f71" text="Czat" id="chat" />
      <NavLink
        data-tip
        data-for="chat"
        className={({ isActive }) =>
          classNames('header-navigation__link', {
            'header-navigation__link--active': isActive,
          })
        }
        to="chat"
      >
        <Badge badgeContent={unreadMessages} color="primary">
          <MessageIcon fontSize="large" />
        </Badge>
      </NavLink>
      <Tooltip backgroundColor="#006f71" text="Dopasowania" id="matches" />
      <NavLink
        data-tip
        data-for="matches"
        className={({ isActive }) =>
          classNames('header-navigation__link', {
            'header-navigation__link--active': isActive,
          })
        }
        to="/matches"
      >
        <Badge badgeContent={newMatches} color="primary">
          <FavoriteIcon fontSize="large" />
        </Badge>
      </NavLink>
      <Tooltip
        backgroundColor="#006f71"
        text="Proponowani"
        id="proposedPeople"
      />
      <NavLink
        data-tip
        data-for="proposedPeople"
        className={({ isActive }) =>
          classNames('header-navigation__link', {
            'header-navigation__link--active': isActive,
          })
        }
        to="/proposedPeople"
      >
        <VolunteerActivismIcon fontSize="large" />
      </NavLink>
    </nav>
  );
};
