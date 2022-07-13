import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = ({ children }: { children?: ReactNode }) => (
  <header className="header">
    <Link className="header__logo" to="/">
      <h1>DATE-APP</h1>
    </Link>
    {children}
  </header>
);
