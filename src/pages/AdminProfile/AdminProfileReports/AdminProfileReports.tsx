import { useState } from 'react';
import { reportStatusOptions } from 'shared/constants/options';
import { Report } from 'shared/features/Report/Report';
import { useGetReports } from 'api/useGetReports';
import { List } from 'shared/features/List/List';
import { useSearch } from 'shared/hooks/useSearch';
import { Search, Select } from 'components';
import { useGetUser } from 'api/useGetUser';
import { SelectOptionType } from 'shared/types/repeatableTypes';
import { SingleValue } from 'react-select';
import { useParams } from 'react-router-dom';
import { getFullName } from 'shared/functions';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import './AdminProfileReports.scss';

export const AdminProfileReports = () => {
  const [reportStatus, setReportStatus] =
    useState<SingleValue<SelectOptionType>>(null);

  const { id } = useParams();
  const { value, changeValueHandler } = useSearch();

  const {
    data: { name, surname },
  } = useGetUser(id || null);

  const {
    data: reports,
    isLoading,
    fetchNextPage,
    hasNextPage,
    results,
  } = useGetReports({
    adminId: id,
    searchTerm: value,
    status: reportStatus?.value,
  });

  const changeReportStatusHandler = (
    selectValue: SingleValue<SelectOptionType>
  ) => setReportStatus(selectValue);

  return (
    <div className="admin-profile-reports">
      <div className="admin-profile-reports__header">
        Zgłoszenia przypisane do administratora {getFullName(name, surname)} (
        {results})
      </div>
      <div className="admin-profile-reports__filters">
        <div className="admin-profile-reports__search">
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
          inputId="reports-status-select"
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
          <Report key={report._id} report={report} noAdmin />
        ))}
      </List>
    </div>
  );
};
