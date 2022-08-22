import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Chip, IconButton, Menu } from '@mui/material';
import { HobbiesType } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesModal/HobbiesModal';
import { HobbiesIcon } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesIcon/HobbiesIcon';
import { v4 as uuid } from 'uuid';
import { hobbiesIcons } from 'shared/consts/icons';
import './AddHobby.scss';

const iconsNames = Object.keys(hobbiesIcons);

export const AddHobby = ({
  setHobbies,
  hobbiesNames,
}: {
  setHobbies: Dispatch<SetStateAction<HobbiesType>>;
  hobbiesNames: string[];
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hobby, setHobby] = useState({
    text: '',
    icon: 'MoreVertIcon',
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const changeHobbyName = (event: ChangeEvent<HTMLInputElement>) =>
    setHobby((prevState) => ({ ...prevState, text: event.target.value }));

  const changeHobbyIcon = (icon: string) => {
    setHobby((prevState) => ({ ...prevState, icon }));
    handleClose();
  };

  const addHobby = () => {
    setHobbies((prevState) => [
      ...prevState,
      {
        text: hobby.text.trim(),
        icon: hobby.icon || 'AutoAwesomeIcon',
        id: uuid(),
        deletable: true,
        checked: true,
      },
    ]);
    setHobby({
      text: '',
      icon: 'MoreVertIcon',
    });
  };

  return (
    <>
      <Chip
        icon={
          <IconButton disableRipple onClick={handleClick}>
            <HobbiesIcon iconName={hobby.icon} />
          </IconButton>
        }
        label={
          <div className="add-hobby-modal__chip">
            <input
              onChange={changeHobbyName}
              value={hobby.text}
              type="text"
              placeholder="Dodaj hobby"
              className="add-hobby__chip-input"
            />
            <IconButton
              disabled={
                !hobby.text.trim() || hobbiesNames.includes(hobby.text.trim())
              }
              onClick={addHobby}
              disableRipple
            >
              <HobbiesIcon iconName="AddCircleOutlineIcon" />
            </IconButton>
          </div>
        }
        variant="outlined"
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <div className="add-hobby__icons-menu">
          {iconsNames.map((icon) => (
            <IconButton
              key={icon}
              onClick={() => {
                changeHobbyIcon(icon);
              }}
              disableRipple
            >
              <HobbiesIcon iconName={icon} />
            </IconButton>
          ))}
        </div>
      </Menu>
    </>
  );
};
