import { Box, Toolbar, Typography } from '@mui/material'
import * as React from 'react'
import DataGridDemo from '../components/dataGrid'
import ToolBar from '../components/toolBar';

export default function Guidelines(){
    
    return(
        <Box>
            <Toolbar disableGutters>
            <Typography variant='h5'>
                User guidelines   
            </Typography>
            </Toolbar>
        </Box>
    )
}