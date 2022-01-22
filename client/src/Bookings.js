import React, { useState, useEffect, useRef } from 'react';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ro from 'date-fns/locale/ro';
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import PickersDay from '@mui/lab/PickersDay';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';
import EventIcon from '@mui/icons-material/Event';

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

/**
 * status = {
 * 0: in asteptare
 * 1: confirmata (in desfasurare)
 * 2: incheiata
 * }
 */ 

export default function Bookings() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingDates, setBookingDates] = useState([null, null]);
  const [bookings, setBookings] = useState([]);

  const [loadingBookedDates, setLoadingBookedDates] = useState(false);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState(null);

  const datesAbortController = useRef(null);

  const fetchBookedDates = async (date) => {

    if (date === undefined) {

      date = new Date().toLocaleDateString('ro-RO').split('.').reverse().join('-');

    }

    const controller = new AbortController();

    setLoadingBookedDates(true);

      const requestOptions = {
        method: 'GET',
        mode: 'cors',
        signal: controller.signal,
      };

      let response, json, err;

      try {

        response = await fetch(`/api/hotels/1/bookings/dates/${date}`, requestOptions);
  
        json = await response.json();

      } catch (error) {

        err = error;

      } finally {

        setLoadingBookedDates(false);

        if (!err || (!!err && err.name === 'AbortError')) {

          if (response.ok) {
          
            const data = json.data;
  
            if (data && data.bookedDates) {
  
                setBookedDates((prevBookedDates) => ([...data.bookedDates]));
  
            }
  
          } else {
      
            setSnackbar({ children: 'Eroare, încearcă din nou!', severity: 'error' });
      
          }

        } else {
      
          setSnackbar({ children: 'Eroare, încearcă din nou!', severity: 'error' });
    
        }
    
      }
  
      datesAbortController.current = controller;
    
  }

  const fetchBookings = async (date) => {

    if (date === undefined) {

      date = new Date().toLocaleDateString('ro-RO').split('.').reverse().join('-');

    }

    const requestOptions = {
      method: 'GET',
      mode: 'cors',
    };

    let response, json, err;

    try {

      response = await fetch(`/api/hotels/1/bookings/${date}`, requestOptions);

      json = await response.json();

    } catch (error) {

      err = error;

    } finally {

      setLoading(false);

      if (!err) {

        if (response.ok) {
        
          const data = json.data;

          if (data && data.bookings) {

            setBookings((prevBookings) => ([...data.bookings]));

          }

        } else {
    
          setSnackbar({ children: 'Eroare, încearcă din nou!', severity: 'error' });
    
        }

      } else {
    
        setSnackbar({ children: 'Eroare, încearcă din nou!', severity: 'error' });
  
      }
  
    }
    
  }

  const handleCloseSnackbar = () => {
      setSnackbar(null);
  }

  const handleMonthChange = (date) => {
    
    if (datesAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      datesAbortController.current.abort();

    }

    setBookedDates([]);
    setLoadingBookedDates(true);

    const [year, month] = date.toLocaleDateString('ro-RO').split('.').reverse();
    const yearAndMonth = `${year}-${month}`;
    fetchBookedDates(yearAndMonth);

  }

  const handleDateChange = (date) => {

    setSelectedDate(date);

    setLoading(true);

    const formattedDate = date.toLocaleDateString('ro-RO').split('.').reverse().join('-');

    fetchBookings(formattedDate);

  }

  useEffect(() => {

      fetchBookedDates();

      fetchBookings();

      return () => datesAbortController.current?.abort();

  }, []);

  return (
  <div className='Bookings-root'>
      <div className='Bookings-title'>
          <Typography sx={{marginRight: '8px'}} variant='h6'>Evidența personalului cazat în hotel la data de</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ro} mask={'__.__.____'}>
              <DatePicker
                  loading={loadingBookedDates}
                  readOnly={loading}
                  renderLoading={() => <CircularProgress disableShrink />}
                  value={selectedDate}
                  views={['year', 'month', 'day']}
                  openTo='day'
                  onChange={handleDateChange}
                  onMonthChange={handleMonthChange}
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
            
                      return (
                        <Badge
                        key={day.toString()}
                        overlap="circular"
                        badgeContent={isSelected ? '📅' : undefined}
                      >
                        <PickersDay {...DayComponentProps} />
                      </Badge>
                      );
                    }}
              />
          </LocalizationProvider>
      </div>
      <div className='Bookings-data'>
        {
          loading ? (
            <div className='Bookings-loading'>
              <CircularProgress disableShrink />
            </div>
          ) : (
          <TableContainer component={Paper}>
              <Table sx={{ width: '100%' }} aria-label="simple table">
                  <TableHead>
                  <TableRow>
                      <TableCell align='center'>ID rezervare</TableCell>
                      <TableCell align='center'>Nr. cameră</TableCell>
                      <TableCell align='center'>Nume și prenume</TableCell>
                      <TableCell align='center'>Scopul sosirii</TableCell>
                      <TableCell align='center'>Perioada</TableCell>
                      <TableCell align='center'>Total de plată</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      bookings.map((booking, bookingIndex) => { 
                        let firstCellRowSpan = 0;
                        for (let i = 0; i < booking.camere.length; i++) {
                          for (let j = 0; j < booking.camere[i].turisti.length; j++) {
                            firstCellRowSpan++;
                          }
                        }
                        return booking.camere.map((room, roomIndex) => {
                          const secondCellRowSpan = room.turisti.length;
                          return room.turisti.map((tourist, touristIndex) => {
                            return !roomIndex && !touristIndex ? (
                            <TableRow>
                              <TableCell align='center' rowSpan={firstCellRowSpan}>{booking.id}</TableCell>
                              <TableCell align='center' rowSpan={secondCellRowSpan}>{room.numar}</TableCell>
                              <TableCell align='center'>{tourist.numeComplet}</TableCell>
                              <TableCell align='center'>{tourist.scopSosire}</TableCell>
                              <TableCell align='center'>{tourist.perioada}</TableCell>
                              <TableCell align='center'>{tourist.totalPlata}</TableCell>
                            </TableRow>
                            ) : (
                              !touristIndex ? (
                              <TableRow>
                                <TableCell align='center' rowSpan={secondCellRowSpan}>{room.numar}</TableCell>
                                <TableCell align='center'>{tourist.numeComplet}</TableCell>
                                <TableCell align='center'>{tourist.scopSosire}</TableCell>
                                <TableCell align='center'>{tourist.perioada}</TableCell>
                                <TableCell align='center'>{tourist.totalPlata}</TableCell>
                              </TableRow>
                              ) : (
                                <TableRow>
                                  <TableCell align='center'>{tourist.numeComplet}</TableCell>
                                  <TableCell align='center'>{tourist.scopSosire}</TableCell>
                                  <TableCell align='center'>{tourist.perioada}</TableCell>
                                  <TableCell align='center'>{tourist.totalPlata}</TableCell>
                                </TableRow>
                              )
                            )
                          })
                        })
                      })
                    }
                  </TableBody>
              </Table>
          </TableContainer>)
        }
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

