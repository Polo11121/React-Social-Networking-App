import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import './SectionCard.scss';

export const SectionCard = ({
  sectionTitle,
  children,
  style,
  noPadding = false,
}: {
  sectionTitle?: string;
  children?: ReactNode;
  style?: CSSProperties;
  noPadding?: boolean;
}) => (
  <div
    style={style}
    className={classNames('section-card', {
      'section-card--no-padding': noPadding,
    })}
  >
    {sectionTitle && <h1 className="section-card__title">{sectionTitle}</h1>}
    {children}
  </div>
);
