import { Avatar } from '@mui/material';
import { useAuthContext } from 'contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import classNames from 'classnames';
import './AdminNavbar.scss';

export const AdminNavbar = () => {
  const { userInfo } = useAuthContext();

  return (
    <div className="admin-navbar">
      <NavLink
        data-testid="admin-panel-profile-link"
        to={`/admin-profile/${userInfo._id}`}
        className="admin-navbar__info-container"
      >
        <Avatar className="admin-navbar__avatar" src={userInfo.profileImage} />
        <div>
          <div>Administrator</div>
          <div>
            {userInfo.name} {userInfo.surname}
          </div>
        </div>
      </NavLink>
      <div className="admin-navbar__section-title">ZGŁOSZENIA</div>
      <NavLink
        data-testid="admin-panel-dashboard-link"
        to="/"
        className={({ isActive }) =>
          classNames('admin-navbar__section', {
            'admin-navbar__section--active': isActive,
          })
        }
      >
        <>
          <DashboardIcon /> Panel główny
        </>
      </NavLink>
      <NavLink
        data-testid="admin-panel-all-reports-link"
        to="/all-reports"
        className={({ isActive }) =>
          classNames('admin-navbar__section', {
            'admin-navbar__section--active': isActive,
          })
        }
      >
        <>
          <AssignmentIcon /> Wszystkie zgłoszenia
        </>
      </NavLink>
      <NavLink
        data-testid="admin-panel-new-reports-link"
        to="/new-reports"
        className={({ isActive }) =>
          classNames('admin-navbar__section', {
            'admin-navbar__section--active': isActive,
          })
        }
      >
        <>
          <AssignmentLateIcon /> Nowe zgłoszenia
        </>
      </NavLink>
      <NavLink
        data-testid="admin-panel-solved-reports-link"
        to="/solved-reports"
        className={({ isActive }) =>
          classNames('admin-navbar__section', {
            'admin-navbar__section--active': isActive,
          })
        }
      >
        <>
          <AssignmentTurnedInIcon /> Zamknięte zgłoszenia
        </>
      </NavLink>
      <NavLink
        data-testid="admin-panel-my-reports-link"
        to="/my-reports"
        className={({ isActive }) =>
          classNames('admin-navbar__section', {
            'admin-navbar__section--active': isActive,
          })
        }
      >
        <>
          <AssignmentIndIcon /> Moje zgłoszenia
        </>
      </NavLink>
      <div className="admin-navbar__section-title">ZARZĄDZANIE</div>
      <NavLink
        data-testid="admin-panel-users-link"
        to="/users"
        className={({ isActive }) =>
          classNames('admin-navbar__section', {
            'admin-navbar__section--active': isActive,
          })
        }
      >
        <>
          <GroupIcon /> Użytkownicy
        </>
      </NavLink>
      <NavLink
        data-testid="admin-panel-administrators-link"
        to="/administrators"
        className={({ isActive }) =>
          classNames('admin-navbar__section', {
            'admin-navbar__section--active': isActive,
          })
        }
      >
        <>
          <AdminPanelSettingsIcon /> Administratorzy
        </>
      </NavLink>
    </div>
  );
};
