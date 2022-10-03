import { ChangeEvent, ReactNode, CSSProperties, forwardRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss';

export type SearchPropsType = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  hideIcon?: boolean;
  children?: ReactNode;
  testId?: string;
  style?: CSSProperties;
  hints?: ReactNode;
};

export const Search = forwardRef<HTMLInputElement, SearchPropsType>(
  (
    {
      value,
      onChange,
      placeholder,
      children,
      testId,
      style,
      hints,
      hideIcon = false,
    },
    ref
  ) => (
    <div style={style}>
      <div className="search">
        {!hideIcon && (
          <SearchIcon
            className="search__icon"
            data-testid={`loupe-icon-${testId}`}
          />
        )}
        <input
          ref={ref}
          value={value || undefined}
          onChange={onChange}
          placeholder={placeholder}
          type="text"
          className="search__input"
        />
        {children}
      </div>
      {hints && <div className="search__hints">{hints}</div>}
    </div>
  )
);
