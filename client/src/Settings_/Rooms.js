// STATUS camera: -1: curatenie, 0 - libera,  1 - rezervata, 2 - ocupata
// STATUS rezervare: -1: in asteptare, 0 - activa, 1 - incheiata 

import { useState, useEffect, useRef } from 'react';

import { DataGrid, GridRowsProp, GridColDef,   
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector, } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
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

function CustomPagination() {

  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );

}

export default function Rooms(props) {

  const [floorOptions, setFloorOptions] = useState(() => []);
  const [roomTypeOptions, setRoomTypeOptions] = useState(() => []);

  const [snackbar, setSnackbar] = useState(null);

  const columns = [
    //{ field: 'attribute', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', cellClassName: 'Settings-attribute-cell'},
    { field: 'id', headerName: 'ID', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', hide: true },
    { field: 'floor', type: 'singleSelect', valueOptions: floorOptions, headerName: 'Etaj', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'number', headerName: 'Num??r', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true,},
    { field: 'roomType', type: 'singleSelect', valueOptions: roomTypeOptions, headerName: 'Denumire spa??iu', flex: 2, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'status', headerName: 'Status', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: false, },
  ];

  const roomStatuses = {

    '-1': 'cur????enie',
    '0': 'liber',
    '1': 'rezervat',
    '2': 'ocupat'
      
  }

  const [rows, setRows] = useState(() => []);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(true);

  const [selectionModel, setSelectionModel] = useState([]);

  const rowToAdd = useRef({
    id: '',
    floor: '',
    number: '',
    roomType: '',
    status: '',
  });

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  }

  const handleCloseDialog = (event, reason) => {
    
    if (!loading) {

      if (rowToAdd.current) {

        rowToAdd.current.id = '';
        rowToAdd.current.floor = '';
        rowToAdd.current.number = '';
        rowToAdd.current.roomType = '';
        rowToAdd.current.status = '';
  
      }

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

    const response = await fetch(`/api/hotels/1/rooms/${params.id}`, requestOptions);
    const json = await response.json();

    if (response.ok) {

      setSnackbar({ children: 'Actualizat!', severity: 'success' });
      setRows((prevRows) => prevRows.map((row) => (row.id === params.id ? { ...row, [`${params.field}`]: params.value || '---' } : row)));

    } else {

      setSnackbar({ children: json.message, severity: 'error' });
      setRows((prevRows) => [...prevRows]);

    }

  }

  const handleAddRow = () => {

    const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;

    if (rowToAdd.current) {

      rowToAdd.current.id = newId;
      rowToAdd.current.status = 'liber';

    }

    setSelectionModel([]);
    setOpenDialog(true);
    
  }

  const handleNewCellEditCommit = (params) => {

    if (rowToAdd.current) {

      rowToAdd.current[`${params.field}`] = params.value;

      if (params.field === 'number' && params.value.includes('-')) {
          // ADD ROOM INTERVAL - server side
      }

    }

  }

  const handleSaveRow = async () => {

    if (rowToAdd.current) {

      const { id, floor, number, roomType, status } = rowToAdd.current;

      if (!!id && !!floor && !!number && !!roomType && !!status) {

        setLoading(true);

        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rowToAdd.current),
        };

        const response = await fetch(`/api/hotels/1/rooms`, requestOptions);
        const json = await response.json();

        setLoading(false);
        setOpenDialog(false);

        if (response.ok) {
          
          let newRows = [...rows];

          if (json.data && json.data.rooms && json.data.rooms.length) {

            newRows = [...json.data.rooms];

          } else {

            newRows.push({...rowToAdd.current});

          }
          
          setRows(newRows);
          setSnackbar({ children: 'Ad??ugat!', severity: 'success' });

        } else {

          setSnackbar({ children: json.message, severity: 'error' });
          setRows((prevRows) => [...prevRows]);

        }

        rowToAdd.current.id = '';
        rowToAdd.current.floor = '';
        rowToAdd.current.number = '';
        rowToAdd.current.roomType = '';
        rowToAdd.current.status = '';

      } else {

        setSnackbar({ children: 'Completeaz?? toate c??mpurile!', severity: 'error' });

      }

    }

  }

  const handleDeleteRows = async () => {

    if (selectionModel.length > 0) {

      setLoading(true);

      const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: selectionModel,
        }),
      };

      const response = await fetch('/api/hotels/1/rooms', requestOptions);
      const json = await response.json();

      setLoading(false);

      if (response.ok) {
          
        const newRows = rows.filter(row => !selectionModel.includes(row.id));
        setRows(newRows);
        setSnackbar({ children: json.message, severity: 'success' });

      } else {

        setSnackbar({ children: json.message, severity: 'error' });
        setRows((prevRows) => [...prevRows]);

      }

    }

  }

  const handleCancelRow = () => {

    if (rowToAdd.current) {

        rowToAdd.current.id = '';
        rowToAdd.current.floor = '';
        rowToAdd.current.number = '';
        rowToAdd.current.roomType = '';
        rowToAdd.current.status = '';

    }

    setOpenDialog(false);

  }

  const handleSelectionModelChange = (newSelectionModel) => {

    setSelectionModel(newSelectionModel);

  }

  useEffect(() => {

    async function fetchRooms() {
  
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
      };
  
      const response = await fetch('/api/hotels/1/rooms', requestOptions);

      const json = await response.json();

      setLoading(false);

      if (response.ok) {

        if (!json.error) {

          const data = json.data;

          const newFloorOptions = [...data.floorOptions];
          const newRoomTypeOptions = [...data.roomTypeOptions]
          const newRows = [...data.rooms];

          setFloorOptions(newFloorOptions);
          setRoomTypeOptions(newRoomTypeOptions);
  
          setRows((prevRows) => (newRows));

        } else {

          setSnackbar({ children: json.message, severity: 'error' });

        }

      } else {

        setSnackbar({ children: json.message, severity: 'error' });

      }
  
    }

    fetchRooms();
  
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
              Spa??ii (camere)
          </Typography>
        </div>
      </div>
      <DataGrid sx={{
          width: '100%',
        }}
        rows={rows} 
        columns={columns}
        onCellEditCommit={handleCellEditCommit}
        disableColumnMenu
        pagination
        hideFooterSelectedRowCount
        localeText={{
          noRowsLabel: 'Nu exist?? date',
          footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} din ${totalCount.toLocaleString()}`,
        }} 
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectionModel} 
        components={{
          Pagination: CustomPagination,
        }}/>
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
            <Tooltip title={<Typography>{selectionModel.length === 0 ? `??terge` : `??terge ${selectionModel.length === 1 ? 'spa??iu' : 'spa??ii'} de cazare`}</Typography>}
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
            <Tooltip title={<Typography>Adaug?? spa??ii de cazare</Typography>}
              arrow={true}
              placement='left'>
              <Fab color='primary' 
                aria-label='adaug??'
                onClick={handleAddRow}>
                <AddIcon />
              </Fab>
            </Tooltip>
        </div>
        <Dialog fullWidth
          maxWidth={false} 
          onClose={handleCloseDialog} 
          open={openDialog}>
          <DialogTitle sx={{textAlign: 'center'}}>
            Adaug?? spa??ii de cazare
          </DialogTitle>
          <DialogContent sx={{
            height: '50vh',
            position: 'relative'
          }}>
          <DataGrid sx={{
              width: '100%',
            }} 
            rows={[rowToAdd.current]} 
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

