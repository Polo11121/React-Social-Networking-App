import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import logo from 'utils/date-app-logo.png';
import './Header.scss';

type HeaderPropsType = {
  children?: ReactNode;
  search?: ReactNode;
  isLink?: boolean;
};

export const Header = ({
  children,
  search,
  isLink = true,
}: HeaderPropsType) => (
  <header className="header">
    <div className="header__logo-container">
      <Link
        className={classNames('header__logo', {
          'header__logo--inactive': !isLink,
        })}
        to="/"
      >
        <img width={40} src={logo} alt="date-app-logo" />
      </Link>
      {search}
    </div>
    {children}
  </header>
);
