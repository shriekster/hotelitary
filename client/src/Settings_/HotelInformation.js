import { useState, useEffect, useRef } from 'react';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Typography  from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


export default function HotelInformation(props) {

  const columns = [
    { field: 'attribute', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', cellClassName: 'Settings-attribute-cell'},
    { field: 'value', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', editable: true, },
  ];

  const [rows, setRows] = useState(() => [
    { id: 3, attribute: 'Județ', value: '---' },
    { id: 4, attribute: 'Localitate', value: '---' },
    { id: 5, attribute: 'Stradă', value: '---' },
    { id: 6, attribute: 'Număr', value: '---' },
    { id: 7, attribute: 'Cod poștal', value: '---' },
    { id: 8, attribute: 'Telefon', value: '---' },
    { id: 9, attribute: 'Fax', value: '---' },
    { id: 10, attribute: 'Email', value: '---' },
    { id: 11, attribute: 'Website', value: '---' },
  ]);


  const [snackbar, setSnackbar] = useState(null);

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

    async function fetchHotelInformation() {
  
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
      };
  
      const response = await fetch('/api/hotels/1', requestOptions);

      const json = await response.json();

      if (response.ok) {

        if (!json.error) {

          const hotel = json.data;

          const newRows = [
            { id: 3, attribute: 'Județ', value: hotel.judet || '---' },
            { id: 4, attribute: 'Localitate', value: hotel.localitate || '---' },
            { id: 5, attribute: 'Stradă', value: hotel.strada || '---' },
            { id: 6, attribute: 'Număr', value: hotel.numar || '---' },
            { id: 7, attribute: 'Cod poștal', value: hotel.codPostal || '---' },
            { id: 8, attribute: 'Telefon', value: hotel.telefon || '---' },
            { id: 9, attribute: 'Fax', value: hotel.fax || '---' },
            { id: 10, attribute: 'Email', value: hotel.email || '---' },
            { id: 11, attribute: 'Website', value: hotel.website || '---' },
          ];
  
          setRows((prevRows) => (newRows));

        } else {

          setSnackbar({ children: json.message, severity: 'error' });

        }

      } else {

        setSnackbar({ children: json.message, severity: 'error' });

      }
  
    }

    fetchHotelInformation();
  
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
        <div style={{
          height: '56px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default'
        }}>
          <Typography variant='h6'>
              Informații hotel
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
        hideFooterSelectedRowCount />
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

