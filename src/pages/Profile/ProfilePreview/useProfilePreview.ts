import { useState } from 'react';
import { useUpdateMe } from 'api/useUpdateMe';

export const useProfilePreview = () => {
  const [images, setImages] = useState<{
    backgroundImage: null | File;
    profileImage: null | File;
  }>({
    backgroundImage: null,
    profileImage: null,
  });

  const changeBackgroundImage = (file: File | null) =>
    setImages({ profileImage: null, backgroundImage: file });

  const changeProfileImage = (file: File | null) =>
    setImages({ backgroundImage: null, profileImage: file });

  const resetImages = () =>
    setImages({ backgroundImage: null, profileImage: null });

  const { mutate, isLoading } = useUpdateMe(resetImages);

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
    changeBackgroundImage,
    changeProfileImage,
    resetImages,
    changeProfileImageHandler,
    changeBackgroundImageHandler,
    isLoading,
  };
};
