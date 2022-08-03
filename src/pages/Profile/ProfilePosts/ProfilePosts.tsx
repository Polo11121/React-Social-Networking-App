import { AddPost } from 'pages/Profile/ProfilePosts/AddPost/AddPost';
import { PostList } from 'pages/Profile/ProfilePosts/PostList/PostList';

export const ProfilePosts = () => (
  <div style={{ flex: 0.6 }}>
    <AddPost />
    <PostList />
  </div>
);
