import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home/Home';
import { Profile } from 'pages/Profile/Profile';
import { Header } from 'components';
import { AvatarDropdown } from 'shared/fixtures/AvatarDropdown/AvatarDropdown';
import { HeaderNavigation } from 'shared/fixtures/HeaderNavigation/HeaderNavigation';

export const AuthorizedRoutes = () => (
  <>
    <Header>
      <HeaderNavigation />
      <AvatarDropdown />
    </Header>
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="profile/:id/*" element={<Profile />} />
    </Routes>
  </>
);
