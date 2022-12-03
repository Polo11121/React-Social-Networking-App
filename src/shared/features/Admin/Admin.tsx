import { useState } from 'react';
import { ListItem } from 'shared/features/List/ListItem/ListItem';
import { ListItemSections } from 'shared/features/List/ListItem/ListItemSections/ListItemSections';
import { ListItemSection } from 'shared/features/List/ListItem/ListItemSection/ListItemSection';
import { ListItemSectionCell } from 'shared/features//List/ListItem/ListItemSectionCell/ListItemSectionCell';
import { formatDate, formatShortDate, getFullName } from 'shared/functions';
import { UserType } from 'shared/types/responseTypes';
import { Search, Select } from 'components';
import { useGetReports } from 'api/useGetReports';
import { List } from 'shared/features/List/List';
import { Report } from 'shared/features/Report/Report';
import { useSearch } from 'shared/hooks/useSearch';
import { SingleValue } from 'react-select';
import { Avatar } from '@mui/material';
import { SelectOptionType } from 'shared/types/repeatableTypes';
import { reportStatusOptions } from 'shared/constants/options';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';

export const Admin = ({ admin }: { admin: UserType }) => {
  const [isListItemExpand, setIsListItemExpand] = useState(false);
  const [reportStatus, setReportStatus] =
    useState<SingleValue<SelectOptionType>>(null);

  const { _id, name, surname, email, createdAt, profileImage } = admin;

  const changeReportStatusHandler = (
    selectValue: SingleValue<SelectOptionType>
  ) => setReportStatus(selectValue);
  const { value, changeValueHandler } = useSearch();

  const {
    data: reports,
    isLoading,
    results,
  } = useGetReports({
    adminId: isListItemExpand ? _id : null,
    searchTerm: value,
    status: reportStatus?.value,
  });

  return (
    <ListItem
      testId={`admin-${name}-${surname}-list-item`}
      isListItemExpand={isListItemExpand}
      onExpandListItem={setIsListItemExpand}
      cells={[_id, name, surname, email, formatShortDate(createdAt)]}
      title={`Administrator: ${_id}`}
    >
      <ListItemSections>
        <ListItemSection>
          <ListItemSectionCell
            title="Administrator"
            path={`/admin-profile/${_id}`}
            testId={`admin-${name}-${surname}-profile-link`}
          >
            <Avatar src={profileImage} style={{ height: 25, width: 25 }} />
            {getFullName(name, surname)}
          </ListItemSectionCell>
          <ListItemSectionCell title="Adres e-mail">
            {email}
          </ListItemSectionCell>
          <ListItemSectionCell title="Data dołączenia">
            {formatDate(createdAt)}
          </ListItemSectionCell>
        </ListItemSection>
        <h3>
          Zgłoszenia przypisane do administratora {getFullName(name, surname)} (
          {results})
        </h3>
        <div
          style={{
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <div style={{ width: '18.75rem' }}>
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
              height: '2.125rem',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              width: '18.75rem',
            }}
            placeholder="Status zgłoszenia"
          />
        </div>
        <List
          dataLength={reports.length}
          headers={[
            'NUMER ZGŁOSZENIA',
            'POWÓD',
            'DATA UTWORZENIA',
            'STATUS',
            'AKCJA',
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
            <Report noUsername key={report._id} report={report} />
          ))}
        </List>
      </ListItemSections>
    </ListItem>
  );
};
