import { ChangeEvent, useState } from 'react';
import { debounce } from 'debounce';

export const useSearch = () => {
  const [value, setValue] = useState('');

  const changeValueHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const resetValueHandler = () => setValue('');

  const debouncedSetValueHandler = debounce(setValue, 200);

  const debouncedChangeValueHandler = (event: ChangeEvent<HTMLInputElement>) =>
    debouncedSetValueHandler(event.target.value);

  return {
    value,
    changeValueHandler,
    setValue,
    debouncedChangeValueHandler,
    resetValueHandler,
  };
};
