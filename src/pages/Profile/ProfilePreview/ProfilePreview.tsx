import { forwardRef } from 'react';
import { Button, EditHeader, ImagePicker, Tooltip } from 'components';
import { useProfilePreview } from 'pages/Profile/ProfilePreview/useProfilePreview';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { Avatar } from '@mui/material';
import { useMatch } from 'api/useMatch';
import { useNavigate } from 'react-router-dom';
import { getAge } from 'shared/functions';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import ChatIcon from '@mui/icons-material/Chat';
import './ProfilePreview.scss';

export const ProfilePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    profileImage,
    backgroundImage,
    resetImages,
    changeBackgroundImage,
    changeProfileImage,
    changeBackgroundImageHandler,
    changeProfileImageHandler,
    isLoading,
  } = useProfilePreview();
  const { user, isOwner, myStatus, userStatus } = useProfileInfo();
  const navigate = useNavigate();

  const goToChat = () => navigate(`/chat/${user._id}`);

  const { mutate } = useMatch(user._id);

  const requestMatch = () => mutate({ userId: user._id, status: 'request' });

  const rejectMatch = () => mutate({ userId: user._id, status: 'reject' });

  const isMatch =
    userStatus?.status === 'match' && myStatus?.status === 'match';

  const matchButton = () => {
    if (
      !myStatus ||
      myStatus?.status === 'reject' ||
      (myStatus?.status === 'none' && userStatus?.status === 'none')
    ) {
      return (
        <Button
          onClick={requestMatch}
          Icon={<FavoriteIcon />}
          text="Wyślij prośbę o dopasowanie"
          buttonStyleType="primary"
        />
      );
    }
    if (userStatus?.status === 'request') {
      return (
        <>
          <Button
            onClick={requestMatch}
            Icon={<FavoriteIcon />}
            text="Akceptuj prośbę"
            buttonStyleType="primary"
          />
          <Button
            onClick={rejectMatch}
            Icon={<HeartBrokenIcon />}
            text="Odrzuć prośbę"
            buttonStyleType="mandy"
          />
        </>
      );
    }
    if (isMatch) {
      return (
        <>
          <Button
            onClick={goToChat}
            Icon={<ChatIcon />}
            text="Czat"
            buttonStyleType="primary"
          />
          <Button
            onClick={rejectMatch}
            Icon={<HeartBrokenIcon />}
            text="Anuluj dopasowanie"
            buttonStyleType="mandy"
          />
        </>
      );
    }
    if (userStatus?.status === 'reject') {
      return null;
    }
    if (myStatus?.status === 'request') {
      return (
        <Button
          onClick={rejectMatch}
          Icon={<HeartBrokenIcon />}
          text="Anuluj prośbę"
          buttonStyleType="mandy"
        />
      );
    }
    return null;
  };

  return (
    <div className="profile-preview" ref={ref}>
      {(profileImage || backgroundImage) && (
        <EditHeader
          isDisabled={isLoading}
          text={`Edycja ${
            backgroundImage ? 'zdjęcie w tle' : 'zdjęcia profilowego'
          }`}
          onClose={resetImages}
          onSubmit={
            backgroundImage
              ? changeBackgroundImageHandler
              : changeProfileImageHandler
          }
        />
      )}
      <div className="profile-preview__content">
        <div className="profile-preview__background-container">
          {(user.backgroundImage || backgroundImage) && (
            <img
              className="profile-preview__background-image"
              src={
                backgroundImage
                  ? URL.createObjectURL(backgroundImage)
                  : user.backgroundImage
              }
              alt="background"
            />
          )}
          <div className="profile-preview__background-button">
            {isOwner && (
              <ImagePicker
                text={`${
                  user.backgroundImage ? 'Edytuj' : 'Dodaj'
                } zdjęcie w tle`}
                handleFile={changeBackgroundImage}
              />
            )}
          </div>
        </div>
        <div className="profile-preview__info">
          <div className="profile-preview__user">
            {isOwner && (
              <div className="profile-preview__photo-button">
                <ImagePicker
                  tooltipText="Zmień zdjęcie profilowe"
                  handleFile={changeProfileImage}
                />
              </div>
            )}
            <Avatar
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : user.profileImage
              }
              className="profile-preview__avatar"
            />
            <div className="profile-preview__user-info">
              <h1>
                {user.fullName}
                {isMatch && (
                  <FavoriteIcon
                    className="profile-preview__match"
                    data-for="match"
                    data-tip
                  />
                )}
                <Tooltip
                  backgroundColor="#e8495f"
                  text="Dopasowano"
                  id="match"
                />
              </h1>
              <h2>Wiek: {getAge(user.birthDate)}</h2>
            </div>
          </div>
          {isOwner ? (
            <Button
              Icon={<EditIcon />}
              text="Edytuj Profil"
              buttonStyleType="primary"
            />
          ) : (
            <div className="profile-preview__buttons">{matchButton()}</div>
          )}
        </div>
      </div>
    </div>
  );
});
