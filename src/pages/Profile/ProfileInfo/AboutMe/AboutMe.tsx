import { SectionCard, Button } from 'components';
import ProfileDescription from 'pages/Profile/ProfileInfo/AboutMe/ProfileDescription/ProfileDescription';
import './AboutMe.scss';

export const AboutMe = () => {
  return (
    <SectionCard sectionTitle="O mnie">
      <div className="about-me">
        <ProfileDescription />
        <Button buttonStyleType="secondary" text="Edytuj szczegóły" fullWidth />
        <Button buttonStyleType="secondary" text="Dodaj opis" fullWidth />
      </div>
    </SectionCard>
  );
};
