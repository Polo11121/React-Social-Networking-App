import { useState } from 'react';
import { SingleValue } from 'react-select';
import { SelectOptionType } from 'shared/types/repeatableTypes';
import { User } from 'shared/features/User/User';
import { Search, Select } from 'components';
import { useGetAdminPanelUsers } from 'api/useGetAdminPanelUsers';
import { useSearch } from 'shared/hooks/useSearch';
import { List } from 'shared/features/List/List';
import { userAccountStatusOptions } from 'shared/constants/options';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import './Users.scss';

export const Users = () => {
  const { value, changeValueHandler } = useSearch();
  const [userAccountStatus, setUserAccountStatus] =
    useState<SingleValue<SelectOptionType>>(null);

  const {
    data: users,
    isLoading,
    fetchNextPage,
    hasNextPage,
    results,
  } = useGetAdminPanelUsers(value, userAccountStatus?.value);

  const changeUserAccountStatusHandler = (
    selectValue: SingleValue<SelectOptionType>
  ) => setUserAccountStatus(selectValue);

  return (
    <div className="users">
      <div className="users__header" data-testid="admin-panel-users-header">
        Użytkownicy ({results})
      </div>
      <div className="users__filters">
        <div className="users__search">
          <Search
            testId="users-search"
            onChange={changeValueHandler}
            value={value}
            placeholder="Szukaj użytkowników..."
            style={{ backgroundColor: 'white' }}
          />
        </div>
        <Select
          inputId="users-status-select"
          onChange={changeUserAccountStatusHandler}
          options={userAccountStatusOptions}
          style={{
            height: '2.375rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            width: '18.75rem',
          }}
          placeholder="Status konta"
        />
      </div>
      <List
        isFilters
        dataLength={users.length}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        headers={[
          'ID UŻYTKOWNIKA',
          'IMIĘ',
          'NAZWISKO',
          'EMAIL',
          'STATUS KONTA',
        ]}
        isLoading={isLoading}
        noItems={
          <>
            <GroupRemoveIcon style={{ fontSize: '8rem' }} />
            <h2>Brak użytkowników.</h2>
          </>
        }
      >
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </List>
    </div>
  );
};
