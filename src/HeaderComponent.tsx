import Register from './Register';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import React from 'react';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoginForm from "./LoginForm"
import { useState } from 'react';
import { FormControl, Input, InputLabel, FormHelperText } from '@mui/material';
export default function Header(props:any) {
    const [value,setValue] = useState("1"); //tab değişimi için tutulan state
    const handleChange = (event:any, newValue:any) => {
        setValue(newValue)
    }
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Register" value="1" />
            <Tab label="Login" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><Register setToken = {props.setToken}/></TabPanel>
        <TabPanel value="2"><LoginForm setToken = {props.setToken} /></TabPanel>
      </TabContext>
    </Box>
  )
}
