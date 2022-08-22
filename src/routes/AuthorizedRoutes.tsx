import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home/Home';
import { Profile } from 'pages/Profile/Profile';
import { Header } from 'components';
import { AvatarDropdown } from 'shared/fixtures/AvatarDropdown/AvatarDropdown';

export const AuthorizedRoutes = () => (
  <>
    <Header>
      <AvatarDropdown />
    </Header>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/profile/:id/*" element={<Profile />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </>
);
