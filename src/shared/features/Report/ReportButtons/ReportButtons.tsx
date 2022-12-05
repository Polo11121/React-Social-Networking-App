import { useState } from 'react';
import { Button } from 'components';
import { ListItemSection } from 'shared/features/List/ListItem/ListItemSection/ListItemSection';
import { ListItemSectionCell } from 'shared/features/List/ListItem/ListItemSectionCell/ListItemSectionCell';
import { useUpdateReport } from 'api/useUpdateReport';
import { ReportUserType } from 'shared/types/responseTypes';
import { useQueryClient } from 'react-query';
import { customToast } from 'shared/hooks/customToast';
import { SolveReportModal } from 'shared/features/Report/SolveReportModal/SolveReportModal';

type ReportButtonsType = {
  assignedAdmin: ReportUserType;
  userId: string;
  reportId: string;
  reportDisplayId: string;
  status: string;
};

export const ReportButtons = ({
  assignedAdmin,
  userId,
  reportId,
  reportDisplayId,
  status,
}: ReportButtonsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const assignedToCurrentUser = assignedAdmin?._id === userId;

  const { mutateAsync, isLoading } = useUpdateReport(reportId);

  const changeModalVisibilityHandler = () =>
    setIsModalOpen((prevState) => !prevState);

  const onSuccess = (type: 'assign' | 'unassign') => {
    queryClient.invalidateQueries('reports');
    queryClient.invalidateQueries(['userReports', userId]);
    customToast({
      style: {
        whiteSpace: 'nowrap',
        width: 'fit-content',
        ...(type === 'unassign' ? { color: '#e8495f' } : {}),
      },
      text:
        type === 'assign'
          ? `Przypisano do zgłoszenia: ${reportDisplayId}`
          : `Porzucono prace nad zgłoszeniem: ${reportDisplayId}`,
    });
  };

  const assignToReportHandler = () => {
    mutateAsync({ admin: userId, status: 'inProgress' }).then(() =>
      onSuccess('assign')
    );
  };

  const unassignFromReportHandler = () => {
    mutateAsync({ admin: null, status: 'new' }).then(() =>
      onSuccess('unassign')
    );
  };

  return (assignedAdmin && !assignedToCurrentUser) ||
    status === 'solved' ? null : (
    <>
      <ListItemSection
        style={{
          justifyContent: 'center',
        }}
      >
        <ListItemSectionCell title="Akcje" style={{ alignItems: 'center' }}>
          {assignedToCurrentUser ? (
            <>
              <Button
                testId="unassigned-from-report-button"
                isLoading={isLoading}
                text="Porzuć zgłoszenie"
                buttonStyleType="mandy"
                onClick={unassignFromReportHandler}
              />
              <Button
                testId="solve-report-button"
                text="Rozwiąż zgłoszenie"
                onClick={changeModalVisibilityHandler}
                buttonStyleType="primary"
              />
            </>
          ) : (
            <Button
              testId="assigned-from-report-button"
              isLoading={isLoading}
              text="Przyjmij zgłoszenie"
              buttonStyleType="primary"
              onClick={assignToReportHandler}
            />
          )}
        </ListItemSectionCell>
      </ListItemSection>
      {isModalOpen && (
        <SolveReportModal
          onClose={changeModalVisibilityHandler}
          isOpen={isModalOpen}
          reportId={reportId}
          reportDisplayId={reportDisplayId}
        />
      )}
    </>
  );
};
