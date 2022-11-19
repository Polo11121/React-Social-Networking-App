import { ReactNode } from 'react';

export const ListItemSections = ({
  children,
  flex = 1,
}: {
  children: ReactNode;
  flex?: number;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex }}>
    {children}
  </div>
);
