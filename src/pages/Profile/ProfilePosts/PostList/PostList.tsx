import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { PhotosModal } from 'shared/fixtures/PhotosModal/PhotosModal';
import { DeleteModal } from 'pages/Profile/ProfilePosts/PostList/DeleteModal/DeleteModal';
import { Post } from 'pages/Profile/ProfilePosts/PostList/Post/Post';
import { EditModal } from 'pages/Profile/ProfilePosts/PostList/EditModal/EditModal';
import { usePostList } from 'pages/Profile/ProfilePosts/PostList/usePostList';
import { useMockInfinityData } from 'shared/hooks/useMockInfinityData';
import { BouncingDotsLoader, SectionCard } from 'components';
import InfiniteScroll from 'react-infinite-scroll-component';

export const PostList = () => {
  const { user } = useProfileInfo();
  const {
    deletedPost,
    postPhotos,
    editedPost,
    openPhotosModalHandler,
    closePhotosModalHandler,
    openDeletePostModalHandler,
    closeDeletePostModalHandler,
    openEditPostModalHandler,
    closeEditPostModalHandler,
  } = usePostList();

  const { entities, onNext, hasMore } = useMockInfinityData({
    fetchedEntities: user.posts,
    offset: 3,
  });

  return (
    <div>
      <SectionCard sectionTitle="Posty" />
      <InfiniteScroll
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '1rem',
          gap: '1rem',
        }}
        dataLength={entities.length}
        next={onNext}
        hasMore={hasMore}
        loader={<BouncingDotsLoader testId="posts-" />}
      >
        {entities.map(({ description, createdAt, _id, images, type }) => (
          <Post
            isPost={type === 'post'}
            onShowPostPhotos={openPhotosModalHandler}
            avatar={user.profileImage}
            date={createdAt}
            images={images}
            text={description}
            user={user.fullName}
            key={_id}
            id={_id}
            onDeletePost={openDeletePostModalHandler}
            onEditPost={openEditPostModalHandler}
          />
        ))}
      </InfiniteScroll>
      {postPhotos.selectedPhoto !== null && (
        <PhotosModal {...postPhotos} onClose={closePhotosModalHandler} />
      )}
      {deletedPost && (
        <DeleteModal
          deletedPost={deletedPost}
          onClose={closeDeletePostModalHandler}
        />
      )}
      {editedPost.postId && (
        <EditModal {...editedPost} onClose={closeEditPostModalHandler} />
      )}
    </div>
  );
};
