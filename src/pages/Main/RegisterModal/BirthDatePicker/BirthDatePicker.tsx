import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pl } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './BirthDatePicker.scss';

type BirthDatePickerType = {
  value: Date | null;
  onChange: (value: Date | null) => {};
  isError: boolean;
};

export const BirthDatePicker = ({
  value,
  onChange,
  isError,
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
            error={isError}
            style={{ marginBottom: '1rem', borderColor: 'red' }}
            fullWidth
            inputProps={{
              ...params.inputProps,
              placeholder: 'dd.mm.rrrr',
            }}
          />
        )}
      />
    </LocalizationProvider>
  </>
);
