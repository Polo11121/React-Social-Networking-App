import { useParams } from 'react-router-dom';
import { ChatNavbarListItem } from 'pages/Chat/ChatNavbar/ChatNavbarList/ChatNavbarListItem/ChatNavbarListItem';
import { useGetLastMessages } from 'api/useGetLastMessages';
import { getFullName } from 'shared/functions';
import { useAuthContext } from 'contexts/AuthContext';
import './ChatNavbarList.scss';

export const ChatNavbarList = ({ searchTerm }: { searchTerm: string }) => {
  const { userInfo } = useAuthContext();
  const { data } = useGetLastMessages();
  const { id } = useParams();

  const filteredData = data.filter(({ match: { name, surname } }) =>
    getFullName(name, surname).toUpperCase().includes(searchTerm.toUpperCase())
  );

  return (
    <div className="chat-navbar-list">
      {filteredData.length ? (
        filteredData.map(
          ({
            _id: matchId,
            match: { _id, profileImage, name, surname },
            lastMessage,
          }) => (
            <ChatNavbarListItem
              key={matchId}
              isActive={id === _id}
              userId={_id}
              avatar={profileImage}
              fullName={getFullName(name, surname)}
              lastMessage={
                lastMessage &&
                `${
                  lastMessage?.sender?._id === userInfo._id
                    ? 'Ty'
                    : lastMessage?.sender?.name
                }: ${lastMessage?.text}`
              }
              newMessage={
                lastMessage?.sender?._id !== userInfo._id &&
                !lastMessage?.receiverRead
              }
            />
          )
        )
      ) : (
        <span className="chat-navbar-list__message">
          Nie znaleziono wiadomości.
        </span>
      )}
    </div>
  );
};
