import { CSSProperties } from 'react';
import { CircularProgress } from '@mui/material';

type SpinnerPropsType = {
  testId?: string;
  size?: number;
  style?: CSSProperties;
};

export const Spinner = ({ testId, size, style }: SpinnerPropsType) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      flex: 1,
      color: '#006f71',
      ...style,
    }}
  >
    <CircularProgress
      size={size}
      color="inherit"
      data-testid={`${testId}spinner`}
    />
  </div>
);
