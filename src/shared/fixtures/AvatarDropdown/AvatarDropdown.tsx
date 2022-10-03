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
import LogoutIcon from '@mui/icons-material/Logout';
import './AvatarDropdown.scss';

export const AvatarDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userInfo } = useAuthContext();

  const { mutate } = useLogout();

  const handleLogout = () => mutate();

  const navigate = useNavigate();

  const goToMyProfile = () => {
    navigate(`/profile/${userInfo._id}/posts`);
    handleClose();
  };

  return (
    <div className="avatar-dropdown">
      <IconButton
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        disableRipple
        onClick={handleClick}
      >
        <Avatar src={userInfo.profileImage} />
        <p className="avatar-dropdown__username">{`${userInfo.name} ${userInfo.surname}`}</p>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={goToMyProfile}>
          <Avatar
            src={userInfo.profileImage}
            className="avatar-dropdown__avatar"
          />
          <ListItemText>Mój Profil</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
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
