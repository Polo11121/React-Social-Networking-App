import { CircularProgress } from '@mui/material';

export const Spinner = () => (
  <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
    <CircularProgress color="inherit" />
  </div>
);
