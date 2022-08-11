import { useGetUser } from 'api/useGetUser';
import { useParams } from 'react-router-dom';
import { formatPostDate, sortByDate } from 'shared/functions';

export const useProfileInfo = () => {
  const { id } = useParams();
  const userInfo = useGetUser(id || null);
  const posts = userInfo.data.posts.sort((post1, post2) =>
    sortByDate(post1.createdAt, post2.createdAt)
  );

  const userPhotos = posts
    .map(({ images, description, createdAt, type }) =>
      images.map((image) => ({
        image,
        label: `${description} ${formatPostDate(createdAt)}`,
        type,
      }))
    )
    .reduce((acc, val) => acc.concat(val), []);

  return {
    isLoading: userInfo.isLoading,
    user: { ...userInfo.data, posts },
    userPhotos,
  };
};
