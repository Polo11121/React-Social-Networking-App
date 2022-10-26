import { useUpdateUser } from 'api/useUpdateUser';
import { useAuthContext } from 'contexts/AuthContext';
import { useFormik } from 'formik';
import { SingleValue } from 'react-select';
import { formatInterestedGenders } from 'shared/functions';
import { SelectOptionType } from 'shared/types/repeatableTypes';

type InitialValuesType = {
  interestedGenders: null | SelectOptionType;
  interestedAge: null | SelectOptionType;
  interestedCity: null | SelectOptionType;
  interestedCityMaxDistance: null | SelectOptionType;
};

export const useFilters = (afterUpdate: () => void) => {
  const { mutate, isLoading } = useUpdateUser({
    afterUpdate,
    toastText: 'Pomyślnie zmieniono filtry',
  });

  const {
    userInfo: { filters, interestedGenders: userInterestedGenders, home },
  } = useAuthContext();

  const initialValues: InitialValuesType = {
    interestedGenders: (filters?.interestedGenders ||
      userInterestedGenders) && {
      value: filters?.interestedGenders || userInterestedGenders,
      label: formatInterestedGenders(
        filters?.interestedGenders || userInterestedGenders
      ),
    },
    interestedAge: filters?.interestedAge && {
      value: filters.interestedAge,
      label: filters.interestedAge,
    },
    interestedCity: (filters?.interestedCity || home?._id) && {
      value: filters?.interestedCity._id || home?._id,
      label: filters?.interestedCity.city || home?.city,
    },
    interestedCityMaxDistance: filters?.interestedCityMaxDistance && {
      value: `${filters.interestedCityMaxDistance}`,
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

  return {
    formik,
    onInterestedGendersChange,
    onInterestedAgeChange,
    onInterestedCityChange,
    onInterestedCityMaxDistanceChange,
    isLoading,
    isDisabled: JSON.stringify(formik.values) === JSON.stringify(initialValues),
  };
};
