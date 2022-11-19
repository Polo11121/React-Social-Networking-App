import { useState } from 'react';
import { useUpdateUser } from 'api/useUpdateUser';
import { useNavigate } from 'react-router-dom';

export const useProfilePreview = () => {
  const [images, setImages] = useState<{
    backgroundImage: null | File;
    profileImage: null | File;
  }>({
    backgroundImage: null,
    profileImage: null,
  });

  const navigate = useNavigate();

  const navigateToEditProfileHandler = () =>
    navigate('details/contact-and-basic-info');

  const chooseBackgroundImageHandler = (file: File | FileList | null) =>
    setImages({ profileImage: null, backgroundImage: file as File });

  const chooseProfileImageHandler = (file: File | FileList | null) =>
    setImages({ backgroundImage: null, profileImage: file as File });

  const resetImagesHandler = () =>
    setImages({ backgroundImage: null, profileImage: null });

  const { mutate, isLoading } = useUpdateUser({
    afterUpdate: resetImagesHandler,
    toastText: `Pomyślnie zaktualizowano zdjęcie ${
      images.profileImage ? 'profilowe' : 'w tle'
    }`,
  });

  const changeProfileImageHandler = () => {
    const formData = new FormData();
    formData.append('profileImage', images.profileImage as Blob);
    mutate(formData);
  };

  const changeBackgroundImageHandler = () => {
    const formData = new FormData();
    formData.append('backgroundImage', images.backgroundImage as Blob);
    mutate(formData);
  };

  return {
    ...images,
    chooseBackgroundImageHandler,
    chooseProfileImageHandler,
    resetImagesHandler,
    changeProfileImageHandler,
    changeBackgroundImageHandler,
    isLoading,
    navigateToEditProfileHandler,
  };
};
