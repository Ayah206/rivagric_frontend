import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface Props{
    btnLabel: string
    onClick?: any
    href?: string
}
export default function ToolBar(props: Props) {

  return (
    <Stack spacing={2} direction="row" 
        sx = {{
            justifyContent: 'right',
            py: 2
        }}
    >
        <Button variant="contained" color = 'primary' 
        onClick = {props.onClick}
        href = {props.href? props.href: ""}
        sx = {{
            px: 4,
            boxShadow: 0
        }}>{props.btnLabel}</Button>
    </Stack>
  );
}