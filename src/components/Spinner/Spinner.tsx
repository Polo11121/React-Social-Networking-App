import { CircularProgress } from '@mui/material';

export const Spinner = ({
  testId,
  customColor,
}: {
  testId?: string;
  customColor?: string;
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
    <CircularProgress color="inherit" data-testid={`${testId}spinner`} />
  </div>
);
