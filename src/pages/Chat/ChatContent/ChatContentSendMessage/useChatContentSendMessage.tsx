import {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useState,
} from 'react';
import { useSearch } from 'shared/hooks/useSearch';
import { useAddMessage } from 'api/useAddMessage';
import { useParams } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import { v4 as uuid } from 'uuid';
import { useQueryClient } from 'react-query';
import { IEmojiData } from 'emoji-picker-react';
import { MessageType } from 'shared/types/responseTypes';
import { PhotosModalType } from 'shared/types/repeatableTypes';
import './ChatContentSendMessage.scss';

export const useChatContentSendMessage = ({
  setWrittenMessages,
  onShowPostPhotos,
}: {
  setWrittenMessages: Dispatch<SetStateAction<MessageType[]>>;
  onShowPostPhotos: ({ selectedPhoto, photos }: PhotosModalType) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [messagePhotos, setMessagePhotos] = useState<FileList | null>(null);
  const {
    value: messageText,
    onChange: onChangeMessageText,
    resetValue,
    setValue: setMessageText,
  } = useSearch();
  const { userInfo } = useAuthContext();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const onSuccess = () => queryClient.invalidateQueries(['messages', id]);

  const { mutate } = useAddMessage(onSuccess);

  const handleOpenEmojis = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmojis = () => {
    setAnchorEl(null);
  };

  const chooseEmoji = (
    event: MouseEvent<Element, globalThis.MouseEvent>,
    data: IEmojiData
  ) => {
    setMessageText((prevState) => `${prevState}${data.emoji}`);
  };

  const onMessageImageClick = () => {
    if (messagePhotos) {
      onShowPostPhotos({
        selectedPhoto: 0,
        photos: Array.from(messagePhotos).map((photo) => ({
          image: URL.createObjectURL(photo),
        })),
      });
    }
  };

  const changPhotoHandler = (photos: File | FileList | null) =>
    setMessagePhotos(photos as FileList);

  const sendMessageHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setWrittenMessages((prevState) => [
      {
        createdAt: new Date(),
        _id: uuid(),
        sender: {
          _id: userInfo._id,
          name: userInfo.name,
          surname: userInfo.surname,
          profileImage: userInfo.profileImage,
        },
        text: messageText,
        isImageLoading: Boolean(messagePhotos?.length),
        images: [],
      },
      ...prevState,
    ]);

    const formData = new FormData();

    if (messagePhotos?.length) {
      Array.from(messagePhotos).forEach((photo) =>
        formData.append('images', photo as Blob)
      );
    }
    formData.append('text', messageText);
    formData.append('receiver', id as string);
    formData.append('sender', userInfo._id);

    mutate(formData);
    resetValue();
    setMessagePhotos(null);
  };

  const isDisabled = !messageText.trim().length && !messagePhotos?.length;

  return {
    sendMessageHandler,
    handleOpenEmojis,
    changPhotoHandler,
    anchorEl,
    handleCloseEmojis,
    chooseEmoji,
    onChangeMessageText,
    messagePhotos,
    onMessageImageClick,
    isDisabled,
    messageText,
  };
};
