import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Chip, IconButton, Menu } from '@mui/material';
import { HobbiesType } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesModal/HobbiesModal';
import { HobbiesIcon } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesIcon/HobbiesIcon';
import { v4 as uuid } from 'uuid';
import { hobbiesIcons } from 'shared/constants/icons';
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

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const closeHandler = () => setAnchorEl(null);

  const changeHobbyNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setHobby((prevState) => ({ ...prevState, text: event.target.value }));

  const changeHobbyIconHandler = (icon: string) => {
    setHobby((prevState) => ({ ...prevState, icon }));
    closeHandler();
  };

  const addHobbyHandler = () => {
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
          <IconButton disableRipple onClick={clickHandler}>
            <HobbiesIcon iconName={hobby.icon} />
          </IconButton>
        }
        label={
          <div className="add-hobby-modal__chip">
            <input
              onChange={changeHobbyNameHandler}
              value={hobby.text}
              type="text"
              placeholder="Dodaj hobby"
              className="add-hobby__chip-input"
            />
            <IconButton
              disabled={
                !hobby.text.trim() || hobbiesNames.includes(hobby.text.trim())
              }
              onClick={addHobbyHandler}
              disableRipple
            >
              <HobbiesIcon iconName="AddCircleOutlineIcon" />
            </IconButton>
          </div>
        }
        variant="outlined"
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeHandler}>
        <div className="add-hobby__icons-menu">
          {iconsNames?.map((icon) => (
            <IconButton
              key={icon}
              onClick={() => changeHobbyIconHandler(icon)}
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
