import { ChangeEvent } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type GenderRadioButtonsPropsType = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
};

export const GenderRadioButtons = ({
  value,
  onChange,
  isError,
}: GenderRadioButtonsPropsType) => (
  <FormControl style={{ marginBottom: '1rem' }}>
    <FormLabel style={{ color: 'black' }} focused={false}>
      Płeć
    </FormLabel>
    <RadioGroup row value={value} onChange={onChange}>
      <FormControlLabel
        color="error"
        value="female"
        control={
          <Radio
            sx={{
              color: isError && !value ? 'red' : '#006f71',
              '&.Mui-checked': {
                color: '#006f71',
              },
            }}
          />
        }
        label="Kobieta"
      />
      <FormControlLabel
        value="male"
        control={
          <Radio
            sx={{
              color: isError && !value ? 'red' : '#006f71',
              '&.Mui-checked': {
                color: '#006f71',
              },
            }}
          />
        }
        label="Mężczyzna"
      />
    </RadioGroup>
  </FormControl>
);
