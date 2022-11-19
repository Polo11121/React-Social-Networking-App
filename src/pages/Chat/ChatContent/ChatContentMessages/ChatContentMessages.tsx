import { ChatContentMessage } from 'pages/Chat/ChatContent/ChatContentMessages/ChatContentMessage/ChatContentMessage';
import { BouncingDotsLoader } from 'components';
import { useAuthContext } from 'contexts/AuthContext';
import { WithLoader } from 'shared/features/WithLoader/WithLoader';
import { formatDate } from 'shared/functions';
import { MessageType } from 'shared/types/responseTypes';
import { PhotosModalType } from 'shared/types/repeatableTypes';
import { useGetMessages } from 'api/useGetMessages';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './ChatContentMessages.scss';

type ChatContentMessagesPropsType = {
  messages: MessageType[];
  onShowPostPhotos: ({ selectedPhoto, photos }: PhotosModalType) => void;
};

export const ChatContentMessages = ({
  messages,
  onShowPostPhotos,
}: ChatContentMessagesPropsType) => {
  const { id } = useParams();
  const { userInfo } = useAuthContext();
  const { fetchNextPage, hasNextPage, isLoading } = useGetMessages(id || null);

  return (
    <div id="scrollableDiv" className="chat-content-messages">
      <WithLoader isLoading={isLoading}>
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '1rem',
          }}
          dataLength={messages.length}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
          inverse
          loader={<BouncingDotsLoader testId="messages-" />}
        >
          {messages.map(
            ({
              _id: messageId,
              text,
              sender: { name, surname, _id, profileImage },
              createdAt,
              images,
              isImageLoading,
            }) => (
              <ChatContentMessage
                onShowPostPhotos={onShowPostPhotos}
                images={images}
                key={messageId}
                isImageLoading={isImageLoading}
                fullName={`${name} ${surname}`}
                message={text}
                timestamp={formatDate(createdAt)}
                avatar={profileImage}
                isOwner={userInfo._id === _id}
              />
            )
          )}
        </InfiniteScroll>
      </WithLoader>
    </div>
  );
};
