import { SectionCard } from 'components';
import { AboutMe } from 'pages/Profile/ProfileContent/ProfileInfo/AboutMe/AboutMe';
import './ProfileInfo.scss';

export const ProfileInfo = () => {
  return (
    <div className="profile-info">
      <AboutMe />
      <SectionCard sectionTitle="Zdjęcia">
        <h1>elo</h1>
      </SectionCard>
    </div>
  );
};
