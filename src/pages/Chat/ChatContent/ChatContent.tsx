import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChatContentHeader } from 'pages/Chat/ChatContent/ChatContentHeader/ChatContentHeader';
import { ChatContentSendMessage } from 'pages/Chat/ChatContent/ChatContentSendMessage/ChatContentSendMessage';
import { ChatContentMessages } from 'pages/Chat/ChatContent/ChatContentMessages/ChatContentMessages';
import { useGetMessages } from 'api/useGetMessages';
import { PhotosModal } from 'shared/fixtures/PhotosModal/PhotosModal';
import { PhotosModalType } from 'shared/types/repeatableTypes';
import { useGetLastMessages } from 'api/useGetLastMessages';
import { getFullName } from 'shared/functions';
import { WithLoader } from 'shared/fixtures/WithLoader/WithLoader';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import classNames from 'classnames';
import './ChatContent.scss';

const messagePhotosInitialState = {
  selectedPhoto: null,
  photos: [],
};

export const ChatContent = () => {
  const { id } = useParams();
  const { data: messages, isFetching } = useGetMessages(id || null);
  const { currentChatUser, isLoading: isUserLoading } = useGetLastMessages(id);
  const [writtenMessages, setWrittenMessages] = useState(messages);
  const [messagePhotos, setMessagePhotos] = useState<PhotosModalType>(
    messagePhotosInitialState
  );

  const openPhotosModalHandler = ({ selectedPhoto, photos }: PhotosModalType) =>
    setMessagePhotos({ selectedPhoto, photos });

  const closePhotosModalHandler = () => {
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
              fullName={getFullName(
                currentChatUser?.name,
                currentChatUser?.surname
              )}
              userId={id}
            />
            <ChatContentMessages
              onShowPostPhotos={openPhotosModalHandler}
              messages={writtenMessages}
            />
            <ChatContentSendMessage
              onShowPostPhotos={openPhotosModalHandler}
              setWrittenMessages={setWrittenMessages}
            />
          </>
        </WithLoader>
      ) : (
        <div className="chat-content__message">
          <ChatOutlinedIcon style={{ fontSize: '8rem' }} />
          <h2>Wybierz czat lub rozpocznij nową konwersację.</h2>
        </div>
      )}
      {messagePhotos.selectedPhoto !== null && (
        <PhotosModal {...messagePhotos} onClose={closePhotosModalHandler} />
      )}
    </div>
  );
};
