import { CircularProgress } from '@mui/material';

type SpinnerPropsType = {
  testId?: string;
  customColor?: string;
  size?: number;
};

export const Spinner = ({ testId, customColor, size }: SpinnerPropsType) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      flex: 1,
      color: customColor || '#006f71',
    }}
  >
    <CircularProgress
      size={size}
      color="inherit"
      data-testid={`${testId}spinner`}
    />
  </div>
);
