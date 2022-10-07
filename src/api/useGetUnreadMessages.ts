import { useApiQuery } from 'api/useApiQuery';

export const useGetUnreadMessages = () =>
  useApiQuery<number>({
    endpoint: 'messages/unreadMessages',
    queryKey: 'unreadMessages',
    defaultZero: true,
  });
