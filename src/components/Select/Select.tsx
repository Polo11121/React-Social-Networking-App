import { ReactNode, CSSProperties } from 'react';
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
  style?: CSSProperties;
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
  style,
}: CustomSelectPropsType) => (
  <Select
    styles={{
      menu: (base) => ({ ...base, zIndex: 10000 }),
      control: (base, state) => ({
        ...base,
        height: '3rem',
        ...(state.isFocused && {
          borderColor: '#006f71',
          boxShadow: '0 0 0 1px #006f71',
        }),
        ...style,
        '&:hover': {
          borderColor: state.isFocused ? '#006f71' : '0',
          boxShadow: state.isFocused ? '0 0 0 1px #006f71' : '0',
        },
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
