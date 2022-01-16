import { useState, useEffect, useRef } from 'react';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Typography  from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


export default function RoomTypes(props) {

  const [roomTypeOptions, setRoomTypeOptions] = useState(() => []);
  const [bedTypeOptions, setBedTypeOptions] = useState(() => []);
  const [confortTypeOptions, setConfortTypeOptions] = useState(() => []);

  const [snackbar, setSnackbar] = useState(null);

  const columns = [
    //{ field: 'attribute', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', cellClassName: 'Settings-attribute-cell'},
    { field: 'id', headerName: 'ID', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', },
    { field: 'roomCategory', type: 'singleSelect', valueOptions: roomTypeOptions, headerName: 'Tip modul', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'numberOfBeds', type: 'singleSelect', valueOptions: [1, 2, 3, 4, 5], headerName: 'Paturi', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true,},
    { field: 'bedType', type: 'singleSelect', valueOptions: bedTypeOptions, headerName: 'Tip pat', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
    { field: 'confortType', type: 'singleSelect', valueOptions: confortTypeOptions, headerName: 'Confort', flex: 1, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true, },
    { field: 'roomType', headerName: 'Denumire spațiu', flex: 2, sortable: false, filterable: false, align: 'center', headerAlign: 'center', editable: true},
  ];

  const [rows, setRows] = useState(() => []);

  const handleCloseSnackbar = () => setSnackbar(null);
  
  const handleCellEditCommit = async (params) => {

    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          id: params.id,
          value: params.value || '---'
      }),
    };

    const response = await fetch('/api/hotels/1', requestOptions);
    const json = await response.json();

    if (response.ok) {

      setSnackbar({ children: 'Actualizat!', severity: 'success' });
      setRows((prevRows) => prevRows.map((row) => (row.id === params.id ? { ...row, value: params.value || '---' } : row)),
    );

    } else {

      setSnackbar({ children: json.message, severity: 'error' });
      setRows((prevRows) => [...prevRows]);

    }

  }

  useEffect(() => {

    async function fetchRoomTypes() {
  
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
      };
  
      const response = await fetch('/api/hotels/1/room-types', requestOptions);

      const json = await response.json();

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
      height: 'calc(96vh - 56px)',
      width: '96%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
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
          noRowsLabel: 'Nu există date'
        }} />
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

