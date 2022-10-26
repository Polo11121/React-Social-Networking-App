import { LastMessagesType } from 'shared/types/responseTypes';
import { useApiQuery } from 'api/useApiQuery';

export const useGetLastMessages = (messageId?: string) => {
  const matches = useApiQuery<LastMessagesType[]>({
    endpoint: `messages/lastMessages`,
    queryKey: 'lastMessages',
  });

  const currentChatUser = matches.data.find(
    ({ match }) => match._id === messageId
  )?.match;

  return {
    ...matches,
    currentChatUser,
  };
};
