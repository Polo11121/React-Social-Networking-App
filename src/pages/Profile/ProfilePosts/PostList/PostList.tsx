import { useState } from 'react';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { sortByDate } from 'shared/functions';
import { PhotosModal } from 'shared/fixtures/PhotosModal/PhotosModal';
import { DeleteModal } from 'pages/Profile/ProfilePosts/PostList/DeleteModal/DeleteModal';
import { Post } from 'pages/Profile/ProfilePosts/PostList/Post/Post';

export const PostList = () => {
  const { user } = useProfileInfo();
  const [deletedPost, setDeletedPost] = useState<null | string>(null);
  const [postPhotosModal, setPostPhotosModal] = useState<{
    selectedPhoto: null | number;
    photos: string[];
  }>({
    selectedPhoto: null,
    photos: [],
  });

  const onShowPostPhotos = (selectedPhoto: null | number, photos: string[]) =>
    setPostPhotosModal({ selectedPhoto, photos });

  const onPhotosModalClose = () =>
    setPostPhotosModal({ selectedPhoto: null, photos: [] });

  const onDeleteModalClose = () => setDeletedPost(null);

  const onDeletePost = (postId: string) => setDeletedPost(postId);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1rem',
        gap: '1rem',
      }}
    >
      {user?.posts
        ?.sort((post1, post2) => sortByDate(post1.createdAt, post2.createdAt))
        .map(({ description, createdAt, _id, images }) => (
          <Post
            onShowPostPhotos={onShowPostPhotos}
            avatar={user.profileImage}
            date={createdAt}
            images={images}
            text={description}
            user={`${user.name} ${user.surname}`}
            key={_id}
            id={_id}
            onDeletePost={onDeletePost}
          />
        ))}
      <PhotosModal
        onClose={onPhotosModalClose}
        selectedPhoto={postPhotosModal.selectedPhoto}
        photos={postPhotosModal.photos}
      />
      <DeleteModal deletedPost={deletedPost} onClose={onDeleteModalClose} />
    </div>
  );
};
