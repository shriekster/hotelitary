import { useState, useEffect, useRef } from 'react';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Typography  from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ro from 'date-fns/locale/ro';


export default function Rates(props) {

  const [roomTypeOptions, setRoomTypeOptions] = useState(() => []);
  const [roomTypeDescriptionOptions, setRoomTypeDescriptionOptions] = useState([]);

  const [snackbar, setSnackbar] = useState(null);

  const columns = [
    //{ field: 'attribute', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', cellClassName: 'Settings-attribute-cell'},
    { field: 'id', headerName: 'ID', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', hide: true, },
    { field: 'index', headerName: 'Nr. crt.', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'roomCategory', type: 'singleSelect', valueOptions: roomTypeOptions, headerName: 'Denumire spa??iu', flex: 2, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'roomCategoryDescription', type: 'singleSelect', valueOptions: roomTypeDescriptionOptions, headerName: 'Descriere', flex: 2, sortable: false, filterable: false, align: 'center', headerAlign: 'center',},
    { field: 'rate', headerName: 'Tarif (100%)', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true,},
  ];

  const [rows, setRows] = useState(() => []);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(true);

  const [selectionModel, setSelectionModel] = useState([]);

  const [date, setDate] = useState(new Date());

  const [existingDates, setExistingDates] = useState([]);

  //const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  const [selectedDate, setSelectedDate] = useState('');

  const [openOtherDialog, setOpenOtherDialog] = useState(false);////////////

  const descriptionMap = useRef(null);

  const [rowToAdd, setRowToAdd] = useState({
    id: '',
    index: '',
    roomCategory: '',
    roomCategoryDescription: '',
    rate: '',
  });

  const fetchHistoryAndLatestRates = async () => {
  // MUST FIX BUG
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
    };

    const response = await fetch('/api/hotels/1/rates/history', requestOptions);

    const json = await response.json();

    setLoading(false);

    if (response.ok) {

      if (!json.error) {

        const data = json.data;

        const newExistingDates = [...data.dates];
        const newRoomTypeOptions = [...data.roomTypeOptions];
        const newRoomTypeDescriptionOptions = [...data.roomTypeDescriptionOptions];
        const newRows = [...data.rates];

        descriptionMap.current = data.roomTypeDescriptionMap;

        setExistingDates(newExistingDates);
        setRoomTypeOptions(newRoomTypeOptions);
        setRoomTypeDescriptionOptions(newRoomTypeDescriptionOptions);
        //setSelectedDateIndex(0);
        setSelectedDate(newExistingDates[0])

        setRows((prevRows) => (newRows));

      } else {

        //setSnackbar({ children: json.message, severity: 'error' });
        descriptionMap.current = null;
        setExistingDates([]);
        setRoomTypeOptions([]);
        setRoomTypeDescriptionOptions([]);
        //setSelectedDateIndex(0);

        setRows((prevRows) => ([]));

      }

    } else {

      //setSnackbar({ children: json.message, severity: 'error' });
      descriptionMap.current = null;
      setExistingDates([]);
      setRoomTypeOptions([]);
      setRoomTypeDescriptionOptions([]);

      setRows((prevRows) => ([]));

    }

  }

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  }

  const handleCloseDialog = (event, reason) => {
    
    if (!loading) {

      setRowToAdd((prevRowToAdd) => ({
        ...prevRowToAdd,
        id: '',
        index: '',
        roomCategory: '',
        roomCategoryDescription: '',
        rate: '',

      }));

      setOpenDialog(false);

    } else {

      event.preventDefault();

    }
    
  }
  
  const handleCellEditCommit = async (params) => {

    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          field: params.field,
          value: params.value
      }),
    };

    const response = await fetch(`/api/hotels/1/rates/${params.id}`, requestOptions);
    const json = await response.json();

    if (response.ok) {

      setSnackbar({ children: 'Actualizat!', severity: 'success' });

      if (params.field === 'roomCategory') {

        if (!!descriptionMap.current && !!descriptionMap.current[`${params.value}`]) {

          setRows((prevRows) => prevRows.map((row) => (row.id === params.id ? { ...row, [`${params.field}`]: params.value || '---', ['roomCategoryDescription']: descriptionMap.current[`${params.value}`] } : row)));

        } else {

          setRows((prevRows) => prevRows.map((row) => (row.id === params.id ? { ...row, [`${params.field}`]: params.value || '---' } : row)));

        }

      } else {

        setRows((prevRows) => prevRows.map((row) => (row.id === params.id ? { ...row, [`${params.field}`]: params.value || '---' } : row)));

      }

    } else {

      setSnackbar({ children: json.message, severity: 'error' });
      setRows((prevRows) => [...prevRows]);

    }

  }

  const handleAddRow = async () => {

    if (existingDates.length > 0 && existingDates.includes(selectedDate)) {

      let newId;

      const requestOptions = {
        method: 'GET',
        mode: 'cors',
      };

      const response = await fetch(`/api/hotels/1/rates/next-id`, requestOptions);
      const json = await response.json();
      
      if (response.ok && json.data && json.data.nextId) {

        newId = json.data.nextId;

      } else {

        newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;

      }

      const newIndex = rows.length > 0 ? Math.max(...rows.map((row) => row.index)) + 1 : 1;

      setRowToAdd((prevRowToAdd) => ({
        ...prevRowToAdd,
        id: newId,
        index: newIndex,
        roomCategory: '',
        roomCategoryDescription: '',
        rate: '',

      }));

      setOpenDialog(true);
    
    }

  }

  const handleNewCellEditCommit = (params) => {
    
    setRowToAdd((prevRowToAdd) => ({
      ...prevRowToAdd,
      [`${params.field}`]: params.value,
    }));

    if (params.field === 'roomCategory') {

      if (!!descriptionMap.current && !!descriptionMap.current[`${params.value}`]) {

          setRowToAdd((prevRowToAdd) => ({
            ...prevRowToAdd,
            ['roomCategoryDescription']: descriptionMap.current[`${params.value}`],
          }));

      } 

    }   

  }

  const handleSaveRow = async () => {

    const { id, index, roomCategory, roomCategoryDescription, rate } = rowToAdd;

    if (!!id && !!index && !!roomCategory && !!roomCategoryDescription && !!rate) {

      setLoading(true);

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rowToAdd),
      };

      const response = await fetch(`/api/hotels/1/rates/${selectedDate}`, requestOptions);
      const json = await response.json();

      setLoading(false);
      setOpenDialog(false);

      if (response.ok) {
        
        const newRows = [...rows];
        newRows.push({...rowToAdd});
        setRows(newRows);
        setSnackbar({ children: 'Ad??ugat!', severity: 'success' });

      } else {

        setSnackbar({ children: json.message, severity: 'error' });
        setRows((prevRows) => [...prevRows]);

      }

      queueMicrotask(() => {
        setRowToAdd((prevRowToAdd) => ({
          ...prevRowToAdd,
          id: '',
          index: '',
          roomCategory: '',
          roomCategoryDescription: '',
          rate: '',
        }));
      });

    } else {

      setSnackbar({ children: 'Completeaz?? toate c??mpurile!', severity: 'error' });

    }

  }

  const handleDeleteRows = async () => {

    if (selectionModel.length > 0) {

      setLoading(true);

      let requestOptions;

      if (selectionModel.length === rows.length) {

        requestOptions = {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: selectedDate,
            ids: selectionModel,
            deleteParent: true,
          }),
        };

      } else {

        requestOptions = {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: selectedDate,
            ids: selectionModel,
            deleteParent: false,
          }),
        };

      }

      const response = await fetch('/api/hotels/1/rates', requestOptions);
      const json = await response.json();

      setLoading(false);

      if (response.ok) {

        if (json.data.parentDeleted) {

          setSnackbar({ children: `Tarifele din ${selectedDate} au fost ??terse!`, severity: 'success' });

          await fetchHistoryAndLatestRates();

        } else {

          const newRows = rows.filter(row => !selectionModel.includes(row.id));

          setRows(newRows);
          setSnackbar({ children: json.message, severity: 'success' });

        }

      } else {

        setSnackbar({ children: json.message, severity: 'error' });
        setRows((prevRows) => [...prevRows]);

      }

    }

  }

  const handleCancelRow = async () => {

    setRowToAdd((prevRowToAdd) => ({
      ...prevRowToAdd,
      id: '',
      index: '',
      roomCategory: '',
      roomCategoryDescription: '',
      rate: '',
    }));

    setOpenDialog(false);

    if (rows.length === 0) {

      setLoading(true);

      const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          ids: [],
          deleteParent: true,
        }),
      };

      const response = await fetch('/api/hotels/1/rates', requestOptions);
      const json = await response.json();

      setLoading(false);

      if (response.ok) {

        if (json.data.parentDeleted) {

          setSnackbar({ children: `Adaug?? cel pu??in un tarif!`, severity: 'warning' });

        } else {

          setSnackbar({ children: 'Eroare la ad??ugare!', severity: 'error' });

        }

        //await fetchHistoryAndLatestRates();

      } else {

        setSnackbar({ children: 'Eroare la ad??ugare!', severity: 'error' });
        //setRows((prevRows) => [...prevRows]);

      }

      setSelectedDate('');

      await fetchHistoryAndLatestRates();

    }

  }

  const handleSelectionModelChange = (newSelectionModel) => {

    setSelectionModel(newSelectionModel);

  }

  const handleExistingDateChange = async (event, newValue) => {
    
    const formattedDate = newValue.split('.').reverse().join('-');

    const index = existingDates.indexOf(newValue);

    if (index >= 0 && index < existingDates.length) {
      
      setLoading(true);
      //setSelectedDateIndex(index);
      setSelectedDate(newValue);
  
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
      };
  
      const response = await fetch(`/api/hotels/1/rates/${formattedDate}`, requestOptions);

      const json = await response.json();

      setLoading(false);

      if (response.ok) {

        if (!json.error) {

          const data = json.data;

          const newRows = [...data.rates];
  
          setRows((prevRows) => (newRows));

        } else {

          setSnackbar({ children: json.message, severity: 'error' });

        }

      } else {

        setSnackbar({ children: json.message, severity: 'error' });

      }

  }

}

  const handleAddTable = () => {

    setOpenOtherDialog(true);

  }

  const handleCancelTable = () => {

    setDate(new Date());

    setOpenOtherDialog(false);

  }

  const handleSaveTable = async () => {

    let formattedDate = date.toLocaleDateString('ro-RO');

    if (formattedDate !== 'Invalid Date') {

      setLoading(true);

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formattedDate
        }),
      };

      const response = await fetch(`/api/hotels/1/rates`, requestOptions);
      const json = await response.json();

      setLoading(false);
      setOpenOtherDialog(false);

      if (response.ok) {
        
        const newExistingDates = [...existingDates];
        newExistingDates.push(formattedDate);
        newExistingDates.sort().reverse();
        //const newIndex = newExistingDates.indexOf(formattedDate);
        setExistingDates((prevExistingDates) => [...newExistingDates]);
        setSelectedDate(formattedDate);
        queueMicrotask( async () => {
          //console.log(existingDates, formattedDate)
          //if (existingDates.includes(formattedDate)) {
            //setSelectedDateIndex(newIndex);
            //setSelectedDate(formattedDate);
          //}

          setRows((prevRows) => ([]));
          //setSnackbar({ children: 'Ad??ugat!', severity: 'success' });

          // add at least a room rate
          let newId;

          const idRequestOptions = {
            method: 'GET',
            mode: 'cors',
          };
    
          const response = await fetch(`/api/hotels/1/rates/next-id`, idRequestOptions);
          const json = await response.json();
          
          if (response.ok && json.data && json.data.nextId) {
    
            newId = json.data.nextId;
    
          } else {
    
            newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    
          }
    
          const newIndex = rows.length > 0 ? Math.max(...rows.map((row) => row.index)) + 1 : 1;
    
          setRowToAdd((prevRowToAdd) => ({
            ...prevRowToAdd,
            id: newId,
            index: newIndex,
            roomCategory: '',
            roomCategoryDescription: '',
            rate: '',
    
          }));

          setOpenDialog(true);

        });
        

      } else {

        setSnackbar({ children: json.message, severity: 'error' });
        setExistingDates((prevExistingDates) => [...prevExistingDates]);

      }

      /*
      queueMicrotask(() => {
        setRowToAdd((prevRowToAdd) => ({
          ...prevRowToAdd,
          id: '',
          index: '',
          roomCategory: '',
          roomCategoryDescription: '',
          rate: '',
        }));
      });
      */

    } else {

      setSnackbar({ children: 'Completeaz?? toate c??mpurile!', severity: 'error' });

    }

  }

  const handleCloseOtherDialog = (event, reason) => {
    
    if (!loading) {

      setOpenOtherDialog(false);

    } else {

      event.preventDefault();

    }
    
  }

  useEffect(() => {

    fetchHistoryAndLatestRates();
  
  }, []);

  return (
    <div style={{
      height: 'calc(96vh - 112px)',
      width: '96%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        height: '56px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
      }}>
        <Tooltip title={<Typography>Mergi la meniul anterior</Typography>}
          arrow={true}
          placement='right'>
          <IconButton size='small' color='primary' onClick={props.goBack}>
            <NavigateBeforeIcon fontSize='large'/>
          </IconButton>
        </Tooltip>
        <div style={{
          height: '56px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default'
        }}>
          <Typography variant='h6'>
              Tarifele de cazare din
          </Typography>
          <Autocomplete
            disableClearable
            //value={existingDates[selectedDateIndex]}
            value={selectedDate}
            onChange={handleExistingDateChange}
            id='existingDates'
            options={existingDates}
            noOptionsText='nu exist??'
            size='small'
            sx={{ width: '300px', marginLeft: '8px'}}
            renderInput={(params) => <TextField {...params}/>}
          />
          <Tooltip title={<Typography variant='body2'>Adaug?? set de tarife (actualizeaz??)</Typography>}
            arrow={true}
            placement='right'>
            <IconButton sx={{
              marginLeft: '4px',
            }}
            onClick={handleAddTable}>
              <AddBoxOutlinedIcon fontSize='large' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <DataGrid sx={{
          width: '100%',
        }}
        rows={rows} 
        columns={columns}
        onCellEditCommit={handleCellEditCommit}
        disableColumnMenu 
        hideFooterPagination 
        hideFooterSelectedRowCount
        localeText={{
          noRowsLabel: 'Nu exist?? date'
        }} 
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectionModel} />
      {
        loading &&
        <div style={{
          position: 'absolute',
          top: '56px',
          left: 0,
          height: 'calc(96vh - 224px)',
          width: '100%',
          background: 'rgba(128, 128, 128, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CircularProgress disableShrink/>
        </div>
      }
        <div style={{
          height: '56px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          }}>
            <Tooltip title={<Typography variant='body2'>{selectionModel.length === 0 ? `??terge` : `??terge ${selectionModel.length === 1 ? 'tariful' : 'tarifele'} din data selectat??`}</Typography>}
              arrow={true}
              placement='right'>
              <span>
              <IconButton color='error'
                disabled={selectionModel.length === 0}
                size='small'
                onClick={handleDeleteRows}>
                <DeleteForeverIcon fontSize='large'/>
              </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={<Typography variant='body2'>{existingDates.length ? 
              `Adaug?? un tarif valabil din ${selectedDate}` : 
              `Adaug??`}</Typography>}
              arrow={true}
              placement='left'>
              <span>
              <Fab color='primary' 
                aria-label='adaug??'
                onClick={handleAddRow}
                disabled={!existingDates.length}>
                <AddIcon />
              </Fab>
              </span>
            </Tooltip>
        </div>
        <Dialog fullWidth
          maxWidth={false} 
          onClose={handleCloseDialog} 
          open={openDialog}>
          <DialogTitle sx={{textAlign: 'center'}}>
            Adaug?? un tarif valabil din {selectedDate}
          </DialogTitle>
          <DialogContent sx={{
            height: '50vh',
            position: 'relative'
          }}>
          <DataGrid sx={{
              width: '100%',
            }} 
            rows={[rowToAdd]} 
            columns={columns}
            onCellEditCommit={handleNewCellEditCommit}
            disableColumnMenu 
            hideFooterPagination 
            hideFooterSelectedRowCount
            localeText={{
              noRowsLabel: 'Nu exist?? date'
            }}
            />
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
          </DialogContent>
          <DialogActions sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}>
            <Button autoFocus
              variant='contained'
              color='primary'
              onClick={handleSaveRow}
              disabled={loading}>
              Salveaz??
            </Button>
            <Button variant='contained'
              color='error'
              onClick={handleCancelRow}
              disabled={loading}>
              Renun????
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog 
          maxWidth={false} 
          onClose={handleCloseOtherDialog} 
          open={openOtherDialog}>
          <DialogTitle sx={{textAlign: 'center'}}>
            Actualizare valabil?? ??ncep??nd cu {date.toLocaleDateString('ro-RO')}
          </DialogTitle>
          <DialogContent sx={{
            height: '50vh',
            position: 'relative'
          }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}
              locale={ro}>
                <StaticDatePicker
                  displayStaticWrapperAs='desktop'
                  openTo='day'
                  views={['day']}
                  value={date}
                  onChange={(newDate) => { setDate(newDate) }}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
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
          </DialogContent>
          <DialogActions sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}>
            <Button autoFocus
              variant='contained'
              color='primary'
              onClick={handleSaveTable}
              disabled={loading}>
              Salveaz??
            </Button>
            <Button variant='contained'
              color='error'
              onClick={handleCancelTable}
              disabled={loading}>
              Renun????
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

