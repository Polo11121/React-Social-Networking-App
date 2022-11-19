import { Report } from 'shared/features/Report/Report';
import { useGetNewReports } from 'api/useGetNewReports';
import { List } from 'shared/features/List/List';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import './NewReports.scss';

export const NewReports = () => {
  const { data: reports, isLoading } = useGetNewReports();

  return (
    <div className="new-reports">
      <div className="new-reports__header">
        Nowe zgłoszenia ({reports.length || 0})
      </div>
      <List
        dataLength={reports.length}
        headers={[
          'NUMER ZGŁOSZENIA',
          'POWÓD',
          'ZGŁOSZONY UŻYTKOWNIK',
          'DATA UTWORZENIA',
          'STATUS',
          'ADMINISTRATOR',
        ]}
        isLoading={isLoading}
        noItems={
          <>
            <AssignmentReturnedIcon style={{ fontSize: '8rem' }} />
            <h2>Brak nowych zgłoszeń.</h2>
          </>
        }
      >
        {reports.map((report) => (
          <Report key={report._id} report={report} />
        ))}
      </List>
    </div>
  );
};
