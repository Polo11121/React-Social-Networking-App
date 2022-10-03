import axios from 'axios';
import { useMutation } from 'react-query';

export const useSwipe = () => {
  const swipe = (data: Record<any, any>) =>
    axios.patch('/api/v1/matches/swipe', data);

  return useMutation(swipe);
};
