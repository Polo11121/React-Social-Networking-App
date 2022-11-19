import { ReactNode, CSSProperties } from 'react';

export const ListItemSection = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      ...style,
    }}
  >
    {children}
  </div>
);
