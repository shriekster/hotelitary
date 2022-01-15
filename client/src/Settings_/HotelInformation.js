import { useState, useEffect } from 'react';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const initialRows = [
  { id: 3, attribute: 'Județ', value: 'World' },
  { id: 4, attribute: 'Localitate', value: 'is Awesome' },
  { id: 5, attribute: 'Stradă', value: 'is Amazing' },
  { id: 6, attribute: 'Număr', value: 'is Amazing' },
  { id: 7, attribute: 'Cod poștal', value: 'is Amazing' },
  { id: 8, attribute: 'Telefon', value: 'is Amazing' },
  { id: 9, attribute: 'Fax', value: 'is Amazing' },
  { id: 10, attribute: 'Email', value: 'is Amazing' },
  { id: 11, attribute: 'Website', value: 'is Amazing' },
];

const columns = [
  { field: 'attribute', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', cellClassName: 'Settings-attribute-cell'},
  { field: 'value', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', editable: true, },
];


export default function HotelInformation() {

  useEffect(() => {

    async function fetchHotelInformation() {
  
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
      };
  
      const response = await fetch('/api/hotels/1', requestOptions);
      const json = await response.json();
  
      
  
    }
  
  }, []);

  return (
    <div style={{
      height: '96vh',
      width: '96%',
    }}>
      <DataGrid sx={{
          width: '100%',
        }} 
        rows={initialRows} 
        columns={columns} 
        disableColumnMenu 
        hideFooterPagination 
        hideFooterSelectedRowCount />
    </div>
  );
}

