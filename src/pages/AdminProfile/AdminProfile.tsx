import { useGetUser } from 'api/useGetUser';
import { useParams } from 'react-router-dom';
import { useGetAdminReportsCounters } from 'api/useGetAdminReportsCounters';
import { AdminProfileReports } from 'pages/AdminProfile/AdminProfileReports/AdminProfileReports';
import { WithLoader } from 'shared/features/WithLoader/WithLoader';
import { AdminProfilePreview } from 'pages/AdminProfile/AdminProfilePreview/AdminProfilePreview';

export const AdminProfile = () => {
  const { id } = useParams();
  const { isLoading: isUserLoading } = useGetUser(id || null);
  const { isLoading: isCountersLoading } = useGetAdminReportsCounters(
    id || null
  );

  return (
    <WithLoader isLoading={isUserLoading || isCountersLoading}>
      <div
        style={{
          padding: '2rem 2rem 0',
          minHeight: 'calc(100vh - 4rem)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AdminProfilePreview />
        <AdminProfileReports />
      </div>
    </WithLoader>
  );
};
