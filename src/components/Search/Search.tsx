import { ChangeEvent, ReactNode } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss';

export type SearchPropsType = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hideIcon?: boolean;
  children?: ReactNode;
  testId?: string;
};

export const Search = ({
  value,
  onChange,
  placeholder,
  hideIcon = false,
  children,
  testId,
}: SearchPropsType) => (
  <div className="search">
    {!hideIcon && (
      <SearchIcon
        className="search__icon"
        data-testid={`loupe-icon-${testId}`}
      />
    )}
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      className="search__input"
    />
    {children}
  </div>
);
