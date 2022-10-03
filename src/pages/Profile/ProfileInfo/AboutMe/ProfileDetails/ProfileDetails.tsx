import { AddHoc, Button } from 'components';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PlaceIcon from '@mui/icons-material/Place';
import HouseIcon from '@mui/icons-material/House';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  formatInterestedGenders,
  formatProfileDetailsDate,
} from 'shared/functions';

export const ProfileDetails = () => {
  const {
    user: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _id,
      workPlace,
      middleSchool,
      upperSchool,
      home,
      childCity,
      gender,
      birthDate,
      interestedGenders,
    },
    isOwner,
  } = useProfileInfo();
  const navigate = useNavigate();

  const details = [
    {
      displayValue: gender === 'female' ? 'Kobieta' : 'Mężczyzna',
      Icon: gender === 'female' ? FemaleIcon : MaleIcon,
      displayText: 'Płeć',
    },
    {
      displayValue: formatProfileDetailsDate(birthDate),
      Icon: CalendarMonthIcon,
      displayText: 'Data urodzenia',
    },
    {
      displayValue: formatInterestedGenders(interestedGenders),
      Icon: FavoriteIcon,
      displayText: 'Interesują mnie',
    },
    {
      displayValue: workPlace,
      Icon: BusinessCenterIcon,
      displayText: 'Pracuje w',
    },
    {
      displayValue: middleSchool,
      Icon: SchoolIcon,
      displayText: gender === 'male' ? 'Uczył się w' : 'Uczyła sie w',
    },
    {
      displayValue: upperSchool,
      Icon: SchoolIcon,
      displayText: gender === 'male' ? 'Uczęszczał do' : 'Uczęsczała do',
    },
    { displayValue: home?.city, Icon: HouseIcon, displayText: 'Mieszka w' },
    { displayValue: childCity?.city, Icon: PlaceIcon, displayText: 'Z' },
  ];

  const goToProfileDetails = () => navigate(`/profile/${_id}/details`);

  return (
    <>
      <h2 className="about-me__subTitle">Szczegóły</h2>
      {details.map(
        ({ Icon, displayText, displayValue }) =>
          displayValue && (
            <AddHoc
              key={`${displayText}-${displayValue}`}
              Icon={<Icon fontSize="large" />}
              displayOnly
              displayText={displayText}
              displayValue={displayValue}
            />
          )
      )}
      {isOwner && (
        <Button
          onClick={goToProfileDetails}
          buttonStyleType="secondary"
          text="Edytuj szczegóły"
          fullWidth
        />
      )}
    </>
  );
};
