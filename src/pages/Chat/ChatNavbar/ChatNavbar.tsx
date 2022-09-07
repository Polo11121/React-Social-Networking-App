import { ChatNavbarList } from 'pages/Chat/ChatNavbar/ChatNavbarList/ChatNavbarList';
import { Search } from 'components';
import { useParams } from 'react-router-dom';
import { useSearch } from 'shared/hooks/useSearch';
import classNames from 'classnames';
import './ChatNavbar.scss';

export const ChatNavbar = () => {
  const { id } = useParams();
  const { value, onChange } = useSearch();

  return (
    <div className={classNames('chat-navbar', { 'chat-navbar--hide': id })}>
      <div className="chat-navbar__header">
        <h2>Czaty</h2>
        <Search
          value={value}
          onChange={onChange}
          placeholder="Znajdź użytkownika"
        />
      </div>
      {true ? (
        <ChatNavbarList />
      ) : (
        <span className="chat-navbar__message">Nie znaleziono wiadomości.</span>
      )}
    </div>
  );
};
