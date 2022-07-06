import axios from 'axios';
import { useMutation } from 'react-query';

export const useForgotPassword = () => {
  const forgotPassword = ({ email }: { email: string }) =>
    axios.post('users/forgotPassword', { email });

  const { mutate, isLoading } = useMutation(forgotPassword);

  return { mutate, isLoading };
};
