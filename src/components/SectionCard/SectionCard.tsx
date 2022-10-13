import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import './SectionCard.scss';

type SectionCardPropsType = {
  sectionTitle?: string;
  children?: ReactNode;
  style?: CSSProperties;
  noPadding?: boolean;
};

export const SectionCard = ({
  sectionTitle,
  children,
  style,
  noPadding = false,
}: SectionCardPropsType) => (
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
