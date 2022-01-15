import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

import hotelInformation from './hotel-information.svg';
import bedTypes from './bed-types.svg';
import roomTypes from './room-types.svg';
import rooms from './rooms.svg';
import rates from './rates.svg';

import HotelInformation from './Settings_/HotelInformation';

export default function Settings() {

  const [view, setView] = useState('overview');

  const selectView = (targetView) => {

    let Component;

    switch (targetView) {

      case 'hotelInformation': { Component = HotelInformation; break; }
      case 'bedTypes': {}
      case 'roomTypes': {}
      case 'rooms': {}
      case 'rates': {}
      default: { Component = null; }

    }

    return <Component />;

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
        <ImageList sx={{ 
            width: '96%', 
            height: '96vh',
          }}
          variant='standard'
          cols={3}
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
        ) : (
          selectView(view)
        )
      }
    </div>
  );
}

const itemData = [
  {
    img: hotelInformation,
    title: 'Informații hotel',
    view: 'hotelInformation',
  },
  {
    img: bedTypes,
    title: 'Categorii paturi',
    view: 'bedTypes',
  },
  {
    img: roomTypes,
    title: 'Categorii spații',
    view: 'roomTypes',
  },
  {
    img: rooms,
    title: 'Spații (camere)',
    view: 'rooms',
  },
  {
    img: rates,
    title: 'Tarife',
    view: 'rates',
  },
];
