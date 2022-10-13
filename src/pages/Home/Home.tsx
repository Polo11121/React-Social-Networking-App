import { SingleValue } from 'react-select';
import { useFormik } from 'formik';
import { useUpdateMe } from 'api/useUpdateMe';
import { Button, Select } from 'components';
import { useAuthContext } from 'contexts/AuthContext';
import {
  ageOptions,
  cityMaxDistance,
  interestedGendersOptions,
} from 'shared/constants/options';
import { formatInterestedGenders } from 'shared/functions';
import { CitySelect } from 'shared/fixtures/CitySelect/CitySelect';
import { SelectOptionType } from 'shared/types/repeatableTypes';
import './Home.scss';

type InitialValuesType = {
  interestedGenders: null | SelectOptionType;
  interestedAge: null | SelectOptionType;
  interestedCity: null | SelectOptionType;
  interestedCityMaxDistance: null | SelectOptionType;
};

export const Home = () => {
  const { mutate } = useUpdateMe({});
  const {
    userInfo: { filters, interestedGenders: userInterestedGenders, home },
  } = useAuthContext();

  const initialValues: InitialValuesType = {
    interestedGenders: filters?.interestedGenders && {
      value: filters.interestedGenders || userInterestedGenders,
      label: formatInterestedGenders(
        filters.interestedGenders || userInterestedGenders
      ),
    },
    interestedAge: filters?.interestedAge && {
      value: filters.interestedAge,
      label: filters.interestedAge,
    },
    interestedCity: filters?.interestedCity && {
      value: filters.interestedCity._id || home._id,
      label: filters.interestedCity.city || home.city,
    },
    interestedCityMaxDistance: filters?.interestedCityMaxDistance && {
      value: `${filters.interestedCityMaxDistance}km`,
      label: filters.interestedCityMaxDistance,
    },
  };

  const formik = useFormik({
    initialValues,
    onSubmit: ({
      interestedAge,
      interestedCity,
      interestedGenders,
      interestedCityMaxDistance,
    }) =>
      mutate({
        filters: {
          interestedAge: interestedAge?.value,
          interestedCity: interestedCity?.value,
          interestedGenders: interestedGenders?.value,
          interestedCityMaxDistance: interestedCityMaxDistance?.value,
        },
      }),
  });

  const onInterestedGendersChange = (value: SingleValue<SelectOptionType>) =>
    formik.setFieldValue('interestedGenders', value);

  const onInterestedAgeChange = (value: SingleValue<SelectOptionType>) =>
    formik.setFieldValue('interestedAge', value);

  const onInterestedCityChange = (value: SingleValue<SelectOptionType>) =>
    formik.setFieldValue('interestedCity', value);

  const onInterestedCityMaxDistanceChange = (
    value: SingleValue<SelectOptionType>
  ) => formik.setFieldValue('interestedCityMaxDistance', value);

  return (
    <div className="home">
      <form onSubmit={formik.handleSubmit}>
        <Select
          value={formik.values.interestedGenders}
          placeholder="Osoby, które Cię interesują"
          onChange={onInterestedGendersChange}
          options={interestedGendersOptions}
        />
        <Select
          value={formik.values.interestedAge}
          placeholder="Interesujący Cię wiek"
          onChange={onInterestedAgeChange}
          options={ageOptions}
        />
        <CitySelect
          onChange={onInterestedCityChange}
          placeholder="Interesujące Cię miasto"
          value={formik.values.interestedCity}
        />
        <Select
          value={formik.values.interestedCityMaxDistance}
          placeholder="Maksymalna odległość od miasta"
          onChange={onInterestedCityMaxDistanceChange}
          options={cityMaxDistance}
        />
        <Button type="submit" text="Filtruj" buttonStyleType="secondary" />
      </form>
    </div>
  );
};
