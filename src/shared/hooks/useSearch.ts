import { ChangeEvent, useState } from 'react';
import { debounce } from 'debounce';

export const useSearch = () => {
  const [value, setValue] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const resetValue = () => setValue('');

  const debouncedSetValue = debounce(setValue, 200);

  const debouncedOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    debouncedSetValue(event.target.value);

  return { value, onChange, setValue, debouncedOnChange, resetValue };
};
