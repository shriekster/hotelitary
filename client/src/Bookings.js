import React, { useState, useEffect, useRef, forwardRef } from 'react';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ro from 'date-fns/locale/ro';
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import PickersDay from '@mui/lab/PickersDay';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';

import DialogActions from '@mui/material/DialogActions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Slide from '@mui/material/Slide';

/**
 * status = {
 * 0: in asteptare
 * 1: confirmata (in desfasurare)
 * 2: incheiata
 * }
 */ 

const TransitionLeft = forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />;
});

const TransitionUp = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Bookings() {

  const scopuriSosire = [
    'Misiune',
    'Detașat',
    'Acord de reciprocitate',
    'Beneficiar gratuitate',
    'Interes personal',
    'Altele',
    //'Permanent',
  ];

  const scopuriSosireMap = {
    'Misiune': 1,
    'Detașat': 2,
    'Acord de reciprocitate': 3,
    'Beneficiar gratuitate': 4,
    'Interes personal': 5,
    'Altele': 6,
    //'Permanent': 7,
  };

  const touristDataColumns = [
    //{ field: 'attribute', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', cellClassName: 'Settings-attribute-cell'},
    { field: 'id', headerName: 'ID', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', hide: true, },
    { field: 'cnp', headerName: 'CNP', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'nume', headerName: 'Nume', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'prenume', headerName: 'Prenume', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'grad', headerName: 'Grad', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'institutie', headerName: 'U.M. și garnizoana', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'numarDocumentMilitar', headerName: 'Nr. ordin serviciu / legitimație', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'serieNumarCI', headerName: 'Serie și număr CI', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'scopSosire', type: 'singleSelect', valueOptions: scopuriSosire, headerName: 'Scop sosire', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'perioada', headerName: 'Perioada', flex: 2, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: false},
    { field: 'numarZile', headerName: 'Număr de zile', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'totalPlata', headerName: 'Total de plată', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},



  ]

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [bookingDates, setBookingDates] = useState([null, null]);
  const [bookings, setBookings] = useState([]);

  const [loadingBookedDates, setLoadingBookedDates] = useState(false);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState(null);

  const [openEditBooking, setOpenEditBooking] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(0);
  const [editingBookingData, setEditingBookingData] = useState({});

  const [openAddBooking, setOpenAddBooking] = useState(false);

  const [selectionModel, setSelectionModel] = useState([]);

  const [tabIndex, setTabIndex] = useState(0);
  

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

      response = await fetch(`/api/hotels/1/bookings/preview/${date}`, requestOptions);

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

  const handleEditBooking = async (bookingId) => {
        
    setEditingBookingId(bookingId); // bug here (??? editingBookingId does not update in time, most probably I do not yet fully understand React)
    setLoading(true);
    
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
    };

    let response, json, err;

    try {

      response = await fetch(`/api/hotels/1/bookings/${bookingId}`, requestOptions);

      json = await response.json();

    } catch (error) {

      err = error;

    } finally {
      
      setLoading(false);

      if (!err) {

        if (response.ok) {
        
          const data = json.data;

          if (data && data.booking.length === 1) {

            setEditingBookingData(data.booking);
            setOpenEditBooking(true);

          } else {

            setOpenEditBooking(false);
            //setLoading(false);
            setEditingBookingId(0);

          }

        } else {
    
          setSnackbar({ children: 'Eroare, încearcă din nou!', severity: 'error' });
          setLoading(true);

          const timeout = setTimeout(() => {
            setOpenEditBooking(false);
            setLoading(false);
            setEditingBookingId(0);
            clearTimeout(timeout);
          }, 1000);
    
        }

      } else {
    
        setSnackbar({ children: 'Eroare, încearcă din nou!', severity: 'error' });
        setLoading(true);

        const timeout = setTimeout(() => {
          setOpenEditBooking(false);
          setLoading(false);
          clearTimeout(timeout);
        }, 1000);
  
      }
  
    }

  }

  const handleCancelEditBooking = () => {
    setEditingBookingId(0);
    setOpenEditBooking(false);
  }

  const handleUpdateBooking = async () => {

  }

  const handleDeleteBooking = async () => {

    const requestOptions = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId: editingBookingId,
      })
    };

    let response, json, err;

    setLoading(true);

    try {

      response = await fetch(`/api/hotels/1/bookings`, requestOptions);

      json = await response.json();

    } catch (error) {

      err = error;

    } finally {

      setLoading(false);

      if (!err && response.ok) {

        setSnackbar({ children: json.message, severity: 'success' });

        queueMicrotask(() => {

          setOpenEditBooking(false);

        });

        queueMicrotask(async () => {

          await fetchBookedDates();

          await fetchBookings();

        });

      } else {

        setSnackbar({ children: json.message, severity: 'error' });

      }

    }

  }

  const handleAddBooking = () => {
    setOpenAddBooking(true);
  }

  const handleCancelAddBooking = () => {
    setOpenAddBooking(false);
  }

  const handleCreateBooking = async () => {

  }

  const handleSelectionModelChange = (newSelectionModel) => {

    setSelectionModel(newSelectionModel);

  }

  const handleChangeTabIndex = (event, newIndex) => {
    setTabIndex(newIndex);
    setSelectionModel([]);
  }

  const handleDeleteTourists = async (bookingId, roomNumber, touristIds) => {

    if (bookingId && roomNumber && touristIds && touristIds.length > 0) {

      const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: bookingId,
          roomNumber: roomNumber,
          touristIds: touristIds,
        })
      };
  
      let response, json, err;
  
      setLoading(true);
  
      try {
  
        response = await fetch(`/api/hotels/1/bookings/tourists`, requestOptions);
  
        json = await response.json();
  
      } catch (error) {
  
        err = error;
  
      } finally {
  
        setLoading(false);
  
        if (!err && response.ok) {
  
          setSnackbar({ children: json.message, severity: 'success' });
  
          queueMicrotask(async () => {
  
            await fetchBookedDates();
  
            await fetchBookings();

            await handleEditBooking(bookingId);
  
          });
  
        } else {
  
          setSnackbar({ children: json.message, severity: 'error' });
  
        }
  
      }

    }

  }

  const handleAddTourist = () => {

  }

  const handleUpdateRoom = () => {

  }

  const handleAddRoom = () => {

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
                  {
                    bookings.map((booking, bookingIndex) => 
                    {  
                      let firstCellRowSpan = 0;
                      for (let i = 0; i < booking.camere.length; i++) {
                        for (let j = 0; j < booking.camere[i].turisti.length; j++) {
                          firstCellRowSpan++;
                        }
                      }
                      return (
                        <TableBody key={booking.id} 
                          className='Bookings-tbody'
                          onClick={() => {handleEditBooking(booking.id)}}
                          title={`Modifică rezervarea #${booking.id}`}>
                        {
                        booking.camere.map((room, roomIndex) => {
                          const secondCellRowSpan = room.turisti.length;
                          return room.turisti.map((tourist, touristIndex) => {
                            return !roomIndex && !touristIndex ? (
                              <TableRow key={`${booking.id}-${tourist.id}`}>
                                <TableCell align='center' rowSpan={firstCellRowSpan}>{booking.id}</TableCell>
                                <TableCell align='center' rowSpan={secondCellRowSpan}>{room.numar}</TableCell>
                                <TableCell align='center'>{tourist.numeComplet}</TableCell>
                                <TableCell align='center'>{tourist.scopSosire}</TableCell>
                                <TableCell align='center'>{tourist.perioada}</TableCell>
                                <TableCell align='center'>{tourist.totalPlata}</TableCell>
                              </TableRow>
                            ) : (
                              !touristIndex ? (
                                <TableRow key={`${booking.id}-${tourist.id}`}>
                                  <TableCell align='center' rowSpan={secondCellRowSpan}>{room.numar}</TableCell>
                                  <TableCell align='center'>{tourist.numeComplet}</TableCell>
                                  <TableCell align='center'>{tourist.scopSosire}</TableCell>
                                  <TableCell align='center'>{tourist.perioada}</TableCell>
                                  <TableCell align='center'>{tourist.totalPlata}</TableCell>
                                </TableRow>
                              ) : (
                                <TableRow key={`${booking.id}-${tourist.id}`}>
                                  <TableCell align='center'>{tourist.numeComplet}</TableCell>
                                  <TableCell align='center'>{tourist.scopSosire}</TableCell>
                                  <TableCell align='center'>{tourist.perioada}</TableCell>
                                  <TableCell align='center'>{tourist.totalPlata}</TableCell>
                                </TableRow>
                              )
                            )
                          })
                        })}
                        </TableBody>)
                    })
                  }
              </Table>
          </TableContainer>)
        }
      </div>
      <div className='Bookings-buttons'>
      <Tooltip title={<Typography variant='body2'>Creează o rezervare</Typography>}
        arrow={true}
        placement='left'>
        <span>
        <Fab color='primary' 
          aria-label='adaugă'
          onClick={handleAddBooking}
          disabled={loading}>
          <AddIcon />
        </Fab>
        </span>
      </Tooltip>
      </div>
      <Dialog
        fullScreen
        open={openEditBooking}
        onClose={handleCancelEditBooking}
        TransitionComponent={TransitionUp}>
        <AppBar sx={{ position: 'relative', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Toolbar variant='dense'
            disableGutters
            sx={{width: '98%'}}>
            <Tooltip title={<Typography variant='body2'>{`Șterge rezervarea #${editingBookingId}`}</Typography>}
              arrow={true}
              placement='right'>
              <span>
              <IconButton color='error'
                disabled={loading}
                edge='start'
                onClick={handleDeleteBooking}>
                <DeleteForeverIcon/>
              </IconButton>
              </span>
            </Tooltip>
            <Typography sx={{ flex: 1, width: '100%', textAlign: 'center' }} variant="h6" component="div">
              Modifică rezervarea #{editingBookingId}
            </Typography>
            <IconButton
              disabled={loading}
              edge='end'
              color='error'
              onClick={handleCancelEditBooking}
              aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className='Bookings-edit-container'>
            <Tabs value={tabIndex} 
              onChange={handleChangeTabIndex} 
              sx={{width: '96%', margin: '0 auto'}}
              variant='scrollable'
              scrollButtons='auto'>
            {
            !!editingBookingData[0] && !!editingBookingData[0].camere.length &&
            editingBookingData[0].camere.map((room, roomIndex) => (
              <Tooltip title={<Typography variant='body2'>{`Tarif: ${room.tarif} RON, valabil din ${new Date(room.valabilitateTarif).toLocaleDateString('ro-RO')}`}</Typography>}
                key={`tooltip-${editingBookingData[0].id}-${room.numar}`}
                arrow={true}
                placement='bottom-end'>
                <Tab label={`Camera #${room.numar}`} {...a11yProps(roomIndex)}
                  key={`tab-${editingBookingData[0].id}-${room.numar}`}/>
              </Tooltip>
            ))
            }
            </Tabs>
            {
              !!editingBookingData[0] && !!editingBookingData[0].camere.length &&
              editingBookingData[0].camere.map((room, roomIndex) => (
                <TabPanel value={tabIndex} index={roomIndex}
                key={`tab-panel-${editingBookingData[0].id}-${room.numar}`}>
                <div className='Booking-room' >
                  <div className='Booking-room-buttons'>
                    <Tooltip title={<Typography variant='body2'>{`Alege altă cameră`}</Typography>}
                      arrow={true}
                      placement='top'>
                      <span>
                        <IconButton onClick={() => {handleUpdateRoom(editingBookingData[0].id, room.numar)}}
                          disabled={loading}
                          color='primary'>
                          <EditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title={<Typography variant='body2'>{`Adaugă cameră`}</Typography>}
                      arrow={true}
                      placement='top'>
                      <span>
                        <IconButton onClick={() => {handleAddRoom(editingBookingData[0].id)}}
                          disabled={loading}
                          color='primary'>
                          <AddBoxIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </div>
                  <DataGrid sx={{
                      width: '100%',
                    }} 
                    rows={room.turisti} 
                    columns={touristDataColumns}
                    //onCellEditCommit={handleNewCellEditCommit}
                    disableColumnMenu 
                    hideFooterPagination 
                    hideFooterSelectedRowCount
                    localeText={{
                      noRowsLabel: 'Nu există date'
                    }}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={handleSelectionModelChange}
                    selectionModel={selectionModel}
                    columnBuffer={2} 
                    columnThreshold={2}/>
                    {
                      loading &&
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '50vh',
                        width: '100%',
                        background: 'rgba(128, 128, 128, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CircularProgress disableShrink/>
                      </div>
                    }
                  <div className='Booking-tourist-buttons'>
                    <Tooltip title={<Typography variant='body2'>{`Șterge turiști`}</Typography>}
                        arrow={true}
                        placement='top'>
                        <span>
                          <IconButton onClick={() => {handleDeleteTourists(editingBookingData[0].id, room.numar, selectionModel)}}
                            disabled={loading || selectionModel.length === 0}
                            color='error'>
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title={<Typography variant='body2'>{`Adaugă turist`}</Typography>}
                        arrow={true}
                        placement='top'>
                        <span>
                          <IconButton onClick={() => handleAddTourist(editingBookingData[0].id, room.numar)}
                            disabled={loading || room.turisti.length === room.capacitate}
                            color='primary'>
                            <PersonAddIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                  </div>
                </div>
                </TabPanel>
              ))
            }
        </div>
        <DialogActions sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '56px'
        }}>
          <Button autoFocus
            variant='contained'
            color='primary'
            onClick={handleUpdateBooking}
            disabled={loading}>
            Salvează
          </Button>
          <Button variant='contained'
            color='error'
            onClick={handleCancelEditBooking}
            disabled={loading}>
            Renunță
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={openAddBooking}
        onClose={handleCancelAddBooking}
        TransitionComponent={TransitionLeft}>
        <AppBar sx={{ position: 'relative', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Toolbar variant='dense'
            disableGutters
            sx={{width: '98%'}}>
            <Typography sx={{ flex: 1, width: '100%', textAlign: 'center' }} variant="h6" component="div">
              Creează rezervare
            </Typography>
            <IconButton
              edge='end'
              color='error'
              onClick={handleCancelAddBooking}
              aria-label='close'
              disabled={loading}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className='Bookings-add-container'>
          
        </div>
        <DialogActions sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '56px'
        }}>
          <Button autoFocus
            variant='contained'
            color='primary'
            onClick={handleCreateBooking}
            disabled={loading}>
            Salvează
          </Button>
          <Button variant='contained'
            color='error'
            onClick={handleCancelAddBooking}
            disabled={loading}>
            Renunță
          </Button>
        </DialogActions>
      </Dialog>
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

