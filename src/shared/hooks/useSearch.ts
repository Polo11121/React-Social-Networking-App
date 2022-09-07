import { ChangeEvent, useState } from 'react';

export const useSearch = () => {
  const [value, setValue] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const resetValue = () => setValue('');

  return { value, onChange, setValue, resetValue };
};
