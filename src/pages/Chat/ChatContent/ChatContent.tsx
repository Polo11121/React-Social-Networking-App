import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChatContentHeader } from 'pages/Chat/ChatContent/ChatContentHeader/ChatContentHeader';
import { ChatContentSendMessage } from 'pages/Chat/ChatContent/ChatContentSendMessage/ChatContentSendMessage';
import { ChatContentMessages } from 'pages/Chat/ChatContent/ChatContentMessages/ChatContentMessages';
import { useGetMessages } from 'api/userGetMessages';
import { PhotosModal } from 'shared/fixtures/PhotosModal/PhotosModal';
import { PhotosModalType } from 'shared/types/repeatableTypes';
import { useGetLastMessages } from 'api/useGetLastMessages';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import classNames from 'classnames';
import './ChatContent.scss';

const messagePhotosInitialState = {
  selectedPhoto: null,
  photos: [],
};

export const ChatContent = () => {
  const { id } = useParams();
  const { currentChatUser, isLoading: isUserLoading } = useGetLastMessages(id);
  const {
    data: messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetMessages(id || null);
  const [writtenMessages, setWrittenMessages] = useState(messages);
  const [messagePhotos, setMessagePhotos] = useState<PhotosModalType>(
    messagePhotosInitialState
  );

  const onOpenPhotosModal = ({ selectedPhoto, photos }: PhotosModalType) =>
    setMessagePhotos({ selectedPhoto, photos });

  const onClosePhotosModal = () => {
    setMessagePhotos(messagePhotosInitialState);
  };
  useEffect(() => {
    if (!isFetching) {
      setWrittenMessages(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <div
      className={classNames('chat-content', { 'chat-content--hidden': !id })}
    >
      {id ? (
        <WithLoader isLoading={isUserLoading}>
          <>
            <ChatContentHeader
              avatar={currentChatUser?.profileImage}
              fullName={`${currentChatUser?.name} ${currentChatUser?.surname}`}
              userId={id}
            />
            <ChatContentMessages
              onNext={fetchNextPage}
              hasMore={Boolean(hasNextPage)}
              onShowPostPhotos={onOpenPhotosModal}
              isLoading={isLoading}
              messages={writtenMessages}
            />
            <ChatContentSendMessage
              onShowPostPhotos={onOpenPhotosModal}
              setWrittenMessages={setWrittenMessages}
            />
          </>
        </WithLoader>
      ) : (
        <h2 className="chat-content__message">
          Wybierz czat lub rozpocznij nową konwersację
        </h2>
      )}
      {messagePhotos.selectedPhoto !== null && (
        <PhotosModal {...messagePhotos} onClose={onClosePhotosModal} />
      )}
    </div>
  );
};
