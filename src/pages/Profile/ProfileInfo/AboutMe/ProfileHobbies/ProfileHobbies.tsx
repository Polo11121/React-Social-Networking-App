import { useState } from 'react';
import { HobbiesModal } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesModal/HobbiesModal';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { HobbiesIcon } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesIcon/HobbiesIcon';
import { Button } from 'components';
import { Chip } from '@mui/material';

export const ProfileHobbies = () => {
  const [isHobbiesModalOpen, setIsHobbiesModalOpen] = useState(false);
  const {
    user: { hobbies },
  } = useProfileInfo();

  const toggleModalVisibility = () =>
    setIsHobbiesModalOpen((prevState) => !prevState);

  return (
    <>
      {' '}
      {Boolean(hobbies.length) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            rowGap: '0.5rem',
          }}
          className="profile-hobbies"
        >
          {hobbies.map(({ icon, text, _id }) => (
            <Chip
              icon={<HobbiesIcon iconName={icon} />}
              key={_id}
              label={text}
              variant="outlined"
            />
          ))}
        </div>
      )}
      <Button
        onClick={toggleModalVisibility}
        buttonStyleType="secondary"
        text={`${hobbies ? 'Edytuj' : 'Dodaj'} hobby`}
        fullWidth
      />
      {isHobbiesModalOpen && (
        <HobbiesModal
          isOpen={isHobbiesModalOpen}
          onClose={toggleModalVisibility}
        />
      )}
    </>
  );
};
