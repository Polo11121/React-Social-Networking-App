import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { MessageType } from 'shared/types/responseTypes';

type GetMessagesResponseType = { hasNextPage: boolean; data: MessageType[] };

export const useGetMessages = (receiverId: string | null) => {
  const getMessages = ({ pageParam = 1 }): Promise<GetMessagesResponseType> =>
    axios
      .get(`/api/v1/message/${receiverId}?page=${pageParam}&limit=20`)
      .then((res) => res.data);

  const data = useInfiniteQuery(['messages', receiverId], getMessages, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasNextPage ? pages.length + 1 : undefined;
    },
  });

  return {
    ...data,
    data: data?.data?.pages?.map((message) => message.data).flat(1) || [],
  };
};
