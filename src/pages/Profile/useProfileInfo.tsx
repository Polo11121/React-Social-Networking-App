import { useGetUser } from 'api/useGetUser';
import { useParams } from 'react-router-dom';
import { sortByDate } from 'shared/functions';

export const useProfileInfo = () => {
  const { id } = useParams();
  const userInfo = useGetUser(id || null);

  const userPhotos = userInfo.data.posts
    .sort((post1, post2) => sortByDate(post1.createdAt, post2.createdAt))
    .map(({ images }) => images)
    .flat();

  return {
    isLoading: userInfo.isLoading,
    user: userInfo.data,
    userPhotos,
  };
};
