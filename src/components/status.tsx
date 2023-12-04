import { Typography } from '@mui/material';
import React from 'react';

interface Prop{
    status: boolean
}

function Status(prop: Prop) {
    const clr = prop.status? 'green' : 'red'
    const txt = prop.status? 'active' : 'inactive'
    return (
        <Typography sx = {{color: clr}}> 
            {txt}
        </Typography>
    );
}

export default Status;