import { ChangeEvent, ReactNode, CSSProperties } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss';

export type SearchPropsType = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hideIcon?: boolean;
  children?: ReactNode;
  testId?: string;
  style?: CSSProperties;
};

export const Search = ({
  value,
  onChange,
  placeholder,
  children,
  testId,
  style,
  hideIcon = false,
}: SearchPropsType) => (
  <div style={{ ...style }} className="search">
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
      data-testid={testId}
    />
    {children}
  </div>
);
