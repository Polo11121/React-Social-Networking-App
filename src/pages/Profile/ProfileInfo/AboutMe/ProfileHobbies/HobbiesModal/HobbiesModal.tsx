import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { IconButton, Modal } from '@mui/material';
import { HobbiesList } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesModal/HobbiesList/HobbiesList';
import { AddHobby } from 'pages/Profile/ProfileInfo/AboutMe/ProfileHobbies/HobbiesModal/AddHobby/AddHobby';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { useUpdateMe } from 'api/useUpdateMe';
import { Button } from 'components';
import { areEqual } from 'shared/functions';
import ClearIcon from '@mui/icons-material/Clear';
import './HobbiesModal.scss';

export type HobbiesType = {
  text: string;
  icon: string;
  id: string;
  deletable?: boolean;
  checked?: boolean;
}[];

const initialHobbies: HobbiesType = [
  { text: 'Gry wideo', icon: 'SportsEsportsIcon', id: uuid() },
  { text: 'Słuchanie muzyki', icon: 'HeadphonesIcon', id: uuid() },
  { text: 'Spanie', icon: 'HotelIcon', id: uuid() },
  { text: 'Czytanie', icon: 'MenuBookIcon', id: uuid() },
  { text: 'Oglądanie filmów', icon: 'MovieFilterIcon', id: uuid() },
  { text: 'Piłka nożna', icon: 'SportsSoccerIcon', id: uuid() },
  { text: 'Spotkania ze znajomymi', icon: 'GroupIcon', id: uuid() },
  { text: 'Koszykówka', icon: 'SportsBaseballIcon', id: uuid() },
  { text: 'Pływanie', icon: 'PoolIcon', id: uuid() },
  { text: 'Podróżowanie', icon: 'PublicIcon', id: uuid() },
  { text: 'Jedzenie', icon: 'LocalPizzaIcon', id: uuid() },
];

export const HobbiesModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [hobbies, setHobbies] = useState(initialHobbies);
  const {
    user: { hobbies: userHobbies },
  } = useProfileInfo();
  const { mutate, isLoading } = useUpdateMe({
    afterUpdate: onClose,
    toastText: 'Pomyślnie zaktualizowano hobby',
  });

  const checkedHobbies = hobbies.filter(({ checked }) => checked);
  const isButtonDisabled =
    (hobbies.every(({ checked }) => !checked) && !userHobbies.length) ||
    isLoading ||
    areEqual(
      userHobbies.map(({ text }) => text),
      checkedHobbies.map(({ text }) => text)
    );

  useEffect(() => {
    setHobbies((prevState) =>
      prevState.map((hobby) =>
        userHobbies.map(({ text }) => text).includes(hobby.text)
          ? { ...hobby, checked: true }
          : hobby
      )
    );
  }, [userHobbies]);

  const updateHobbiesHandler = () =>
    mutate({
      hobbies: checkedHobbies.map(({ text, icon }) => ({ text, icon })),
    });

  return (
    <Modal
      open={isOpen}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      onClose={onClose}
    >
      <div className="hobbies-modal">
        <div className="hobbies-modal__content">
          <IconButton className="hobbies-modal__exit-button" onClick={onClose}>
            <ClearIcon />
          </IconButton>
          <div className="hobbies-modal__text">
            <div style={{ padding: '1rem' }}>
              <h1>{userHobbies.length ? 'Edytuj' : 'Dodaj'} hobby </h1>
              <p>
                Co lubisz robić? Wybierz spośród popularnych hobby podanych
                poniżej lub dodaj inne.
              </p>
            </div>
          </div>
          <div className="hobbies-modal__chips">
            <p style={{ margin: '0 auto' }}>POLECANE HOBBY</p>
            <HobbiesList hobbies={hobbies} setHobbies={setHobbies} />
            <AddHobby
              setHobbies={setHobbies}
              hobbiesNames={hobbies.map(({ text }) => text)}
            />
          </div>
          <div className="hobbies-modal__buttons">
            <Button onClick={onClose} text="Anuluj" buttonStyleType="mandy" />
            <Button
              text="Dodaj hobby"
              onClick={updateHobbiesHandler}
              isDisabled={isButtonDisabled}
              buttonStyleType="primary"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
