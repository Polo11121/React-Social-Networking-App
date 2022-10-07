import { ReactNode } from 'react';
import Select, { InputActionMeta, SingleValue } from 'react-select';
import { SelectOptionType } from 'shared/types/repeatableTypes';

type CustomSelectType = {
  value?: SelectOptionType | null;
  placeholder?: string;
  onChange: (newValue: SingleValue<SelectOptionType>) => void;
  options: SelectOptionType[];
  name?: string;
  loadingMessage?: (obj: { inputValue: string }) => ReactNode;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  isLoading?: boolean;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
};
export const CustomSelect = ({
  value,
  placeholder,
  onChange,
  options,
  name,
  loadingMessage,
  onInputChange,
  isLoading,
  noOptionsMessage,
}: CustomSelectType) => (
  <Select
    styles={{
      control: (base) => ({
        ...base,
        height: '3rem',
      }),
    }}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    options={options}
    name={name}
    loadingMessage={loadingMessage}
    onInputChange={onInputChange}
    isLoading={isLoading}
    noOptionsMessage={noOptionsMessage}
  />
);
