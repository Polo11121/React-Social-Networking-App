import { useState } from 'react';
import { Select } from 'components';
import { SingleValue } from 'react-select';
import { useGetCities } from 'api/useGetCities';
import { debounce } from 'debounce';
import { SelectOptionType } from 'shared/types/repeatableTypes';

export const CitySelect = ({
  setSelectedOption,
  placeholder,
  value,
}: {
  setSelectedOption: (value: SelectOptionType) => void;
  placeholder?: string;
  value?: SelectOptionType | null;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeSelectedValue = (
    newValue: SingleValue<{
      label: string;
      value: string;
      coordinates?: number[];
    }>
  ) =>
    setSelectedOption({
      label: newValue?.label || '',
      value: newValue?.value || '',
      // @ts-ignore
      location: newValue.location,
    });

  const debouncedSetInputValue = debounce(setInputValue, 200);

  const { data: cities, isFetching } = useGetCities(inputValue);

  return (
    <Select
      value={value}
      name="home"
      placeholder={placeholder}
      loadingMessage={() => 'Ładowanie....'}
      // @ts-ignore
      onChange={handleChangeSelectedValue}
      onInputChange={debouncedSetInputValue}
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
