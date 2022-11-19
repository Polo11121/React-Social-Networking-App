import { useState } from 'react';
import { ListItem } from 'shared/features/List/ListItem/ListItem';
import { ListItemSections } from 'shared/features/List/ListItem/ListItemSections/ListItemSections';
import { ListItemSection } from 'shared/features/List/ListItem/ListItemSection/ListItemSection';
import { ListItemSectionCell } from 'shared/features//List/ListItem/ListItemSectionCell/ListItemSectionCell';
import {
  formatDate,
  formatUserAccountStatus,
  getFullName,
} from 'shared/functions';
import { List } from 'shared/features/List/List';
import { Report } from 'shared/features/Report/Report';
import { useGetUserReports } from 'api/useGetUserReports';
import { UserType } from 'shared/types/responseTypes';
import { Avatar } from '@mui/material';
import { Button } from 'components';
import { UnblockUserModal } from 'shared/features/User/UnblockUserModal/UnblockUserModal';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';

export const User = ({ user }: { user: UserType }) => {
  const [isListItemExpand, setIsListItemExpand] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { _id, name, surname, email, createdAt, profileImage, status } = user;

  const { data: reports, isLoading } = useGetUserReports(
    isListItemExpand ? _id : null
  );

  const changeModalVisibilityHandler = () =>
    setIsModalOpen((prevState) => !prevState);

  return (
    <ListItem
      testId={`user-${name}-${surname}-list-item`}
      isListItemExpand={isListItemExpand}
      onExpandListItem={setIsListItemExpand}
      cells={[_id, name, surname, email, formatUserAccountStatus(status)]}
      title={`Użytkownik: ${_id}`}
    >
      <ListItemSections>
        <ListItemSection>
          <ListItemSectionCell
            testId={`user-${name}-${surname}-profile-link`}
            title="Użytkownik"
            path={status !== 'noConfirmation' ? `/profile/${_id}` : undefined}
          >
            <Avatar src={profileImage} style={{ height: 25, width: 25 }} />
            {getFullName(name, surname)}
          </ListItemSectionCell>
          <ListItemSectionCell title="Adres e-mail">
            {email}
          </ListItemSectionCell>
          <ListItemSectionCell
            title="Status konta"
            style={
              status === 'blocked'
                ? {
                    alignItems: 'center',
                  }
                : {}
            }
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div data-testid={`user-${name}-${surname}-account-status`}>
                {formatUserAccountStatus(status)}
              </div>
              {status === 'blocked' && (
                <Button
                  testId="unblock-user-button"
                  text="Odblokuj użytkownika"
                  buttonStyleType="mandy"
                  onClick={changeModalVisibilityHandler}
                />
              )}
            </div>
          </ListItemSectionCell>
          <ListItemSectionCell title="Data dołączenia">
            {formatDate(createdAt)}
          </ListItemSectionCell>
        </ListItemSection>
        <h3>
          Zgłoszenia na użytkownika {getFullName(name, surname)} (
          {reports.length || 0})
        </h3>
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
      {isModalOpen && (
        <UnblockUserModal
          onClose={changeModalVisibilityHandler}
          isOpen={isModalOpen}
          userId={_id}
          userFullName={getFullName(name, surname)}
        />
      )}
    </ListItem>
  );
};
