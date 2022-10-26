import { Route, Routes } from 'react-router-dom';
import { ProfileDetailsNavigation } from 'pages/Profile/ProfileDetails/ProfileDetailsNavigation/ProfileDetailsNavigation';
import { profileDetailsRoutes } from 'routes/routes';
import { SectionCard } from 'components';
import './ProfileDetails.scss';

export const ProfileDetails = () => (
  <SectionCard noPadding>
    <div className="profile-details">
      <ProfileDetailsNavigation />
      <div className="profile-details__container">
        <Routes>
          {profileDetailsRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}
        </Routes>
      </div>
    </div>
  </SectionCard>
);
