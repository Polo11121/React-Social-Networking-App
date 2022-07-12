import { ReactNode } from 'react';
import './Header.scss';

export const Header = ({ children }: { children?: ReactNode }) => (
  <header className="header">
    <h1 className="header__logo">DATE-APP</h1>
    {children}
  </header>
);
