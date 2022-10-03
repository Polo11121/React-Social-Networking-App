import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './ChatNavbarListItem.scss';

type ChatNavbarListItemPropsType = {
  userId: string;
  avatar: string;
  fullName: string;
  lastMessage: string;
  isActive?: boolean;
  newMessage?: boolean;
};

export const ChatNavbarListItem = ({
  userId,
  avatar,
  fullName,
  lastMessage,
  isActive = false,
  newMessage,
}: ChatNavbarListItemPropsType) => (
  <NavLink
    to={`/chat/${userId}`}
    className={classNames('chat-navbar-list-item', {
      'chat-navbar-list-item--active': isActive,
    })}
  >
    <Avatar src={avatar} className="chat-navbar-list-item__avatar" />
    <div className="chat-navbar-list-item__info">
      <span className="chat-navbar-list-item__full-name">{fullName}</span>
      <span
        className={classNames('chat-navbar-list-item__last-message', {
          'chat-navbar-list-item__last-message--bold': newMessage,
        })}
      >
        {lastMessage}
      </span>
    </div>
  </NavLink>
);
