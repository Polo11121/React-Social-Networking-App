import { SectionCard } from 'components';
import { ProfileDetails } from 'pages/Profile/ProfileInfo/AboutMe/ProfileDetails/ProfileDetails';
import { ProfileHobbies } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/ProfileHobbies';
import { ProfileDescription } from 'pages/Profile/ProfileInfo/AboutMe/ProfileDescription/ProfileDescription';
import './AboutMe.scss';

export const AboutMe = () => (
  <SectionCard sectionTitle="O mnie">
    <div className="about-me">
      <ProfileDescription />
      <ProfileDetails />
      <ProfileHobbies />
    </div>
  </SectionCard>
);
