import { Dispatch, SetStateAction } from 'react';
import { HobbiesType } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesModal/HobbiesModal';
import { HobbiesIcon } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesIcon/HobbiesIcon';
import { Chip } from '@mui/material';
import classNames from 'classnames';
import './HobbiesList.scss';

export const HobbiesList = ({
  hobbies,
  setHobbies,
}: {
  hobbies: HobbiesType;
  setHobbies: Dispatch<SetStateAction<HobbiesType>>;
}) => (
  <div className="hobbies-list">
    {hobbies.map(({ icon, text, id, deletable, checked }) => (
      <Chip
        className={classNames({
          'hobbies-list__chip--checked': checked,
        })}
        onDelete={
          deletable
            ? () => setHobbies(hobbies.filter((item) => item.id !== id))
            : undefined
        }
        icon={
          <HobbiesIcon
            iconName={icon}
            className={classNames({
              'hobbies-list__chip--checked': checked,
            })}
          />
        }
        key={id}
        label={text}
        variant="outlined"
        onClick={() =>
          setHobbies(
            hobbies.map((item) =>
              item.id === id ? { ...item, checked: !item.checked } : item
            )
          )
        }
      />
    ))}
  </div>
);
