import { useGetAdministrators } from 'api/useGetAdministrators';
import { Admin } from 'shared/features/Admin/Admin';
import { List } from 'shared/features/List/List';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import './Administrators.scss';

export const Administrators = () => {
  const { data: admins, isLoading } = useGetAdministrators();

  return (
    <div className="administrators">
      <div
        className="administrators__header"
        data-testid="admin-panel-administrators-header"
      >
        Administratorzy ({admins.length})
      </div>
      <List
        dataLength={admins.length}
        headers={[
          'ID ADMINISTRATORA',
          'IMIĘ',
          'NAZWISKO',
          'EMAIL',
          'DATA DOŁĄCZENIA',
        ]}
        isLoading={isLoading}
        noItems={
          <>
            <AdminPanelSettingsIcon style={{ fontSize: '8rem' }} />
            <h2>Brak administratorów.</h2>
          </>
        }
      >
        {admins.map((admin) => (
          <Admin key={admin._id} admin={admin} />
        ))}
      </List>
    </div>
  );
};
