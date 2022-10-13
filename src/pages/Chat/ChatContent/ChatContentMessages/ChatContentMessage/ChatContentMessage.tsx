import { ImageCarousel, Spinner } from 'components';
import { PhotosModalType } from 'shared/types/repeatableTypes';
import { Avatar } from '@mui/material';
import classNames from 'classnames';
import './ChatContentMessage.scss';

type ChatContentMessagePropsType = {
  fullName: string;
  avatar: string;
  message: string;
  timestamp: string;
  isOwner: boolean;
  images: string[];
  onShowPostPhotos: ({ selectedPhoto, photos }: PhotosModalType) => void;
  isImageLoading?: boolean;
};

export const ChatContentMessage = ({
  fullName,
  avatar,
  message,
  timestamp,
  isOwner,
  images,
  isImageLoading,
  onShowPostPhotos,
}: ChatContentMessagePropsType) => {
  const messageImageClickHandler = (index: number) =>
    onShowPostPhotos({
      selectedPhoto: index,
      photos: images.map((image) => ({
        image,
        label: `${message} ${timestamp}`,
      })),
    });

  return (
    <div
      className={classNames('chat-content-message', {
        'chat-content-message--owner': isOwner,
      })}
    >
      {!isOwner && (
        <div className="chat-content-message__user">
          <Avatar className="chat-content-message__user-photo" src={avatar} />
          <span>{fullName}</span>
        </div>
      )}
      <div
        className={classNames('chat-content-message__content', {
          'chat-content-message__content--owner': isOwner,
          'chat-content-message__content--withImages': Boolean(images.length),
        })}
      >
        <span className="chat-content-message__text">{message}</span>
        {isImageLoading && <Spinner customColor="#fff" />}
        {Boolean(images.length) && (
          <ImageCarousel onClick={messageImageClickHandler} images={images} />
        )}
        <span
          className={classNames('chat-content-message__timestamp', {
            'chat-content-message__timestamp--withImages': Boolean(
              images.length
            ),
          })}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
};
