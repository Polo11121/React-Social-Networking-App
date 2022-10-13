import { useState } from 'react';

const postPhotosInitialState = {
  selectedPhoto: null,
  photos: [],
};
const editedPostInitialState = {
  postId: null,
  photos: [],
  text: '',
};

export const usePostList = () => {
  const [deletedPost, setDeletedPost] = useState<null | string>(null);
  const [postPhotos, setPostPhotos] = useState<{
    selectedPhoto: null | number;
    photos: { image: string; label: string }[];
  }>(postPhotosInitialState);
  const [editedPost, setEditedPost] = useState<{
    postId: null | string;
    photos: string[];
    text: string;
  }>(editedPostInitialState);

  const openPhotosModalHandler = (
    selectedPhoto: null | number,
    photos: { image: string; label: string }[]
  ) => setPostPhotos({ selectedPhoto, photos });

  const closePhotosModalHandler = () => setPostPhotos(postPhotosInitialState);

  const openDeletePostModalHandler = (postId: string) => setDeletedPost(postId);

  const closeDeletePostModalHandler = () => setDeletedPost(null);

  const openEditPostModalHandler = (
    postId: string,
    photos: string[],
    text: string
  ) => setEditedPost({ postId, photos, text });

  const closeEditPostModalHandler = () => setEditedPost(editedPostInitialState);

  return {
    deletedPost,
    postPhotos,
    editedPost,
    openPhotosModalHandler,
    closePhotosModalHandler,
    openDeletePostModalHandler,
    closeDeletePostModalHandler,
    openEditPostModalHandler,
    closeEditPostModalHandler,
  };
};
