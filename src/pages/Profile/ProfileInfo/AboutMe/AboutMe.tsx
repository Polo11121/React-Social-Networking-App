import { SectionCard, Button } from 'components';
import { ProfileDescription } from 'pages/Profile/ProfileInfo/AboutMe/ProfileDescription/ProfileDescription';
import { ProfileHobbies } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/ProfileHobbies';
import './AboutMe.scss';

export const AboutMe = () => (
  <SectionCard sectionTitle="O mnie">
    <div className="about-me">
      <ProfileDescription />
      <Button buttonStyleType="secondary" text="Edytuj szczegóły" fullWidth />
      <ProfileHobbies />
    </div>
  </SectionCard>
);
