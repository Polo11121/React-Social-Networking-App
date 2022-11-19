import { useState } from 'react';
import { reportStatusOptions } from 'shared/constants/options';
import { Report } from 'shared/features/Report/Report';
import { useAuthContext } from 'contexts/AuthContext';
import { useGetReports } from 'api/useGetReports';
import { List } from 'shared/features/List/List';
import { useSearch } from 'shared/hooks/useSearch';
import { Search, Select } from 'components';
import { SelectOptionType } from 'shared/types/repeatableTypes';
import { SingleValue } from 'react-select';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import './MyReports.scss';

export const MyReports = () => {
  const [reportStatus, setReportStatus] =
    useState<SingleValue<SelectOptionType>>(null);

  const { value, changeValueHandler } = useSearch();
  const { userInfo } = useAuthContext();

  const {
    data: reports,
    isLoading,
    fetchNextPage,
    hasNextPage,
    results,
  } = useGetReports({
    adminId: userInfo._id,
    searchTerm: value,
    status: reportStatus?.value,
  });

  const changeReportStatusHandler = (
    selectValue: SingleValue<SelectOptionType>
  ) => setReportStatus(selectValue);

  return (
    <div className="my-reports">
      <div
        className="my-reports__header"
        data-testid="admin-panel-my-reports-header"
      >
        Moje zgłoszenia ({results})
      </div>
      <div className="my-reports__filters">
        <div className="my-reports__search">
          <Search
            onChange={changeValueHandler}
            value={value}
            placeholder="Szukaj zgłoszeń..."
            style={{ backgroundColor: 'white' }}
          />
        </div>
        <Select
          onChange={changeReportStatusHandler}
          options={reportStatusOptions}
          style={{
            height: '2.375rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            width: '18.75rem',
          }}
          placeholder="Status zgłoszenia"
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
