import { ChatNavbarList } from 'pages/Chat/ChatNavbar/ChatNavbarList/ChatNavbarList';
import { Search } from 'components';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import { useParams } from 'react-router-dom';
import { useSearch } from 'shared/hooks/useSearch';
import { useGetLastMessages } from 'api/useGetLastMessages';
import classNames from 'classnames';
import './ChatNavbar.scss';

export const ChatNavbar = () => {
  const { id } = useParams();
  const { isLoading } = useGetLastMessages();
  const { value, changeValueHandler } = useSearch();

  return (
    <div className={classNames('chat-navbar', { 'chat-navbar--hide': id })}>
      <div className="chat-navbar__header">
        <h2>Czaty</h2>
        <Search
          value={value}
          onChange={changeValueHandler}
          placeholder="Znajdź użytkownika"
        />
      </div>
      <WithLoader isLoading={isLoading}>
        <ChatNavbarList searchTerm={value} />
      </WithLoader>
    </div>
  );
};
