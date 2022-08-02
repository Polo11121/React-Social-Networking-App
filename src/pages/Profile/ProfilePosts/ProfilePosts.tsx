import { AddPost } from 'pages/Profile/ProfilePosts/AddPost/AddPost';
import { PostList } from 'pages/Profile/ProfilePosts/PostList/PostList';
import './ProfilePosts.scss';

export const ProfilePosts = () => (
  <div className="profile-posts">
    <AddPost />
    <PostList />
  </div>
);
