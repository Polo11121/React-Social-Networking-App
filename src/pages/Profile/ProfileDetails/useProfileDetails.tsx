import { useEffect, useState } from 'react';
import {
  formatInterestedGenders,
  formatProfileDetailsDate,
  getAge,
} from 'shared/functions';
import {
  interestedGendersOptions,
  gendersOptions,
} from 'shared/constants/options';
import { useUpdateUser } from 'api/useUpdateUser';
import { useForm } from 'shared/hooks/useForm';
import { SingleValue } from 'react-select';
import { CityType } from 'shared/types/responseTypes';
import { ProfileDetailsSchema } from 'pages/Profile/ProfileDetails/ProfileDetailsSchema';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { SelectOptionType } from 'shared/types/repeatableTypes';
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

  const { mutateAsync, isLoading } = useUpdateUser({
    toastText: 'Pomyślnie zaktualizowano profil',
  });

  const formik = useForm({
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
      changeHandler: formik.handleChange,
      submitHandler: () => mutateAsync({ workPlace: formik.values.workPlace }),
      closeHandler: () => {
        formik.setFieldValue('workPlace', workPlace);
      },
      deleteHandler: () => {
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
      changeHandler: formik.handleChange,
      submitHandler: () =>
        mutateAsync({ middleSchool: formik.values.middleSchool }),
      closeHandler: () => {
        formik.setFieldValue('middleSchool', middleSchool);
      },
      deleteHandler: () => {
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
      changeHandler: formik.handleChange,
      submitHandler: () =>
        mutateAsync({ upperSchool: formik.values.upperSchool }),
      closeHandler: () => {
        formik.setFieldValue('upperSchool', upperSchool);
      },
      deleteHandler: () => {
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
      changeHandler: (value: { label: string; value: string }) =>
        formik.setFieldValue('home', value),
      submitHandler: () =>
        mutateAsync({
          home: formik.values.home?.value,
        }),
      closeHandler: () => {
        formik.setFieldValue('home', formatCity(home));
      },
      deleteHandler: () => {
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
      changeHandler: (value: { label: string; value: string }) =>
        formik.setFieldValue('childCity', value),
      submitHandler: () =>
        mutateAsync({ childCity: formik.values.childCity?.value }),
      closeHandler: () => {
        formik.setFieldValue('childCity', formatCity(childCity));
      },
      deleteHandler: () => {
        mutateAsync({ childCity: null });
        formik.setFieldValue('childCity', null);
      },
    },
    phoneNumber: {
      initialValue: phoneNumber,
      value: formik.values.phoneNumber,
      name: 'phoneNumber',
      placeholder: 'numer telefonu komórkowego',
      Icon: PhoneAndroidIcon,
      displayText: 'Numer telefonu komórkoweg',
      changeHandler: formik.handleChange,
      submitHandler: () =>
        mutateAsync({ phoneNumber: formik.values.phoneNumber }),
      closeHandler: () => {
        formik.setFieldValue('phoneNumber', phoneNumber);
      },
      deleteHandler: () => {
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
      changeHandler: formik.handleChange,
      submitHandler: () => mutateAsync({ address: formik.values.address }),
      closeHandler: () => {
        formik.setFieldValue('address', address);
      },
      deleteHandler: () => {
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
      changeHandler: formik.handleChange,
      submitHandler: () =>
        mutateAsync({ contactEmail: formik.values.contactEmail }),
      closeHandler: () => {
        formik.setFieldValue('contactEmail', contactEmail);
      },
      deleteHandler: () => {
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
      changeHandler: formik.handleChange,
      submitHandler: () => mutateAsync({ name: formik.values.firstName }),
      closeHandler: () => {
        formik.setFieldValue('firstName', firstName);
      },
      deleteHandler: () => {
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
      changeHandler: formik.handleChange,
      submitHandler: () => mutateAsync({ surname: formik.values.surname }),
      closeHandler: () => {
        formik.setFieldValue('surname', surname);
      },
      deleteHandler: () => {
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
      changeHandler: (value: SingleValue<SelectOptionType>) =>
        formik.setFieldValue('gender', value),
      submitHandler: () => mutateAsync({ gender: formik.values.gender.value }),
      closeHandler: () => {
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
      changeHandler: (value: Date | null) =>
        formik.setFieldValue('birthDate', value),
      submitHandler: () => mutateAsync({ birthDate: formik.values.birthDate }),
      closeHandler: () => {
        formik.setFieldValue('birthDate', birthDate);
      },
      deleteHandler: () => {
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
      changeHandler: (value: SingleValue<SelectOptionType>) =>
        formik.setFieldValue('interestedGenders', value),
      submitHandler: () =>
        mutateAsync({
          interestedGenders: formik.values.interestedGenders?.value,
        }),
      closeHandler: () => {
        formik.setFieldValue(
          'interestedGenders',
          formatInterestedGendersSelect(interestedGenders)
        );
      },
      deleteHandler: () => {
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
      changeHandler: (value: { label: string; value: string }) =>
        setUserCities([
          ...userCities.slice(0, index),
          value,
          ...userCities.slice(index + 1),
        ]),
      submitHandler: () =>
        mutateAsync({
          cities: userCities.map((userCity) => userCity?.value),
        }),
      closeHandler: () =>
        setUserCities([
          ...userCities.slice(0, index),
          formatCity(cities[index]),
          ...userCities.slice(index + 1),
        ]),
      deleteHandler: () => {
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
