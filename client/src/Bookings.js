import { useState, useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';

export default function Bookings() {
  const [value, setValue] = useState(new Date());

  return (
    <div className='Bookings-root'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
            <MobileDatePicker
            label="Versiunea 1 (mobil)"
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
            label="Versiunea 2 (desktop)"
            value={value}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
            disableFuture
            label="Versiunea 3 (responsive)"
            openTo="year"
            views={['year', 'month', 'day']}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            />
        </Stack>
        </LocalizationProvider>
        <div>
            TABEL REZERVARI
        </div>
    </div>
  );
}

