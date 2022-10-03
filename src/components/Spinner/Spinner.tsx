import { CircularProgress } from '@mui/material';

export const Spinner = ({
  testId,
  customColor,
  size,
}: {
  testId?: string;
  customColor?: string;
  size?: number;
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
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
