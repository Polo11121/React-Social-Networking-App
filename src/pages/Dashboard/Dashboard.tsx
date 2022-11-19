import { DashboardCard } from 'shared/features/DashboardCard/DashboardCard';
import { useGetDashboardCounters } from 'api/useGetDashboardCounters';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import './Dashboard.scss';

export const Dashboard = () => {
  const {
    data: {
      allReports,
      newReports,
      solvedReports,
      myReports,
      administrators,
      users,
    },
  } = useGetDashboardCounters();

  return (
    <div className="dashboard" data-testid="admin-panel-dashboard">
      <DashboardCard
        Icon={AssignmentIcon}
        title="Wszystkie zgłoszenia"
        count={allReports}
        color="#006f71"
        path="/all-reports"
      />
      <DashboardCard
        Icon={AssignmentLateIcon}
        title="Nowe zgłoszenia"
        count={newReports}
        color="#e8495f"
        path="/new-reports"
      />
      <DashboardCard
        Icon={AssignmentTurnedInIcon}
        title="Zamknięte zgłoszenia"
        count={solvedReports}
        color="#fdceac"
        path="/solved-reports"
      />
      <DashboardCard
        Icon={AssignmentIndIcon}
        title="Moje zgłoszenia"
        color="#f4837d"
        count={myReports}
        path="/my-reports"
      />
      <DashboardCard
        Icon={GroupIcon}
        title="Użytkownicy"
        count={users}
        color="#99b898"
        path="/users"
      />
      <DashboardCard
        Icon={AdminPanelSettingsIcon}
        title="Administratorzy"
        count={administrators}
        color="#0c5682"
        path="/administrators"
      />
    </div>
  );
};
