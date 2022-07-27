import { useParams } from 'react-router-dom';
import { useGetUser } from 'api/useGetUser';
import { ProfilePreview } from 'pages/Profile/ProfilePreview/ProfilePreview';
import { ProfileContent } from 'pages/Profile/ProfileContent/ProfileContent';
import { Spinner } from 'components';
import './Profile.scss';

export const Profile = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUser(id || null);

  return (
    <div className="profile">
      {isLoading || !user ? (
        <Spinner />
      ) : (
        <>
          <ProfilePreview user={user} />
          <ProfileContent />
        </>
      )}
    </div>
  );
};
