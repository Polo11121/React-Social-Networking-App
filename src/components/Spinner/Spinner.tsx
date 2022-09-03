import { Backdrop, CircularProgress } from '@mui/material';

export const Spinner = ({ testId }: { testId?: string }) => (
  <Backdrop
    open
    sx={{ color: '#006f71', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <CircularProgress color="inherit" data-testid={`${testId}spinner`} />
  </Backdrop>
);
