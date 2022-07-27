import { UserType } from 'shared/types/responseTypes';
import { Button, EditHeader, ImagePicker } from 'components';
import { useProfilePreview } from 'pages/Profile/ProfilePreview/useProfilePreview';
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import './ProfilePreview.scss';

export const ProfilePreview = ({ user }: { user: UserType }) => {
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

  return (
    <div className="profile-preview">
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
            <ImagePicker
              text="Dodaj zdjęcie w tle"
              handleFile={changeBackgroundImage}
            />
          </div>
        </div>
        <div className="profile-preview__info">
          <div className="profile-preview__photo-button">
            <ImagePicker
              tooltipText="Zmień zdjęcie profilowe"
              handleFile={changeProfileImage}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <Avatar
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : user.profileImage
              }
              className="profile-preview__avatar"
            />
            <div className="profile-preview__user-info">
              <h1>{`${user.name} ${user.surname}`}</h1>
              <h2>Wiek: 19</h2>
            </div>
          </div>
          <Button
            Icon={<EditIcon />}
            text="Edytuj Profil"
            buttonStyleType="primary"
          />
        </div>
      </div>
    </div>
  );
};
