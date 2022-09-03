import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import './HeaderNavigation.scss';

export const HeaderNavigation = () => {
  return (
    <nav className="header-navigation">
      <NavLink
        className={({ isActive }) =>
          classNames('header-navigation__link', {
            'header-navigation__link--active': isActive,
          })
        }
        to=""
      >
        <HomeIcon fontSize="large" />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          classNames('header-navigation__link', {
            'header-navigation__link--active': isActive,
          })
        }
        to="chat"
      >
        <MessageIcon fontSize="large" />
      </NavLink>
    </nav>
  );
};
