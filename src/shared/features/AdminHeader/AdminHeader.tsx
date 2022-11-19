import { Avatar, IconButton } from '@mui/material';
import { useLogout } from 'api/useLogout';
import { useAuthContext } from 'contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import './AdminHeader.scss';

export const AdminHeader = () => {
  const { userInfo } = useAuthContext();
  const { mutate } = useLogout();

  const logoutHandler = () => mutate();

  return (
    <header className="admin-header" data-testid="admin-panel-header">
      <div className="admin-header__text-container">
        <div className="admin-header__text">
          <span className="admin-header__text--bold">ADMIN</span> PANEL
        </div>
      </div>
      <div className="admin-header__info-container">
        <div className="admin-header__info">
          <Avatar src={userInfo.profileImage} />
          <div>
            {userInfo.name} {userInfo.surname}, Admin
          </div>
        </div>
        <IconButton
          onClick={logoutHandler}
          disableRipple
          className="admin-header__logout"
          data-testid="admin-header-logout-button"
        >
          <LogoutIcon />
          Wyloguj
        </IconButton>
      </div>
    </header>
  );
};
