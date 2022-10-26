import { Tooltip } from 'components';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { pl } from 'date-fns/locale';
import './BirthDatePicker.scss';

type BirthDatePickerPropsType = {
  value: Date | null;
  onChange: (value: Date | null) => {};
  error?: string;
};

export const BirthDatePicker = ({
  value,
  onChange,
  error,
}: BirthDatePickerPropsType) => (
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
