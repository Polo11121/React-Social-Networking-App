import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pl } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './BirthDatePicker.scss';
import { ErrorText, Tooltip } from 'components';
import TooltipStories from 'components/Tooltip/Tooltip.stories';

type BirthDatePickerType = {
  value: Date | null;
  onChange: (value: Date | null) => {};
  error?: string;
};

export const BirthDatePicker = ({
  value,
  onChange,
  error,
}: BirthDatePickerType) => (
  <>
    <p style={{ marginBottom: '0.5rem' }}>Data urodzenia</p>
    <LocalizationProvider adapterLocale={pl} dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        onChange={onChange}
        value={value}
        renderInput={(params) => (
          <TextField
            {...params}
            error={Boolean(error)}
            style={{ marginBottom: '1rem', borderColor: 'red' }}
            fullWidth
            data-tip
            data-for="birthDate-picker"
            inputProps={{
              ...params.inputProps,
              placeholder: 'dd.mm.rrrr',
            }}
          />
        )}
      />
    </LocalizationProvider>
    <Tooltip
      isDisabled={!error}
      type="error"
      offset={{ bottom: 10 }}
      text={error}
      id="birthDate-picker"
      event="focusin"
      eventOff="focusout"
    />
  </>
);
