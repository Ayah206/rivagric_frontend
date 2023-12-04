import * as React from 'react';
import {Box, Typography} from '@mui/material';

export default function Activity() {
  return (
    <Box
      sx={{
        height: 370,
        backgroundColor: 'white',
        borderRadius: '4px',
        p:2
      }}
    >
        <Typography component = 'h6' sx = {{
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          color: 'grey',
            
        }} >Recent activities</Typography>
    </Box>
  );
}
