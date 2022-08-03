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
    photos: string[];
  }>(postPhotosInitialState);
  const [editedPost, setEditedPost] = useState<{
    postId: null | string;
    photos: string[];
    text: string;
  }>(editedPostInitialState);

  const onOpenPhotosModal = (selectedPhoto: null | number, photos: string[]) =>
    setPostPhotos({ selectedPhoto, photos });

  const onClosePhotosModal = () => setPostPhotos(postPhotosInitialState);

  const onOpenDeletePostModal = (postId: string) => setDeletedPost(postId);

  const onCloseDeletePostModal = () => setDeletedPost(null);

  const onOpenEditPostModal = (
    postId: string,
    photos: string[],
    text: string
  ) => setEditedPost({ postId, photos, text });

  const onCloseEditPostModal = () => setEditedPost(editedPostInitialState);

  return {
    deletedPost,
    postPhotos,
    editedPost,
    onOpenPhotosModal,
    onClosePhotosModal,
    onOpenDeletePostModal,
    onCloseDeletePostModal,
    onOpenEditPostModal,
    onCloseEditPostModal,
  };
};
