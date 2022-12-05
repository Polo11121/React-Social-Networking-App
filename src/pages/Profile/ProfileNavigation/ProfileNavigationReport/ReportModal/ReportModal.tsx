import { IconButton, Modal } from '@mui/material';
import { Button, Select, Textarea } from 'components';
import { SingleValue } from 'react-select';
import { reportReasonOptions } from 'shared/constants/options';
import { SelectOptionType } from 'shared/types/repeatableTypes';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';
import { useReportUser } from 'api/useReportUser';
import { useAuthContext } from 'contexts/AuthContext';
import { customToast } from 'shared/hooks/customToast';
import { useFormik } from 'formik';
import ClearIcon from '@mui/icons-material/Clear';
import './ReportModal.scss';

export const ReportModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user } = useProfileInfo();
  const { userInfo, isAdmin } = useAuthContext();
  const onSuccess = () => {
    customToast({
      text: `Zgłoszono użytkownika ${user.fullName}`,
    });
    onClose();
  };
  const { mutate, isLoading } = useReportUser(onSuccess);

  const formik = useFormik<{
    userComment: string;
    reason: SelectOptionType | null;
  }>({
    initialValues: {
      userComment: '',
      reason: null,
    },
    onSubmit: ({ userComment, reason }) => {
      if (reason) {
        mutate({
          reason: reason?.value,
          userComment,
          reportedUser: user._id,
          reportingUser: userInfo._id,
          admin: isAdmin ? userInfo._id : null,
        });
      }
    },
  });

  const changeReasonHandler = (value: SingleValue<SelectOptionType>) =>
    formik.setFieldValue('reason', value);

  return (
    <Modal
      open={isOpen}
      style={{
        display: 'grid',
        placeItems: 'center',
      }}
      onClose={onClose}
    >
      <form
        className="report-modal"
        data-testid="report-user-modal"
        onSubmit={formik.handleSubmit}
      >
        <IconButton className="report-modal__exit-button" onClick={onClose}>
          <ClearIcon />
        </IconButton>
        <div className="report-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Zgłoś użytkownika</h1>
          </div>
        </div>
        <div className="report-modal__content">
          <div>
            <p className="report-modal__label">Wybierz problem</p>
            <Select
              value={formik.values.reason}
              options={reportReasonOptions}
              onChange={changeReasonHandler}
              placeholder="Problem"
              inputId="report-user-reason"
            />
          </div>
          <div>
            <p className="report-modal__label">Komentarz do zgłoszenia</p>
            <Textarea
              name="userComment"
              placeholder="Komentarz"
              minRows={3}
              value={formik.values.userComment}
              onChange={formik.handleChange}
              data-testid="report-user-comment"
            />
          </div>
          <div className="report-modal__buttons">
            <Button
              onClick={onClose}
              buttonStyleType="primary"
              text="Anuluj"
              testId="cancel-report-user-button"
            />
            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={!formik.values.reason}
              buttonStyleType="mandy"
              text="Zgłoś"
              testId="submit-delete-user-button"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
