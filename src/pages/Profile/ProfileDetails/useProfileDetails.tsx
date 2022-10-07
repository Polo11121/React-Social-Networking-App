import { useUpdateMe } from 'api/useUpdateMe';
import { useFormik } from 'formik';
import { ProfileDetailsSchema } from 'pages/Profile/ProfileDetails/ProfileDetailsSchema';
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
import { useEffect, useState } from 'react';
import {
  formatInterestedGenders,
  formatProfileDetailsDate,
  getAge,
} from 'shared/functions';

import { SingleValue } from 'react-select';
import {
  interestedGendersOptions,
  gendersOptions,
} from 'shared/constants/options';
import { CityType } from 'shared/types/responseTypes';

const formatCity = (city: CityType) =>
  city ? { label: city.city, value: city._id } : null;

const formatGender = (gender: string) => ({
  label: gender === 'female' ? 'Kobieta' : 'Mężczyzna',
  value: gender,
});

const formatInterestedGendersSelect = (gender: string) =>
  gender
    ? {
        label: formatInterestedGenders(gender),
        value: gender,
      }
    : null;

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
      home: formatCity(home),
      childCity: formatCity(childCity),
      phoneNumber,
      address,
      email,
      contactEmail,
      gender: formatGender(gender),
      birthDate,
      interestedGenders: formatInterestedGendersSelect(interestedGenders),
    },
    validationSchema: ProfileDetailsSchema,
    onSubmit: () => {},
  });

  const [userCities, setUserCities] = useState([
    ...cities.map((city) => formatCity(city)),
    null,
  ]);

  useEffect(
    () => setUserCities([...cities.map((city) => formatCity(city)), null]),
    [cities]
  );

  const adHocs = {
    workPlace: {
      initialValue: workPlace,
      value: formik.values.workPlace,
      name: 'workPlace',
      placeholder: 'miejsce pracy',
      label: 'Miejsce pracy',
      Icon: BusinessCenterIcon,
      displayText: 'Pracuje w',
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
    middleSchool: {
      initialValue: middleSchool,
      value: formik.values.middleSchool,
      name: 'middleSchool',
      placeholder: 'szkołę średnia',
      label: 'Szkoła średnia',
      Icon: SchoolIcon,
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
    upperSchool: {
      initialValue: upperSchool,
      value: formik.values.upperSchool,
      name: 'upperSchool',
      placeholder: 'szkołę wyższą',
      label: 'Szkoła wyższa',
      Icon: SchoolIcon,
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
    home: {
      initialValue: formatCity(home),
      value: formik.values?.home,
      displayValue: formik.values.home?.label,
      name: 'home',
      placeholder: 'aktualne miejsce zamieszkania',
      Icon: HouseIcon,
      displayText: 'Mieszka w',
      onChange: (value: { label: string; value: string }) =>
        formik.setFieldValue('home', value),
      onSubmit: () =>
        mutateAsync({
          home: formik.values.home?.value,
        }),
      onClose: () => {
        formik.setFieldValue('home', formatCity(home));
      },
      onDelete: () => {
        mutateAsync({ home: null });
        formik.setFieldValue('home', null);
      },
    },
    childCity: {
      initialValue: formatCity(childCity),
      value: formik.values?.childCity,
      displayValue: formik.values.childCity?.label,
      name: 'childCity',
      placeholder: 'miasto rodzinne',
      Icon: PlaceIcon,
      displayText: 'Z',
      onChange: (value: { label: string; value: string }) =>
        formik.setFieldValue('childCity', value),
      onSubmit: () =>
        mutateAsync({ childCity: formik.values.childCity?.value }),
      onClose: () => {
        formik.setFieldValue('childCity', formatCity(childCity));
      },
      onDelete: () => {
        mutateAsync({ childCity: '' });
        formik.setFieldValue('childCity', '');
      },
    },
    phoneNumber: {
      initialValue: phoneNumber,
      value: formik.values.phoneNumber,
      name: 'phoneNumber',
      placeholder: 'numer telefonu komórkowego',
      Icon: PhoneAndroidIcon,
      displayText: 'Numer telefonu komórkoweg',
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
    address: {
      initialValue: address,
      value: formik.values.address,
      name: 'address',
      placeholder: 'adres',
      Icon: HouseIcon,
      displayText: 'Adres',
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
    contactEmail: {
      initialValue: contactEmail,
      value: formik.values.contactEmail,
      name: 'contactEmail',
      placeholder: 'adres e-mail',
      Icon: EmailIcon,
      displayText: 'Adres e-mail',
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
    firstName: {
      hideDelete: true,
      initialValue: firstName,
      displayValue: formik.values.firstName,
      value: formik.values.firstName,
      name: 'firstName',
      placeholder: 'Imię',
      Icon: PersonIcon,
      displayText: 'Imię',
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
    surname: {
      hideDelete: true,
      initialValue: surname,
      displayValue: formik.values.surname,
      value: formik.values.surname,
      name: 'surname',
      placeholder: 'Nazwisko',
      Icon: PersonIcon,
      displayText: 'Nazwisko',
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
    gender: {
      hideDelete: true,
      initialValue: gender,
      displayValue:
        formik.values.gender.value === 'female' ? 'Kobieta' : 'Mężczyzna',
      value: formik.values.gender,
      name: 'gender',
      placeholder: 'Płeć',
      Icon: formik.values.gender.value === 'female' ? FemaleIcon : MaleIcon,
      displayText: 'Płeć',
      inputType: 'select' as const,
      options: gendersOptions,
      onChange: (
        value: SingleValue<{
          label: string;
          value: string;
        }>
      ) => formik.setFieldValue('gender', value),
      onSubmit: () => mutateAsync({ gender: formik.values.gender.value }),
      onClose: () => {
        formik.setFieldValue('gender', formatGender(gender));
      },
    },
    birthDate: {
      hideDelete: true,
      initialValue: new Date(birthDate),
      displayValue: formatProfileDetailsDate(formik.values.birthDate),
      value: new Date(formik.values.birthDate),
      name: 'birthDate',
      placeholder: 'Data urodzenia',
      Icon: CalendarMonthIcon,
      displayText: 'Data urodzenia',
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
      error: formik.errors.birthDate as string,
    },
    age: {
      displayValue: getAge(birthDate),
      Icon: CakeIcon,
      displayText: 'Wiek',
    },
    interestedGenders: {
      initialValue: interestedGenders,
      displayValue: formik.values.interestedGenders?.label,
      value: formik.values.interestedGenders,
      label: 'Interesują mnie',
      name: 'interestedGenders',
      placeholder: 'osoby, które Cię interesują',
      Icon: FavoriteIcon,
      displayText: 'Interesują mnie',
      inputType: 'select' as const,
      options: interestedGendersOptions,
      onChange: (
        value: SingleValue<{
          label: string;
          value: string;
        }>
      ) => formik.setFieldValue('interestedGenders', value),
      onSubmit: () =>
        mutateAsync({
          interestedGenders: formik.values.interestedGenders?.value,
        }),
      onClose: () => {
        formik.setFieldValue(
          'interestedGenders',
          formatInterestedGendersSelect(interestedGenders)
        );
      },
      onDelete: () => {
        mutateAsync({ interestedGenders: '' });
        formik.setFieldValue('interestedGenders', '');
      },
    },
  };

  const adHocsOverviewInputs = [
    adHocs.workPlace,
    adHocs.middleSchool,
    adHocs.upperSchool,
  ];
  const adHocsOverviewSelects = [adHocs.home, adHocs.childCity];

  const adHocsWorkAndEducation = [
    adHocs.workPlace,
    adHocs.middleSchool,
    adHocs.upperSchool,
  ];

  const adHocsPlaces = [
    adHocs.home,
    adHocs.childCity,
    ...userCities.map((city, index) => ({
      initialValue: cities[index],
      displayValue: city?.label,
      value: city,
      name: `city-${index}`,
      placeholder: 'miasto',
      Icon: PlaceIcon,
      displayText: gender === 'male' ? 'Mieszkał w' : 'Mieszkała w',
      inputType: 'citySelect' as const,
      onChange: (value: { label: string; value: string }) =>
        setUserCities([
          ...userCities.slice(0, index),
          value,
          ...userCities.slice(index + 1),
        ]),
      onSubmit: () =>
        mutateAsync({
          cities: userCities.map((userCity) => userCity?.value),
        }),
      onClose: () =>
        setUserCities([
          ...userCities.slice(0, index),
          formatCity(cities[index]),
          ...userCities.slice(index + 1),
        ]),
      onDelete: () => {
        mutateAsync({
          cities: [
            ...userCities.slice(0, index),
            ...userCities.slice(index + 1),
          ]
            .slice(0, -1)
            .map((userCity) => userCity?.value),
        });
      },
    })),
  ];

  const adHocsConcat = [
    adHocs.phoneNumber,
    adHocs.address,
    adHocs.contactEmail,
  ];

  const adHocsBasicInfo = [adHocs.firstName, adHocs.surname];

  return {
    isOwner,
    isLoading,
    adHocs,
    adHocsOverviewInputs,
    adHocsOverviewSelects,
    adHocsWorkAndEducation,
    adHocsConcat,
    adHocsPlaces,
    adHocsBasicInfo,
  };
};
