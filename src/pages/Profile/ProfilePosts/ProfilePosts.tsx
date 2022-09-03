import { AddPost } from 'pages/Profile/ProfilePosts/AddPost/AddPost';
import { PostList } from 'pages/Profile/ProfilePosts/PostList/PostList';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';

export const ProfilePosts = () => {
  const { isOwner } = useProfileInfo();

  return (
    <div style={{ flex: 0.6 }}>
      {isOwner && <AddPost />}
      <PostList />
    </div>
  );
};
