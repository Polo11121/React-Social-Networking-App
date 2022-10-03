import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import logo from 'utils/date-app-logo.png';
import './Header.scss';

export const Header = ({
  children,
  search,
}: {
  children?: ReactNode;
  search?: ReactNode;
}) => (
  <header className="header">
    <div className="header__logo-container">
      <Link className="header__logo" to="/">
        <img width={40} src={logo} alt="date-app-logo" />
      </Link>
      {search}
    </div>
    {children}
  </header>
);
