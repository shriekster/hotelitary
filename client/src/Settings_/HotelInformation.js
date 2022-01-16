import { useState, useEffect, useRef } from 'react';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


export default function HotelInformation() {

  const columns = [
    { field: 'attribute', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', cellClassName: 'Settings-attribute-cell'},
    { field: 'value', headerName: '', flex: 1, sortable: false, filterable: false, align: 'center', editable: true, },
  ];

  const [rows, setRows] = useState(() => [
    { id: 3, attribute: 'Județ', value: '-' },
    { id: 4, attribute: 'Localitate', value: '-' },
    { id: 5, attribute: 'Stradă', value: '-' },
    { id: 6, attribute: 'Număr', value: '-' },
    { id: 7, attribute: 'Cod poștal', value: '-' },
    { id: 8, attribute: 'Telefon', value: '-' },
    { id: 9, attribute: 'Fax', value: '-' },
    { id: 10, attribute: 'Email', value: '-' },
    { id: 11, attribute: 'Website', value: '-' },
  ]);
  


  useEffect(() => {

    async function fetchHotelInformation() {
  
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
      };
  
      const response = await fetch('/api/hotels/1', requestOptions);

      if (response.ok) {

        const json = await response.json();

        const newRows = [
          { id: 3, attribute: 'Județ', value: json.judet || '-' },
          { id: 4, attribute: 'Localitate', value: json.localitate || '-' },
          { id: 5, attribute: 'Stradă', value: json.strada || '-' },
          { id: 6, attribute: 'Număr', value: json.numar || '-' },
          { id: 7, attribute: 'Cod poștal', value: json.codPostal || '-' },
          { id: 8, attribute: 'Telefon', value: json.telefon || '-' },
          { id: 9, attribute: 'Fax', value: json.fax || '-' },
          { id: 10, attribute: 'Email', value: json.email || '-' },
          { id: 11, attribute: 'Website', value: json.website || '-' },
        ];
        console.log(newRows)

        setRows((prevRows) => (newRows));

      }
  
    }

    fetchHotelInformation();
  
  }, []);

  return (
    <div style={{
      height: '96vh',
      width: '96%',
    }}>
      <DataGrid sx={{
          width: '100%',
        }} 
        rows={rows} 
        columns={columns} 
        disableColumnMenu 
        hideFooterPagination 
        hideFooterSelectedRowCount />
    </div>
  );
}

