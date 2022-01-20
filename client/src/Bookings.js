import { useState, useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ro from 'date-fns/locale/ro';
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import PickersDay from '@mui/lab/PickersDay';
import CircularProgress from '@mui/material/CircularProgress';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function Bookings() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookedDates, setBookedDates] = useState([]);
    const [bookingDates, setBookingDates] = useState([null, null]);

    const [loadingBookedDates, setLoadingBookedDates] = useState(false);
    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState(null);

    const fetchBookedDates = async () => {

        setLoadingBookedDates(true);

          const requestOptions = {
            method: 'GET',
            mode: 'cors',
          };
      
          const response = await fetch('/api/hotels/1/bookings/dates', requestOptions);
      
          const json = await response.json();
      
          setLoadingBookedDates(false);
      
          if (response.ok) {
            
            const data = json.data;

            if (data && data.bookedDates) {
                console.log(data)
                setBookedDates((prevBookedDates) => ([...data.bookedDates]));

            }

          } else {
      
            setSnackbar({ children: 'Eroare, reîncarcă pagina!', severity: 'error' });
      
          }
      
    }

    const handleCloseSnackbar = () => {
        setSnackbar(null);
    }

    useEffect(() => {

        fetchBookedDates();

    }, []);

    return (
    <div className='Bookings-root'>
        <div className='Bookings-title'>
            <Typography sx={{marginRight: '8px'}} variant='h6'>Evidența personalului cazat în hotel la data de</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ro} mask={'__.__.____'}>
                <DatePicker
                    loading={loadingBookedDates}
                    renderLoading={() => <CircularProgress disableShrink />}
                    value={selectedDate}
                    views={['year', 'month', 'day']}
                    openTo='day'
                    onChange={(newDate) => {
                    setSelectedDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} size='small' variant='outlined'
                        inputProps={{
                            ...params.inputProps,
                            readOnly: true
                    }}/>}
                    renderDay={(day, _value, DayComponentProps) => {
                        const formattedDate = day.toLocaleDateString('ro-RO').split('.').reverse().join('-');
                        const isSelected =
                          !DayComponentProps.outsideCurrentMonth &&
                          bookedDates.includes(formattedDate);
              
                        return ( !isSelected ?
                            <PickersDay sx={{color: 'greenyellow'}} {...DayComponentProps} /> :
                            <PickersDay {...DayComponentProps} /> 
                        );
                      }}
                />
            </LocalizationProvider>
        </div>
        <div className='Bookings-data'>
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <div className='Bookings-buttons'>

        </div>
        {!!snackbar && (
          <Snackbar open 
            onClose={handleCloseSnackbar} 
            autoHideDuration={3000}
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'top',
            }}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
    </div>
    );
}

