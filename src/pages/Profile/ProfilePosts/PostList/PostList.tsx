import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { PhotosModal } from 'shared/fixtures/PhotosModal/PhotosModal';
import { DeleteModal } from 'pages/Profile/ProfilePosts/PostList/DeleteModal/DeleteModal';
import { Post } from 'pages/Profile/ProfilePosts/PostList/Post/Post';
import { EditModal } from 'pages/Profile/ProfilePosts/PostList/EditModal/EditModal';
import { usePostList } from 'pages/Profile/ProfilePosts/PostList/usePostList';
import { useMockInfinityData } from 'shared/hooks/useMockInfinityData';
import { BouncingDotsLoader } from 'components';
import InfiniteScroll from 'react-infinite-scroll-component';

export const PostList = () => {
  const { user } = useProfileInfo();
  const {
    deletedPost,
    postPhotos,
    editedPost,
    onOpenPhotosModal,
    onClosePhotosModal,
    onOpenDeletePostModal,
    onCloseDeletePostModal,
    onOpenEditPostModal,
    onCloseEditPostModal,
  } = usePostList();

  const { entities, onNext, hasMore } = useMockInfinityData({
    fetchedEntities: user.posts,
    offset: 3,
  });

  return (
    <div>
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
            onShowPostPhotos={onOpenPhotosModal}
            avatar={user.profileImage}
            date={createdAt}
            images={images}
            text={description}
            user={`${user.name} ${user.surname}`}
            key={_id}
            id={_id}
            onDeletePost={onOpenDeletePostModal}
            onEditPost={onOpenEditPostModal}
          />
        ))}
      </InfiniteScroll>
      {postPhotos.selectedPhoto !== null && (
        <PhotosModal {...postPhotos} onClose={onClosePhotosModal} />
      )}
      {deletedPost && (
        <DeleteModal
          deletedPost={deletedPost}
          onClose={onCloseDeletePostModal}
        />
      )}
      {editedPost.postId && (
        <EditModal {...editedPost} onClose={onCloseEditPostModal} />
      )}
    </div>
  );
};
