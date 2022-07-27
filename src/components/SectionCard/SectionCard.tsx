import { ReactNode } from 'react';
import './SectionCard.scss';

export const SectionCard = ({
  sectionTitle,
  children,
}: {
  sectionTitle?: string;
  children: ReactNode;
}) => (
  <div className="section-card">
    {sectionTitle && <h1 className="section-card__title">{sectionTitle}</h1>}
    {children}
  </div>
);
