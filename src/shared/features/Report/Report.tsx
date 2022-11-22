import { useState } from 'react';
import { ListItem } from 'shared/features/List/ListItem/ListItem';
import { ListItemSections } from 'shared/features/List/ListItem/ListItemSections/ListItemSections';
import { ListItemSection } from 'shared/features/List/ListItem/ListItemSection/ListItemSection';
import { ListItemSectionCell } from 'shared/features//List/ListItem/ListItemSectionCell/ListItemSectionCell';
import {
  formatDate,
  formatReportReason,
  formatReportSolution,
  formatReportStatus,
  formatShortDate,
  getFullName,
} from 'shared/functions';
import { ReportType } from 'shared/types/responseTypes';
import { Tooltip, Avatar } from 'components';
import { useAuthContext } from 'contexts/AuthContext';
import { ReportButtons } from 'shared/features/Report/ReportButtons/ReportButtons';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import './Report.scss';

const getStatusIcon = (status: 'new' | 'inProgress' | 'solved') => {
  if (status === 'new') {
    return (
      <>
        <Tooltip
          id="new"
          text={formatReportStatus(status)}
          backgroundColor="#e8495f"
        />
        <AssignmentLateIcon
          className="report__icon-new"
          data-for="new"
          data-tip
        />
      </>
    );
  }
  if (status === 'inProgress') {
    return (
      <>
        <Tooltip
          id="in-progress"
          text={formatReportStatus(status)}
          backgroundColor="#f4837d"
        />
        <AssignmentIndIcon
          className="report__icon-in-progress"
          data-for="in-progress"
          data-tip
        />
      </>
    );
  }
  return (
    <>
      <Tooltip
        id="resolved"
        text={formatReportStatus(status)}
        backgroundColor="#006f71"
      />
      <AssignmentTurnedInIcon
        className="report__icon-resolved"
        data-for="resolved"
        data-tip
      />
    </>
  );
};

type ReportPropsType = {
  report: ReportType;
  noUsername?: boolean;
  noAdmin?: boolean;
};

export const Report = ({
  report,
  noUsername = false,
  noAdmin = false,
}: ReportPropsType) => {
  const [isListItemExpand, setIsListItemExpand] = useState(false);

  const { userInfo } = useAuthContext();

  const {
    reason,
    _id,
    userComment,
    reportedUser,
    reportingUser,
    createdAt,
    status,
    admin,
    reportId,
    adminComment,
    reportSolution,
  } = report;

  const isAdminReportingUser = admin?._id === reportingUser?._id;

  return (
    <ListItem
      testId={`report-list-item-reported-user-${reportedUser.name}-${reportedUser.surname}`}
      isListItemExpand={isListItemExpand}
      onExpandListItem={setIsListItemExpand}
      cells={[
        reportId,
        formatReportReason(reason),
        ...(!noUsername
          ? [getFullName(reportedUser.name, reportedUser.surname)]
          : []),
        formatShortDate(createdAt),
        getStatusIcon(status),
        ...(!noAdmin
          ? [admin ? getFullName(admin.name, admin.surname) : 'Brak']
          : []),
      ]}
      title={`Numer Zgłoszenia: ${reportId}`}
    >
      <ListItemSections flex={0.6}>
        <ListItemSection>
          <ListItemSectionCell
            title="Zgłoszony użytkownik"
            path={`/profile/${reportedUser._id}`}
          >
            <Avatar
              src={reportedUser.profileImage}
              className="report__user-avatar"
            />
            {getFullName(reportedUser.name, reportedUser.surname)}
          </ListItemSectionCell>
          <ListItemSectionCell title="Powód zgłoszenia">
            {formatReportReason(reason)}
          </ListItemSectionCell>
          <ListItemSectionCell
            title={`${
              isAdminReportingUser ? 'Admin' : 'Użytkownik'
            } zgłaszający`}
            path={`/${isAdminReportingUser ? 'admin-' : ''}profile/${
              reportingUser._id
            }`}
          >
            <Avatar
              src={reportingUser.profileImage}
              className="report__user-avatar"
            />
            {getFullName(reportingUser.name, reportingUser.surname)}
          </ListItemSectionCell>
        </ListItemSection>
        <ListItemSection>
          <ListItemSectionCell title="Komentarz do zgłoszenia">
            {userComment}
          </ListItemSectionCell>
          <ListItemSectionCell title="Data zgłoszenia">
            {formatDate(createdAt)}
          </ListItemSectionCell>
        </ListItemSection>
      </ListItemSections>
      <ListItemSections flex={0.4}>
        <ListItemSection>
          <ListItemSectionCell
            title="Status zgłoszenia"
            testId={`report-list-item-reported-user-${reportedUser.name}-${reportedUser.surname}-status`}
          >
            {formatReportStatus(status)}
          </ListItemSectionCell>
          <ListItemSectionCell
            path={admin ? `/admin-profile/${admin._id}` : undefined}
            title="Przypisany administrator"
          >
            {admin ? (
              <>
                <Avatar
                  src={admin.profileImage}
                  className="report__user-avatar"
                />
                {getFullName(admin.name, admin.surname)}
              </>
            ) : (
              'Brak'
            )}
          </ListItemSectionCell>
        </ListItemSection>
        {status === 'solved' && (
          <ListItemSection>
            <ListItemSectionCell title="Komentarz administratora">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div>{formatReportSolution(reportSolution)}</div>
                <div>{adminComment}</div>
              </div>
            </ListItemSectionCell>
          </ListItemSection>
        )}
        <ReportButtons
          assignedAdmin={admin}
          userId={userInfo._id}
          reportId={_id}
          reportDisplayId={reportId}
          status={status}
        />
      </ListItemSections>
    </ListItem>
  );
};
