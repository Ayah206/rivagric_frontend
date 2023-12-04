import { Box, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link,Routes,Route,useNavigate} from 'react-router-dom';


interface Props{
    title: string
    children: any
}
export default function DetailsPage(props: Props) {
    const navigate = useNavigate()
    function handleBack(){
        navigate(-1)
    }
    return (
        <Box>
            <Toolbar disableGutters>
                <IconButton onClick = {handleBack} sx = {{
                    '&:hover': { 
                        backgroundColor: 'transparent' 
                    }
                }}>
                    <ArrowBackIcon/>
                    <Typography>
                        Go back   
                    </Typography>
                </IconButton>
            </Toolbar>
            <Toolbar disableGutters>
                <Typography variant='h5'>
                    {props.title}   
                </Typography>
            </Toolbar>
            <Box sx={{ 
                height: 'fit-content',
                width: '100%',
                background: 'white',
                px: 1,
                py: 5,
                flexGrow: 1,
                '& .MuiGrid-root': {
                    margin : 0,
                    width: '100%',
                    padding: 2
                  },
                '& p': {
                    textTransform: 'capitalize'
                },
                '& h6': {
                    fontSize : '15px',
                    fontWeight: 'bolder',
                    textTransform: 'uppercase'
                }
            }}>
                {props.children}
            </Box>
        </Box>
    );
}
