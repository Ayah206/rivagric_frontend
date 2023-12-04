import React from 'react';
import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


interface Props{
  name: string
}
function CustomInput(props: Props) {

  return (
    <TextField className = 'customInput' fullWidth label={props.name} name = {props.name} autoComplete="new-password"
      sx = {{
        '& .MuiInputLabel-root.Mui-focused':{
            outline: 0,
            color: 'primary.contrastText',
        },
        '& .MuiOutlinedInput-notchedOutline.Mui-focused':{
          borderColor: 'primary.contrastText'
        }
      }}
    />
  );
}

export default CustomInput;
