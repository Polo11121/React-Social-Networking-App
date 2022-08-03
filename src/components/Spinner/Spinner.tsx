import { CircularProgress } from '@mui/material';

export const Spinner = ({ testId }: { testId?: string }) => (
  <div
    data-testid={`${testId}spinner`}
    style={{ display: 'grid', placeItems: 'center', height: '100%' }}
  >
    <CircularProgress color="inherit" />
  </div>
);
