import { formatImageUrl, getFullName } from 'shared/functions';
import { Avatar } from 'components';
import { useParams } from 'react-router-dom';
import { useGetUser } from 'api/useGetUser';
import { useGetAdminReportsCounters } from 'api/useGetAdminReportsCounters';
import MailIcon from '@mui/icons-material/Mail';
import './AdminProfilePreview.scss';

export const AdminProfilePreview = () => {
  const { id } = useParams();
  const {
    data: { profileImage, name, surname, email },
  } = useGetUser(id || null);
  const {
    data: { allReports, newReports, solvedReports },
  } = useGetAdminReportsCounters(id || null);

  return (
    <div className="admin-preview__container">
      <div
        className="admin-preview__header"
        data-testid="admin-panel-profile-header"
      >
        Administrator
      </div>
      <div className="admin-preview">
        <div className="admin-preview__info">
          <Avatar
            src={formatImageUrl(profileImage)}
            className="admin-preview__avatar"
          />
          <div>
            <div className="admin-preview__name">
              {getFullName(name, surname)}
            </div>
            <div className="admin-preview__email">
              <MailIcon />
              {email}
            </div>
          </div>
        </div>
        <div className="admin-preview__reports-container">
          <div className="admin-preview__reports-title">ZGŁOSZENIA</div>
          <div className="admin-preview__reports">
            <div className="admin-preview__report">
              <div>Wszystkie</div>
              <div>{allReports}</div>
            </div>
            <div className="admin-preview__report">
              <div>Otwarte</div> <div>{newReports}</div>
            </div>
            <div className="admin-preview__report">
              <div>Zamknięte</div> <div>{solvedReports}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
