import { ChatContentMessage } from 'pages/Chat/ChatContent/ChatContentMessages/ChatContentMessage/ChatContentMessage';
import { BouncingDotsLoader } from 'components';
import { useAuthContext } from 'contexts/AuthContext';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import { formatPostDate } from 'shared/functions';
import { MessageType } from 'shared/types/responseTypes';
import { PhotosModalType } from 'shared/types/repeatableTypes';
import InfiniteScroll from 'react-infinite-scroll-component';
import './ChatContentMessages.scss';

type ChatContentMessagesProps = {
  isLoading: boolean;
  messages: MessageType[];
  onShowPostPhotos: ({ selectedPhoto, photos }: PhotosModalType) => void;
  onNext: () => void;
  hasMore: boolean;
};
export const ChatContentMessages = ({
  messages,
  isLoading,
  onShowPostPhotos,
  onNext,
  hasMore,
}: ChatContentMessagesProps) => {
  const { userInfo } = useAuthContext();

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
          next={onNext}
          hasMore={hasMore}
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
                timestamp={formatPostDate(createdAt)}
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
