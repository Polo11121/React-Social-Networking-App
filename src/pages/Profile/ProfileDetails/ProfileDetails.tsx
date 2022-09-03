import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfileDetailsNavigation } from 'pages/Profile/ProfileDetails/ProfileDetailsNavigation/ProfileDetailsNavigation';
import { ProfileDetailsOverview } from 'pages/Profile/ProfileDetails/ProfileDetailsOverview/ProfileDetailsOverview';
import { ProfileWorkAndEducation } from 'pages/Profile/ProfileDetails/ProfileWorkAndEducation/ProfileWorkAndEducation';
import { ProfileDetailsPlaces } from 'pages/Profile/ProfileDetails/ProfileDetailsPlaces/ProfileDetailsPlaces';
import { ProfileDetailsContactAndBasicInfo } from 'pages/Profile/ProfileDetails/ProfileDetailsContactAndBasicInfo/ProfileDetailsContactAndBasicInfo';
import { ProfileDetailsChangePassword } from 'pages/Profile/ProfileDetails/ProfileDetailsChangePassword/ProfileDetailsChangePassword';
import { SectionCard } from 'components';
import './ProfileDetails.scss';

export const ProfileDetails = () => (
  <SectionCard noPadding>
    <div className="profile-details">
      <ProfileDetailsNavigation />
      <div className="profile-details__container">
        <Routes>
          <Route path="overview" element={<ProfileDetailsOverview />} />
          <Route
            path="work-and-education"
            element={<ProfileWorkAndEducation />}
          />
          <Route path="places" element={<ProfileDetailsPlaces />} />
          <Route
            path="contact-and-basic-info"
            element={<ProfileDetailsContactAndBasicInfo />}
          />
          <Route
            path="change-password"
            element={<ProfileDetailsChangePassword />}
          />
          <Route path="*" element={<Navigate to="overview" replace />} />
        </Routes>
      </div>
    </div>
  </SectionCard>
);
