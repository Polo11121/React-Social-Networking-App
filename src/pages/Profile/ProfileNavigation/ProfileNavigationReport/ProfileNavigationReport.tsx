import { useState } from 'react';
import { Tooltip } from 'components';
import { IconButton } from '@mui/material';
import { ReportModal } from 'pages/Profile/ProfileNavigation/ProfileNavigationReport/ReportModal/ReportModal';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export const ProfileNavigationReport = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const reportModalVisibilityHandler = () =>
    setIsReportModalOpen((prevState) => !prevState);

  return (
    <>
      <Tooltip
        backgroundColor="#e8495f"
        type="error"
        text="Zgłoś użytkownika"
        id="messages-emoji"
      />
      <IconButton
        data-testid="report-user-button"
        data-for="messages-emoji"
        data-tip
        onClick={reportModalVisibilityHandler}
      >
        <ReportGmailerrorredIcon className="profile-navigation__report-button" />
      </IconButton>
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={reportModalVisibilityHandler}
        />
      )}
    </>
  );
};
