import { IconButton, Modal } from '@mui/material';
import { Button, Select, Textarea } from 'components';
import { SingleValue } from 'react-select';
import { solveReportOptions } from 'shared/constants/options';
import { SelectOptionType } from 'shared/types/repeatableTypes';
import { useQueryClient } from 'react-query';
import { useUpdateReport } from 'api/useUpdateReport';
import { customToast } from 'shared/hooks/customToast';
import { useFormik } from 'formik';
import ClearIcon from '@mui/icons-material/Clear';
import './SolveReportModal.scss';

type SolveReportModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  reportDisplayId: string;
};

export const SolveReportModal = ({
  isOpen,
  onClose,
  reportId,
  reportDisplayId,
}: SolveReportModalPropsType) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useUpdateReport(reportId);

  const onSuccess = () => {
    queryClient.invalidateQueries('reports');
    queryClient.invalidateQueries('userReports');
    queryClient.invalidateQueries('user');
    customToast({ text: `Rozwiązano zgłoszenie ${reportDisplayId}` });
    onClose();
  };

  const formik = useFormik<{
    adminComment: string;
    reportSolution: SelectOptionType | null;
  }>({
    initialValues: {
      adminComment: '',
      reportSolution: null,
    },
    onSubmit: ({ reportSolution, adminComment }) => {
      if (reportSolution) {
        mutateAsync({
          reportSolution: reportSolution?.value,
          adminComment,
          status: 'solved',
        }).then(() => onSuccess());
      }
    },
  });

  const changeReportSolutionHandler = (value: SingleValue<SelectOptionType>) =>
    formik.setFieldValue('reportSolution', value);

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
        className="solve-report-modal"
        data-testid="solve-report-modal"
        onSubmit={formik.handleSubmit}
      >
        <IconButton
          className="solve-report-modal__exit-button"
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
        <div className="solve-report-modal__text">
          <div style={{ padding: '1rem' }}>
            <h1>Rozwiąż zgłoszenie {reportDisplayId}</h1>
          </div>
        </div>
        <div className="solve-report-modal__content">
          <div>
            <p className="solve-report-modal__label">Rozwiązanie zgłoszenia</p>
            <Select
              value={formik.values.reportSolution}
              options={solveReportOptions}
              onChange={changeReportSolutionHandler}
              placeholder="Rozwiązanie"
              inputId="solve-report-solution"
            />
          </div>
          <div>
            <p className="solve-report-modal__label">
              Komentarz do rozwiązania
            </p>
            <Textarea
              name="adminComment"
              placeholder="Komentarz"
              minRows={3}
              value={formik.values.adminComment}
              onChange={formik.handleChange}
            />
          </div>
          <div className="solve-report-modal__buttons">
            <Button
              onClick={onClose}
              buttonStyleType="primary"
              text="Anuluj"
              testId="cancel-solve-report-button"
            />
            <Button
              type="submit"
              isDisabled={!formik.values.reportSolution || isLoading}
              buttonStyleType="mandy"
              text="Rozwiąż"
              testId="submit-solve-report-button"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
