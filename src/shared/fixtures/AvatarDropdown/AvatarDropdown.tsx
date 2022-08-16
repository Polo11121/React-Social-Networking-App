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

const AvatarDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
    <>
      <IconButton
        style={{ display: 'flex', flexDirection: 'column' }}
        disableRipple
        onClick={handleClick}
      >
        <Avatar src={userInfo.profileImage} />
        <p
          style={{ fontSize: '18px', color: 'black' }}
        >{`${userInfo.name} ${userInfo.surname}`}</p>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
    </>
  );
};

export default AvatarDropdown;
