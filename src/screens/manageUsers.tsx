import { Box, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DataGridDemo from '../components/dataGrid'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AdminUsers from '../components/adminUsers';
import Roles from '../components/roles';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx = {{mt: 1}}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function ManageUsers(){
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
    return(
        <Box>
            <Toolbar disableGutters>
              <Typography variant='h5'>
                  Manage Users   
              </Typography>
            </Toolbar>
            <Box sx={{ width: '100%' }} >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                <Tab label="Admin users" {...a11yProps(0)} />
                <Tab label="Roles and permissions" {...a11yProps(1)} />
              </Tabs>
              <CustomTabPanel value={value} index={0}>
                <AdminUsers/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Roles/>
              </CustomTabPanel>
            </Box>
        </Box>
    )
}