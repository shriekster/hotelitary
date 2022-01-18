import { useState, useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import appIcon from './appicon-256.png';

import Settings from './Settings';
import Bookings from './Bookings';
import Reports from './Reports';


function TabPanel(props) {

  const { children, value, index, ...other } = props;

  let Panel = function () { return (<></>) };

  switch (index) {

    case 0: { Panel = Settings; break; }

    case 1: { Panel = Bookings; break; }

    case 2: { Panel = Reports; break; }

    default: { break; }

  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{
        width: '100%',
      }}
      {...other}
    >
      {value === index && (
        <Panel />
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

function App() {

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh', margin: 0, padding: 0, position: 'relative' }}>
      <img alt='Hotelitary' src={appIcon} className='MuiTabs-root'
        style={{
          position: 'absolute',
          top: 0,
          width: '90px',
          padding: '16px'
      }}/>
      <Tabs
        orientation='vertical'
        variant='standard'
        value={value}
        onChange={handleChange}
        aria-label='Meniu principal'
        sx={{ borderRight: 1, borderColor: 'divider', position: 'relative', 
          '& .MuiTabs-scroller': {
            height: '100vh'
          },
          ' .MuiTabs-flexContainerVertical': {
            height: '100vh',
            justifyContent: 'center',
          }
        }}>
        <Tooltip title={<Typography>Setări</Typography>}
          placement='right'
          arrow>
          <Tab icon={<SettingsIcon fontSize='large' />}
            {...a11yProps(0)} />
        </Tooltip>
        <Tooltip title={<Typography>Rezervări</Typography>}
          placement='right'
          arrow>
          <Tab icon={<MenuBookIcon fontSize='large' />}
            {...a11yProps(1)} />
        </Tooltip>
        <Tooltip title={<Typography>Raportări</Typography>}
          placement='right'
          arrow>
          <Tab icon={<LibraryBooksIcon fontSize='large' />}
            {...a11yProps(2)} />
        </Tooltip>
      </Tabs>
      <TabPanel value={value} index={0}>
        SETĂRI
      </TabPanel>
      <TabPanel value={value} index={1}>
        Rezervari
      </TabPanel>
      <TabPanel value={value} index={2}>
        Raportări
      </TabPanel>
    </Box>
  );
}

export default App;
