import { ReactNode, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import './ListItemSectionCell.scss';

type ListItemSectionCellPropsType = {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
  path?: string;
  testId?: string;
};

export const ListItemSectionCell = ({
  title,
  path,
  children,
  style,
  testId,
}: ListItemSectionCellPropsType) => (
  <div className="list-item-section-cell" style={style} data-testid={testId}>
    <div className="list-item-section-cell__title">{title}</div>
    {path ? (
      <NavLink
        to={path}
        className="list-item-section-cell__content list-item-section-cell__content--link"
      >
        {children}
      </NavLink>
    ) : (
      <div className="list-item-section-cell__content"> {children}</div>
    )}
  </div>
);
