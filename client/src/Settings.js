import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import BusinessIcon from '@mui/icons-material/Business';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PaymentsIcon from '@mui/icons-material/Payments';

import Grid from '@mui/material/Grid';

//import hotelInformation from './hotel-information.svg';
//import bedTypes from './bed-types.svg'; // later
import roomTypes from './room-types.svg';
import rooms from './rooms.svg';
import rates from './rates.svg';

import HotelInformation from './Settings_/HotelInformation';
import RoomTypes from './Settings_/RoomTypes';
import Rooms from './Settings_/Rooms';
import Rates from './Settings_/Rates';

export default function Settings() {

  const [view, setView] = useState('overview');

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
        /*
        <ImageList sx={{ 
            width: '96%', 
            height: '96vh',
          }}
          variant='standard'
          cols={2}
          gap={16}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}
              sx={{
                height: 'calc(48vh - 8px) !important',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: '1px solid #888',
                '& .MuiImageListItem-img': {
                  width: '20%',
                  objectFit: 'scale-down',
                }
              }}
              onClick={() => { handleItemClick(item.view) }}
              >
                <img
                  src={`${item.img}`}
                  alt={item.title}
                  loading='lazy'
                />
              <ImageListItemBar
                title={item.title}
                actionIcon={
                  <SettingsIcon fontSize='medium' sx={{ color: 'whitesmoke', marginRight: '4px' }}/>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        */
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

const itemData = [
  {
    icon: <BusinessIcon className='Settings-icon' />,
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
    icon: <OtherHousesIcon className='Settings-icon'/>,
    title: 'Categorii spații',
    view: 'roomTypes',
  },
  {
    icon: <HomeWorkIcon className='Settings-icon'/>,
    title: 'Spații (camere)',
    view: 'rooms',
  },
  {
    icon: <PaymentsIcon className='Settings-icon'/>,
    title: 'Tarife',
    view: 'rates',
  },
];
