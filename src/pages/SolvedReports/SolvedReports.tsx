import { Report } from 'shared/features/Report/Report';
import { useGetReports } from 'api/useGetReports';
import { List } from 'shared/features/List/List';
import { useSearch } from 'shared/hooks/useSearch';
import { Search } from 'components';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import './SolvedReports.scss';

export const SolvedReports = () => {
  const { value, changeValueHandler } = useSearch();

  const {
    data: reports,
    isLoading,
    fetchNextPage,
    hasNextPage,
    results,
  } = useGetReports({ searchTerm: value, status: 'solved' });

  return (
    <div className="solved-reports">
      <div
        className="solved-reports__header"
        data-testid="admin-panel-solved-reports-header"
      >
        Zamknięte zgłoszenia ({results})
      </div>
      <div className="solved-reports__search">
        <Search
          onChange={changeValueHandler}
          value={value}
          placeholder="Szukaj zgłoszeń..."
          style={{ backgroundColor: 'white' }}
        />
      </div>
      <List
        isFilters
        dataLength={reports.length}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
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
            <h2>Brak zgłoszeń.</h2>
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
