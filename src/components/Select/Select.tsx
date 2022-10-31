import { ReactNode } from 'react';
import Select, { InputActionMeta, SingleValue } from 'react-select';
import { SelectOptionType } from 'shared/types/repeatableTypes';

export type CustomSelectPropsType = {
  value?: SelectOptionType | null;
  placeholder?: string;
  onChange: (newValue: SingleValue<SelectOptionType>) => void;
  options: SelectOptionType[];
  name?: string;
  inputId?: string;
  loadingMessage?: (obj: { inputValue: string }) => ReactNode;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  isLoading?: boolean;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  isClearable?: boolean;
};

export const CustomSelect = ({
  value,
  placeholder,
  onChange,
  options,
  name,
  inputId,
  loadingMessage,
  onInputChange,
  isLoading,
  noOptionsMessage,
  isClearable = false,
}: CustomSelectPropsType) => (
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
    inputId={inputId}
    loadingMessage={loadingMessage}
    onInputChange={onInputChange}
    isLoading={isLoading}
    noOptionsMessage={noOptionsMessage}
    isClearable={isClearable}
  />
);
