import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';

export default function AccountMenu() {
  return (
    <>
       <Toolbar sx = {{
            color:'navy-blue',
            position : 'sticky',
            bgcolor : 'secondary.main',
            top: 0,
            zIndex: 99999,
            boxShadow: 1 
        }}>
          <div className = "logoDiv">
            <img alt = "logo" src = "/Government_of_Rivers_State_logo.png" width = "45px" />
          </div>
          <Typography sx = {{
                    fontSize: '24px !important',
                    letterSpacing: 1,
                    fontWeight: 'bold',
                    color: '#0077bc'
                  }}>
            RivAgric
          </Typography>
        </Toolbar>
    </>
  );
}