import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAuthContext } from 'contexts/AuthContext';
import { useLogout } from 'api/useLogout';
import { useNavigate } from 'react-router-dom';
import { getFullName } from 'shared/functions';
import LogoutIcon from '@mui/icons-material/Logout';
import './AvatarDropdown.scss';

export const AvatarDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userInfo } = useAuthContext();
  const { mutate } = useLogout();

  const openHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => mutate();

  const navigate = useNavigate();

  const navigateToMyProfile = () => {
    navigate(`/profile/${userInfo._id}/posts`);
    closeHandler();
  };

  return (
    <div className="avatar-dropdown">
      <IconButton
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        disableRipple
        onClick={openHandler}
      >
        <Avatar src={userInfo.profileImage} />
        <p className="avatar-dropdown__username">
          {getFullName(userInfo.name, userInfo.surname)}
        </p>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeHandler}>
        <MenuItem onClick={navigateToMyProfile}>
          <Avatar
            src={userInfo.profileImage}
            className="avatar-dropdown__avatar"
          />
          <ListItemText>Mój Profil</ListItemText>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <div className="avatar-dropdown__icon-overlay">
            <LogoutIcon
              style={{ color: 'white' }}
              className="avatar-dropdown__icon"
            />
          </div>
          <ListItemText>Wyloguj</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
