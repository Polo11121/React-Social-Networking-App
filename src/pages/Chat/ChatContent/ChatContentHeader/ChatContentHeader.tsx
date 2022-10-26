import { Avatar, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ChatContentHeader.scss';

type ChatContentHeaderPropsType = {
  avatar?: string;
  fullName: string;
  userId: string;
};

export const ChatContentHeader = ({
  avatar,
  fullName,
  userId,
}: ChatContentHeaderPropsType) => (
  <div className="chat-content-header">
    <IconButton>
      <NavLink className="chat-content-header__back-button" to="/chat">
        <ArrowBackIcon />
      </NavLink>
    </IconButton>
    <NavLink to={`/profile/${userId}`} className="chat-content-header__user">
      <Avatar src={avatar} />
      <span>{fullName}</span>
    </NavLink>
  </div>
);
