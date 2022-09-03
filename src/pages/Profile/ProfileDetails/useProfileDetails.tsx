import { useUpdateMe } from 'api/useUpdateMe';
import { useFormik } from 'formik';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PlaceIcon from '@mui/icons-material/Place';
import HouseIcon from '@mui/icons-material/House';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  formatInterestedGenders,
  formatProfileDetailsDate,
  getAge,
} from 'shared/functions';

export const useProfileDetails = () => {
  const {
    user: {
      workPlace,
      middleSchool,
      upperSchool,
      home,
      childCity,
      gender,
      cities,
      phoneNumber,
      address,
      email,
      contactEmail,
      birthDate,
      name: firstName,
      surname,
      interestedGenders,
    },
    isOwner,
  } = useProfileInfo();
  const { mutateAsync, isLoading } = useUpdateMe({
    toastText: 'Pomyślnie zaktualizowano profil',
  });
  const formik = useFormik({
    initialValues: {
      surname,
      firstName,
      workPlace,
      middleSchool,
      upperSchool,
      home,
      childCity,
      userCity: '',
      phoneNumber,
      address,
      email,
      contactEmail,
      gender,
      birthDate,
      interestedGenders,
    },
    onSubmit: () => {},
  });

  const [userCities, setUserCities] = useState([...cities]);

  useEffect(() => setUserCities([...cities]), [cities]);

  const adHocsOverview = [
    {
      initialValue: workPlace,
      value: formik.values.workPlace,
      name: 'workPlace',
      placeholder: 'miejsce pracy',
      Icon: BusinessCenterIcon,
      displayText: 'Pracuje w',
      disableEdit: !isOwner,
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ workPlace: formik.values.workPlace }),
      onClose: () => {
        formik.setFieldValue('workPlace', workPlace);
      },
      onDelete: () => {
        mutateAsync({ workPlace: '' });
        formik.setFieldValue('workPlace', '');
      },
    },
    {
      initialValue: middleSchool,
      value: formik.values.middleSchool,
      name: 'middleSchool',
      placeholder: 'szkołę średnia',
      label: 'Szkoła średnia',
      Icon: SchoolIcon,
      disableEdit: !isOwner,
      displayText: gender === 'male' ? 'Uczył się w' : 'Uczyła sie w',
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ middleSchool: formik.values.middleSchool }),
      onClose: () => {
        formik.setFieldValue('middleSchool', middleSchool);
      },
      onDelete: () => {
        mutateAsync({ middleSchool: '' });
        formik.setFieldValue('middleSchool', '');
      },
    },
    {
      initialValue: upperSchool,
      value: formik.values.upperSchool,
      name: 'upperSchool',
      placeholder: 'szkołę wyższą',
      label: 'Szkoła wyższa',
      Icon: SchoolIcon,
      disableEdit: !isOwner,
      displayText: gender === 'male' ? 'Uczęszczał do' : 'Uczęsczała do',
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ upperSchool: formik.values.upperSchool }),
      onClose: () => {
        formik.setFieldValue('upperSchool', upperSchool);
      },
      onDelete: () => {
        mutateAsync({ upperSchool: '' });
        formik.setFieldValue('upperSchool', '');
      },
    },
    {
      initialValue: home,
      value: formik.values.home,
      name: 'home',
      placeholder: 'aktualne miejsce zamieszkania',
      Icon: HouseIcon,
      displayText: 'Mieszka w',
      disableEdit: !isOwner,
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ home: formik.values.home }),
      onClose: () => {
        formik.setFieldValue('home', home);
      },
      onDelete: () => {
        mutateAsync({ home: '' });
        formik.setFieldValue('home', '');
      },
    },
    {
      initialValue: childCity,
      value: formik.values.childCity,
      name: 'childCity',
      placeholder: 'miasto rodzinne',
      Icon: PlaceIcon,
      displayText: 'Z',
      onChange: formik.handleChange,
      disableEdit: !isOwner,
      onSubmit: () => mutateAsync({ childCity: formik.values.childCity }),
      onClose: () => {
        formik.setFieldValue('childCity', childCity);
      },
      onDelete: () => {
        mutateAsync({ childCity: '' });
        formik.setFieldValue('childCity', '');
      },
    },
  ];

  const adHocsWorkAndEducation = adHocsOverview.filter(
    ({ name }) =>
      name === 'workPlace' || name === 'middleSchool' || name === 'upperSchool'
  );

  const adHocsPlaces = [
    ...adHocsOverview.filter(
      ({ name }) => name === 'home' || name === 'childCity'
    ),
    ...userCities.map((city, index) => ({
      initialValue: cities[index],
      value: city,
      name: `city${index}`,
      placeholder: 'miasto',
      Icon: PlaceIcon,
      displayText: gender === 'male' ? 'Mieszkał w' : 'Mieszkała w',
      disableEdit: !isOwner,
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setUserCities([
          ...userCities.slice(0, index),
          event.target.value,
          ...userCities.slice(index + 1),
        ]),
      onSubmit: () =>
        mutateAsync({
          cities: userCities.at(-1) ? [...userCities, ''] : userCities,
        }),
      onClose: () =>
        setUserCities([
          ...userCities.slice(0, index),
          cities[index],
          ...userCities.slice(index + 1),
        ]),
      onDelete: () => {
        mutateAsync({
          cities: [
            ...userCities.slice(0, index),
            ...userCities.slice(index + 1),
          ],
        });
      },
    })),
  ];

  const adHocsConcat = [
    {
      initialValue: phoneNumber,
      value: formik.values.phoneNumber,
      name: 'phoneNumber',
      placeholder: 'numer telefonu komórkowego',
      Icon: PhoneAndroidIcon,
      displayText: 'Numer telefonu komórkoweg',
      disableEdit: !isOwner,
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ phoneNumber: formik.values.phoneNumber }),
      onClose: () => {
        formik.setFieldValue('phoneNumber', phoneNumber);
      },
      onDelete: () => {
        mutateAsync({ phoneNumber: '' });
        formik.setFieldValue('phoneNumber', '');
      },
    },
    {
      initialValue: address,
      value: formik.values.address,
      name: 'address',
      placeholder: 'adres',
      Icon: HouseIcon,
      displayText: 'Adres',
      disableEdit: !isOwner,
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ address: formik.values.address }),
      onClose: () => {
        formik.setFieldValue('address', address);
      },
      onDelete: () => {
        mutateAsync({ address: '' });
        formik.setFieldValue('address', '');
      },
    },
    {
      initialValue: contactEmail,
      value: formik.values.contactEmail,
      name: 'contactEmail',
      placeholder: 'Adres e-mail',
      Icon: EmailIcon,
      displayText: 'Adres e-mail',
      disableEdit: !isOwner,
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ contactEmail: formik.values.contactEmail }),
      onClose: () => {
        formik.setFieldValue('contactEmail', contactEmail);
      },
      onDelete: () => {
        mutateAsync({ contactEmail: '' });
        formik.setFieldValue('contactEmail', '');
      },
    },
  ];

  const adHocsBasicInfo = [
    {
      hideDelete: true,
      initialValue: firstName,
      displayValue: formik.values.firstName,
      value: formik.values.firstName,
      name: 'firstName',
      placeholder: 'Imię',
      Icon: PersonIcon,
      displayText: 'Imię',
      disableEdit: !isOwner,
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ name: formik.values.firstName }),
      onClose: () => {
        formik.setFieldValue('firstName', firstName);
      },
      onDelete: () => {
        mutateAsync({ firstName: '' });
        formik.setFieldValue('firstName', '');
      },
    },
    {
      hideDelete: true,
      initialValue: surname,
      displayValue: formik.values.surname,
      value: formik.values.surname,
      name: 'surname',
      placeholder: 'Nazwisko',
      Icon: PersonIcon,
      displayText: 'Nazwisko',
      disableEdit: !isOwner,
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ surname: formik.values.surname }),
      onClose: () => {
        formik.setFieldValue('surname', surname);
      },
      onDelete: () => {
        mutateAsync({ surname: '' });
        formik.setFieldValue('surname', '');
      },
    },
    {
      hideDelete: true,
      initialValue: gender,
      displayValue: formik.values.gender === 'female' ? 'Kobieta' : 'Mężczyzna',
      value: formik.values.gender,
      name: 'gender',
      placeholder: 'Płeć',
      Icon: formik.values.gender === 'female' ? FemaleIcon : MaleIcon,
      displayText: 'Płeć',
      inputType: 'select' as const,
      disableEdit: !isOwner,
      options: [
        { label: 'Kobieta', value: 'female' },
        { label: 'Mężczyzna', value: 'male' },
      ],
      onChange: formik.handleChange,
      onSubmit: () => mutateAsync({ gender: formik.values.gender }),
      onClose: () => {
        formik.setFieldValue('gender', gender);
      },
      onDelete: () => {
        mutateAsync({ gender: '' });
        formik.setFieldValue('gender', '');
      },
    },
    {
      hideDelete: true,
      initialValue: birthDate,
      displayValue: formatProfileDetailsDate(formik.values.birthDate),
      value: formik.values.birthDate,
      name: 'birthDate',
      placeholder: 'Data urodzenia',
      Icon: CalendarMonthIcon,
      displayText: 'Data urodzenia',
      inputType: 'datePicker' as const,
      disableEdit: !isOwner,
      onChange: (value: Date | null) =>
        formik.setFieldValue('birthDate', value),
      onSubmit: () => mutateAsync({ birthDate: formik.values.birthDate }),
      onClose: () => {
        formik.setFieldValue('birthDate', birthDate);
      },
      onDelete: () => {
        mutateAsync({ birthDate: '' });
        formik.setFieldValue('birthDate', '');
      },
    },
    {
      disableEdit: true,
      displayValue: getAge(formik.values.birthDate),
      Icon: CakeIcon,
      displayText: 'Wiek',
    },
  ];

  const interestedGendersAdHoc = [
    {
      initialValue: interestedGenders,
      displayValue: formatInterestedGenders(formik.values.interestedGenders),
      value: formik.values.interestedGenders,
      label: 'Interesują mnie',
      name: 'interestedGenders',
      placeholder: 'osoby, które Cię interesują',
      Icon: FavoriteIcon,
      displayText: 'Interesują mnie',
      inputType: 'select' as const,
      disableEdit: !isOwner,
      options: [
        { label: 'Kobiety', value: 'females' },
        { label: 'Mężczyzni', value: 'males' },
        { label: 'Kobiety i Mężczyźni ', value: 'femalesAndMales' },
      ],
      onChange: formik.handleChange,
      onSubmit: () =>
        mutateAsync({ interestedGenders: formik.values.interestedGenders }),
      onClose: () => {
        formik.setFieldValue('interestedGenders', interestedGenders);
      },
      onDelete: () => {
        mutateAsync({ interestedGenders: '' });
        formik.setFieldValue('interestedGenders', '');
      },
    },
  ];

  return {
    isOwner,
    isLoading,
    adHocsOverview,
    adHocsWorkAndEducation,
    adHocsConcat,
    adHocsPlaces,
    adHocsBasicInfo,
    interestedGendersAdHoc,
  };
};
