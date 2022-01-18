import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

import HotelInformation from './Settings_/HotelInformation';
import RoomTypes from './Settings_/RoomTypes';
import Rooms from './Settings_/Rooms';
import Rates from './Settings_/Rates';

export default function Settings() {

  const [view, setView] = useState('overview');

  const itemData = [
    {
      icon: <LocationCityIcon className='Settings-icon' />,
      title: 'Informații hotel',
      view: 'hotelInformation',
    },
    /*
    {
      img: bedTypes,
      title: 'Categorii paturi',
      view: 'bedTypes',
    },
    */
    {
      icon: <HomeWorkIcon className='Settings-icon'/>,
      title: 'Categorii spații',
      view: 'roomTypes',
    },
    {
      icon: <MeetingRoomIcon className='Settings-icon'/>,
      title: 'Spații (camere)',
      view: 'rooms',
    },
    {
      icon: <PriceChangeIcon className='Settings-icon'/>,
      title: 'Tarife',
      view: 'rates',
    },
  ];

  const selectView = (targetView) => {

    let Component;

    switch (targetView) {

      case 'hotelInformation': { Component = HotelInformation; break; }
      //case 'bedTypes': { Component = BedTypes; break; }
      case 'roomTypes': { Component = RoomTypes; break; }
      case 'rooms': { Component = Rooms; break; }
      case 'rates': { Component = Rates; break; }
      default: { Component = null; }

    }

    return <Component goBack={() => setView('overview')}/>;

  }

  const handleItemClick = (targetView) => {
    
    switch (targetView) {

      case 'hotelInformation': 
      case 'bedTypes':
      case 'roomTypes': 
      case 'rooms':
      case 'rates': {

        setView(targetView);
        break;

      }

      default: { break; }

    }

  }

  return (
    <div className='Settings-root'>
      {
        view === 'overview' ? (
        <Grid sx={{
          height: '96vh',
          width: '96%',
          border: '1px solid black'
        }} container columns={2}>
          {
            itemData.map((item) =>(
              <Grid key={item.title} className='Settings-item' item>
                <IconButton sx={{ borderRadius: '2px', 
                    width: '100%', 
                    height: 'calc(100% - 56px)'
                  }}
                  color='primary'
                  onClick={() => { handleItemClick(item.view) }}>
                  {item.icon}
                </IconButton>
                <Typography sx={{
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'default',
                }}>
                    {item.title}
                  </Typography>
              </Grid>
            ))
          }
       </Grid>
        ) : (
          selectView(view)
        )
      }
    </div>
  );
}
