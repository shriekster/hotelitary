import { useState, useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import Settings from './Settings';


function TabPanel(props) {

  const { children, value, index, ...other } = props;

  let Panel = function () { return (<></>) };

  switch (index) {

    case 0: { Panel = Settings; break; }

    case 1: { Panel = Settings; break; }

    case 2: { Panel = Settings; break; }

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
    sx: {
      justifyContent: 'start',
    }
  };
}

function App() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh', margin: 0, padding: 0 }}
    >
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
        }}
      >
        <Tab icon={<SettingsIcon />}
          iconPosition='start' 
          label={<Typography sx={{textTransform: 'none', fontSize: '1.2rem', paddingRight: 1}}>Setări</Typography>} {...a11yProps(0)} />
        <Tab icon={<MenuBookIcon />}
          iconPosition='start'  
          label={<Typography sx={{textTransform: 'none', fontSize: '1.2rem', paddingRight: 1}}>Rezervări</Typography>} {...a11yProps(1)} />
        <Tab icon={<LibraryBooksIcon />}
          iconPosition='start'  
          label={<Typography sx={{textTransform: 'none', fontSize: '1.2rem', paddingRight: 1}}>Raportări</Typography>} {...a11yProps(2)} />
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
