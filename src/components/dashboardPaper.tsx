import React, { ReactNode } from 'react';
import { Paper, Stack, Avatar, Typography } from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


interface Props{
    avatar: ReactNode,
    name: String,
    value: String,
    color: Array<any>
}
export default function DashboardPaper(props: Props){
    const bg = 'rgba('+props.color.toString()+',0.1)'
    const iconColor = 'rgba('+props.color.toString()+')'
    console.log(bg)
    return(
        <Paper sx = {{
            height: 110,
              boxShadow: 0,
              px: 3,
              py: 2
        }}>
            <Stack sx = {{
                height: '100%',
                justifyContent: 'space-between',
                '& .MuiSvgIcon-root': {
                    color: iconColor
                }
            }}>
                <Avatar sx = {{
                    bgcolor: bg,
                }}>{props.avatar}</Avatar>
                <Typography sx = {{
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: 1
                  }}>{props.name}</Typography>
                <Typography sx = {{
                    fontSize: '24px',
                    letterSpacing: 1,
                    fontWeight: 'bolder',
                    lineHeight: 1   
                  }}>{props.value}</Typography>
            </Stack>
        </Paper>
    )
}
