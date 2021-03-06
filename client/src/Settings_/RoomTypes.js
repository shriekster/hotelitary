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


export default function RoomTypes(props) {

  const [roomTypeOptions, setRoomTypeOptions] = useState(() => []);
  const [bedTypeOptions, setBedTypeOptions] = useState(() => []);
  const [confortTypeOptions, setConfortTypeOptions] = useState(() => []);

  const [snackbar, setSnackbar] = useState(null);

  const columns = [
    //{ field: 'attribute', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', cellClassName: 'Settings-attribute-cell'},
    { field: 'id', headerName: 'ID', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', hide: true, },
    { field: 'roomCategory', type: 'singleSelect', valueOptions: roomTypeOptions, headerName: 'Tip modul', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'numberOfBeds', type: 'singleSelect', valueOptions: [1, 2, 3, 4, 5], headerName: 'Paturi', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true,},
    { field: 'bedType', type: 'singleSelect', valueOptions: bedTypeOptions, headerName: 'Tip pat', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'confortType', type: 'singleSelect', valueOptions: confortTypeOptions, headerName: 'Confort', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true, },
    { field: 'roomType', headerName: 'Denumire spa??iu', flex: 2, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
  ];

  const [rows, setRows] = useState(() => []);

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(true);

  const [selectionModel, setSelectionModel] = useState([]);

  const rowToAdd = useRef({
    id: '',
    roomCategory: '',
    numberOfBeds: '',
    bedType: '',
    confortType: '',
    roomType: '',
  });

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  }

  const handleCloseDialog = (event, reason) => {
    
    if (!loading) {

      if (rowToAdd.current) {

        rowToAdd.current.id = '';
        rowToAdd.current.roomCategory = '';
        rowToAdd.current.numberOfBeds = '';
        rowToAdd.current.bedType = '';
        rowToAdd.current.confortType = '';
        rowToAdd.current.roomType = '';
  
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

    const response = await fetch(`/api/hotels/1/room-types/${params.id}`, requestOptions);
    const json = await response.json();

    if (response.ok) {

      setSnackbar({ children: 'Actualizat!', severity: 'success' });
      setRows((prevRows) => prevRows.map((row) => (row.id === params.id ? { ...row, [`${params.field}`]: params.value || '---' } : row)),
    );

    } else {

      setSnackbar({ children: json.message, severity: 'error' });
      setRows((prevRows) => [...prevRows]);

    }

  }

  const handleAddRow = () => {

    const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;

    if (rowToAdd.current) {

      rowToAdd.current.id = newId;

    }

    setSelectionModel([]);
    setOpenDialog(true);
    
  }

  const handleNewCellEditCommit = (params) => {

    if (rowToAdd.current) {

      rowToAdd.current[`${params.field}`] = params.value;

    }

  }

  const handleSaveRow = async () => {

    if (rowToAdd.current) {

      const { id, roomCategory, numberOfBeds, bedType, confortType, roomType } = rowToAdd.current;

      if (!!id && !!roomCategory && !!numberOfBeds && !!bedType && !!confortType && !!roomType) {

        setLoading(true);

        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rowToAdd.current),
        };

        const response = await fetch(`/api/hotels/1/room-types`, requestOptions);
        const json = await response.json();

        setLoading(false);
        setOpenDialog(false);

        if (response.ok) {
          
          const newRows = [...rows];
          newRows.push({...rowToAdd.current});
          setRows(newRows);
          setSnackbar({ children: 'Ad??ugat!', severity: 'success' });

        } else {

          setSnackbar({ children: json.message, severity: 'error' });
          setRows((prevRows) => [...prevRows]);

        }

        rowToAdd.current.id = '';
        rowToAdd.current.roomCategory = '';
        rowToAdd.current.numberOfBeds = '';
        rowToAdd.current.bedType = '';
        rowToAdd.current.confortType = '';
        rowToAdd.current.roomType = '';

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

      const response = await fetch('/api/hotels/1/room-types', requestOptions);
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
      rowToAdd.current.roomCategory = '';
      rowToAdd.current.numberOfBeds = '';
      rowToAdd.current.bedType = '';
      rowToAdd.current.confortType = '';
      rowToAdd.current.roomType = '';

    }

    setOpenDialog(false);

  }

  const handleSelectionModelChange = (newSelectionModel) => {

    setSelectionModel(newSelectionModel);

  }

  useEffect(() => {

    async function fetchRoomTypes() {
  
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
      };
  
      const response = await fetch('/api/hotels/1/room-types', requestOptions);

      const json = await response.json();

      setLoading(false);

      if (response.ok) {

        if (!json.error) {

          const data = json.data;

          const newRoomTypeOptions = [...data.roomOptions];
          const newBedTypeOptions = [...data.bedOptions]
          const newConfortTypeOptions = [...data.confortOptions];
          const newRows = [...data.roomTypes];

          setRoomTypeOptions(newRoomTypeOptions);
          setBedTypeOptions(newBedTypeOptions);
          setConfortTypeOptions(newConfortTypeOptions);
  
          setRows((prevRows) => (newRows));

        } else {

          setSnackbar({ children: json.message, severity: 'error' });

        }

      } else {

        setSnackbar({ children: json.message, severity: 'error' });

      }
  
    }

    fetchRoomTypes();
  
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
              Categorii spa??ii
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
            <Tooltip title={<Typography>{selectionModel.length === 0 ? `??terge` : `??terge ${selectionModel.length === 1 ? 'categoria' : 'categoriile'} de spa??iu`}</Typography>}
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
            <Tooltip title={<Typography>Adaug?? o categorie de spa??iu</Typography>}
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
            Adaug?? o categorie de spa??iu
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

