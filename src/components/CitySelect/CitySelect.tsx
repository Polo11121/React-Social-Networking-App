// @ts-nocheck
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
  testId?: string;
};

export const CitySelect = ({
  onChange,
  placeholder,
  value,
  testId,
}: CitySelectPropsType) => {
  const [inputValue, setInputValue] = useState('');

  const changeSelectedValueHandler = (
    newValue: SingleValue<{
      label: string;
      value: string;
      coordinates?: number[];
    }>
  ) =>
    onChange(
      newValue?.value
        ? {
            label: newValue?.label || '',
            value: newValue?.value || '',
            location: newValue?.location,
          }
        : null
    );

  const debouncedChangeValueHandler = debounce(setInputValue, 200);

  const { data: cities, isFetching } = useGetCities(inputValue);

  return (
    <Select
      value={value}
      inputId={testId}
      placeholder={placeholder}
      loadingMessage={() => 'Ładowanie....'}
      onChange={changeSelectedValueHandler}
      onInputChange={debouncedChangeValueHandler}
      isLoading={isFetching}
      noOptionsMessage={() => 'Znajdź miasto'}
      options={cities.map(({ city, location, _id }) => ({
        label: city,
        value: _id,
        location,
      }))}
      isClearable
    />
  );
};
