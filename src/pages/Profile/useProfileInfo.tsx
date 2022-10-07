import { useGetUser } from 'api/useGetUser';
import { useAuthContext } from 'contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { formatPostDate } from 'shared/functions';

export const useProfileInfo = () => {
  const { id } = useParams();
  const { userInfo: loggedInUser } = useAuthContext();
  const userInfo = useGetUser(id || null);
  const { posts } = userInfo.data;

  const userPhotos = posts
    ?.map(({ images, description, createdAt, type }) =>
      images.sort().map((image) => ({
        image,
        label: `${description} ${formatPostDate(createdAt)}`,
        type,
      }))
    )
    .reduce((acc, val) => acc.concat(val), []);

  return {
    isLoading: userInfo.isLoading,
    user: {
      ...userInfo.data,
      posts,
      fullName: `${userInfo?.data?.name} ${userInfo?.data?.surname}`,
    },
    userPhotos,
    isOwner: loggedInUser._id === id,
    userStatus: userInfo.data.matchStatus?.find(({ user }) => user === id),
    myStatus: userInfo.data.matchStatus?.find(
      ({ user }) => user === loggedInUser._id
    ),
  };
};
