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
    isOwner,
  } = useProfileInfo();

  const modalVisibilityHandler = () =>
    setIsHobbiesModalOpen((prevState) => !prevState);

  return (
    <>
      {Boolean(hobbies.length) && (
        <>
          <h2 className="about-me__subTitle">Hobby</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              rowGap: '0.5rem',
            }}
          >
            {hobbies?.map(({ icon, text, _id }) => (
              <Chip
                icon={
                  <HobbiesIcon className="about-me__chip" iconName={icon} />
                }
                key={_id}
                label={text}
                variant="outlined"
              />
            ))}
          </div>
        </>
      )}
      {isOwner && (
        <Button
          testId="edit-hobby-button"
          onClick={modalVisibilityHandler}
          buttonStyleType="secondary"
          text={`${hobbies?.length ? 'Edytuj' : 'Dodaj'} hobby`}
          fullWidth
        />
      )}
      {isHobbiesModalOpen && (
        <HobbiesModal
          isOpen={isHobbiesModalOpen}
          onClose={modalVisibilityHandler}
        />
      )}
    </>
  );
};
