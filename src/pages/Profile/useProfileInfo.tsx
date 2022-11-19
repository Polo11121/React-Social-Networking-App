import { useGetUser } from 'api/useGetUser';
import { useAuthContext } from 'contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { formatDate, getFullName } from 'shared/functions';

export const useProfileInfo = () => {
  const { id } = useParams();
  const { userInfo: loggedInUser } = useAuthContext();
  const { data: user, isLoading } = useGetUser(id || null);

  const userPhotos = user.posts
    ?.map(({ images, description, createdAt, type }) =>
      images.sort().map((image) => ({
        image,
        label: `${description} ${formatDate(createdAt)}`,
        type,
      }))
    )
    .reduce((acc, val) => acc.concat(val), []);

  return {
    isLoading,
    user: {
      ...user,
      posts: user.posts,
      fullName: getFullName(user?.name, user?.surname),
    },
    userPhotos,
    isOwner: loggedInUser._id === id,
    userStatus: user.matchStatus?.find(({ user: userId }) => userId === id)
      ?.status,
    myStatus: user.matchStatus?.find(
      ({ user: userId }) => userId === loggedInUser._id
    )?.status,
  };
};
