import { forwardRef } from 'react';
import { Button, ImagePicker, Tooltip } from 'components';
import { ProfilePreviewEditHeader } from 'pages/Profile/ProfilePreview/ProfilePreviewEditHeader/ProfilePreviewEditHeader';
import { useProfilePreview } from 'pages/Profile/ProfilePreview/useProfilePreview';
import { useMatchFunctionality } from 'shared/features/useMatchFunctionality/useMatchFunctionality';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { NavLink, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { getAge } from 'shared/functions';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ProfilePreview.scss';

export const ProfilePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const path = useLocation().pathname.split('/')[1];
  const {
    profileImage,
    backgroundImage,
    resetImagesHandler,
    chooseBackgroundImageHandler,
    chooseProfileImageHandler,
    changeBackgroundImageHandler,
    changeProfileImageHandler,
    navigateToEditProfileHandler,
    isLoading,
  } = useProfilePreview();
  const { user, isOwner, myStatus, userStatus } = useProfileInfo();

  const { isMatch, matchButtons } = useMatchFunctionality({
    userId: user._id,
    myStatus,
    userStatus,
  });

  return (
    <div
      className="profile-preview"
      ref={ref}
      data-testid={`user-${user.name}-${user.surname}-profile`}
    >
      {(profileImage || backgroundImage) && (
        <ProfilePreviewEditHeader
          isDisabled={isLoading}
          text={`Edycja ${
            backgroundImage ? 'zdjęcie w tle' : 'zdjęcia profilowego'
          }`}
          onClose={resetImagesHandler}
          onSubmit={
            backgroundImage
              ? changeBackgroundImageHandler
              : changeProfileImageHandler
          }
        />
      )}
      <div className="profile-preview__content">
        <div className="profile-preview__background-container">
          {path === 'suggestions' && (
            <NavLink className="profile-preview__back-button" to="/suggestions">
              <ArrowBackIcon style={{ fontSize: '3.125rem' }} />
            </NavLink>
          )}
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
                image={backgroundImage}
                testId="add-background-photo"
                text={`${
                  user.backgroundImage ? 'Edytuj' : 'Dodaj'
                } zdjęcie w tle`}
                onChooseFile={chooseBackgroundImageHandler}
              />
            )}
          </div>
        </div>
        <div className="profile-preview__info">
          <div className="profile-preview__user">
            {isOwner && (
              <div className="profile-preview__photo-button">
                <ImagePicker
                  image={profileImage}
                  testId="add-profile-photo"
                  tooltipText="Zmień zdjęcie profilowe"
                  onChooseFile={chooseProfileImageHandler}
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
                  text="Dopasowanie"
                  id="match"
                />
              </h1>
              <h2>Wiek: {getAge(user.birthDate)}</h2>
            </div>
          </div>
          {isOwner ? (
            <Button
              Icon={<EditIcon />}
              onClick={navigateToEditProfileHandler}
              text="Edytuj Profil"
              buttonStyleType="primary"
            />
          ) : (
            <div className="profile-preview__buttons">{matchButtons()}</div>
          )}
        </div>
      </div>
    </div>
  );
});
