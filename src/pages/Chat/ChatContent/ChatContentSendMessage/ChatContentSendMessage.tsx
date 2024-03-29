import { Dispatch, SetStateAction } from 'react';
import { PhotosModalType } from 'shared/types/repeatableTypes';
import { IconButton, Menu } from '@mui/material';
import { ImagePicker, Search, Tooltip } from 'components';
import { MessageType } from 'shared/types/responseTypes';
import { PicturesIcon } from 'pages/Chat/ChatContent/ChatContentSendMessage/PicturesIcon';
import { useChatContentSendMessage } from 'pages/Chat/ChatContent/ChatContentSendMessage/useChatContentSendMessage';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import classNames from 'classnames';
import './ChatContentSendMessage.scss';

export const ChatContentSendMessage = ({
  setWrittenMessages,
  onShowPostPhotos,
}: {
  setWrittenMessages: Dispatch<SetStateAction<MessageType[]>>;
  onShowPostPhotos: ({ selectedPhoto, photos }: PhotosModalType) => void;
}) => {
  const {
    sendMessageHandler,
    openEmojisMenuHandler,
    changPhotoHandler,
    anchorEl,
    closeEmojisMenuHandler,
    chooseEmojiHandler,
    messageText,
    onChangeMessageText,
    messagePhotos,
    messageImageClickHandler,
    isDisabled,
  } = useChatContentSendMessage({
    setWrittenMessages,
    onShowPostPhotos,
  });

  return (
    <form onSubmit={sendMessageHandler} className="chat-content-send-message">
      <Tooltip type="dark" text="Dodaj emoji" id="messages-emoji" />
      <IconButton
        className="chat-content-send-message__icon"
        onClick={openEmojisMenuHandler}
        data-for="messages-emoji"
        data-tip
      >
        <EmojiEmotionsIcon />
      </IconButton>
      <ImagePicker
        tooltipText="Dodaj zdjęcia"
        onChooseFile={changPhotoHandler}
        isMultiple
        testId="add-message-photo"
      />
      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeEmojisMenuHandler}
      >
        <Picker onEmojiClick={chooseEmojiHandler} />
      </Menu>
      <Search
        value={messageText}
        onChange={onChangeMessageText}
        hideIcon
        placeholder="Aa"
        testId="chat-send-message-input"
      >
        {messagePhotos && (
          <>
            <Tooltip
              type="dark"
              text="Załączone zdjęcia"
              id="messages-photos"
            />
            <IconButton
              className="chat-content-send-message__icon"
              onClick={messageImageClickHandler}
              data-for="messages-photos"
              data-tip
            >
              <PicturesIcon numberOf={messagePhotos.length} />
            </IconButton>
          </>
        )}
      </Search>
      <IconButton
        type="submit"
        disabled={isDisabled}
        data-testid="chat-send-message-button"
      >
        <SendIcon
          className={classNames({
            'chat-content-send-message--active': !isDisabled,
          })}
        />
      </IconButton>
    </form>
  );
};
