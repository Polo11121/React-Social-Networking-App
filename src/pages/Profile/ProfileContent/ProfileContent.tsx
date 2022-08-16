import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfilePhotos } from 'pages/Profile/ProfilePhotos/ProfilePhotos';
import { ProfileInfo } from 'pages/Profile/ProfileInfo/ProfileInfo';
import { ProfilePosts } from 'pages/Profile/ProfilePosts/ProfilePosts';
import './ProfileContent.scss';

export const ProfileContent = () => (
  <div className="profile-content">
    <Routes>
      <Route
        path="posts"
        element={
          <>
            <ProfileInfo />
            <ProfilePosts />
          </>
        }
      />
      <Route path="photos" element={<ProfilePhotos />} />
      <Route path="*" element={<Navigate to="posts" replace />} />
    </Routes>
  </div>
);