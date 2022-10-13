import { useState } from 'react';
import { Select } from 'components';
import { SingleValue } from 'react-select';
import { useGetCities } from 'api/useGetCities';
import { debounce } from 'debounce';
import { SelectOptionType } from 'shared/types/repeatableTypes';

type CitySelectPropsType = {
  onChange: (value: SelectOptionType) => void;
  placeholder?: string;
  value?: SelectOptionType | null;
};

export const CitySelect = ({
  onChange,
  placeholder,
  value,
}: CitySelectPropsType) => {
  const [inputValue, setInputValue] = useState('');

  const changeSelectedValueHandler = (
    newValue: SingleValue<{
      label: string;
      value: string;
      coordinates?: number[];
    }>
  ) =>
    onChange({
      label: newValue?.label || '',
      value: newValue?.value || '',
      // @ts-ignore
      location: newValue.location,
    });

  const debouncedChangeValueHandler = debounce(setInputValue, 200);

  const { data: cities, isFetching } = useGetCities(inputValue);

  return (
    <Select
      value={value}
      name="home"
      placeholder={placeholder}
      loadingMessage={() => 'Ładowanie....'}
      // @ts-ignore
      onChange={changeSelectedValueHandler}
      onInputChange={debouncedChangeValueHandler}
      isLoading={isFetching}
      noOptionsMessage={() => 'Znajdź miasto'}
      // @ts-ignore
      options={cities.map(({ city, location, _id }) => ({
        label: city,
        value: _id,
        location,
      }))}
    />
  );
};
