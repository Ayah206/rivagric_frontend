import { Box, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link,Routes,Route,useNavigate} from 'react-router-dom';
import { GetPath } from '../hooks/getPath';


interface Props{
    title: string
    children: any
}
export default function FormPage(props: Props) {
    const navigate = useNavigate()
    function handleBack(){
        navigate(-1)
    }
    const prevParam = GetPath(3)
    const prevPath = GetPath(1)
    const toPath = prevParam? `/${prevPath}/${prevParam}` : `/${prevPath}`
    return (
        <Box>
            <Toolbar disableGutters >
                <IconButton href = {toPath} sx = {{
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
            <Toolbar disableGutters sx = {{justifyContent: 'center'}}>
                <Typography variant='h5' sx  = {{textTransform: 'capitalize'}}>
                    {props.title}   
                </Typography>
            </Toolbar>
            <Box sx={{ 
                height: 'fit-content',
                width: '70%',
                px: 1,
                py: 1,
                mx: 'auto',
                flexGrow: 1,
                '& .MuiGrid-root': {
                    margin : 0,
                    width: '100%',
                    padding: 2
                  },
                '& .MuiGrid2-root':{
                    display: 'flex',
                    alignItems: 'center',
                },
                '& .labelGrid':{
                    justifyContent: 'right'
                },
                '& p': {
                    textTransform: 'capitalize'
                },
                '& h6': {
                    fontSize : '14px',
                    textTransform: 'uppercase'
                },
                '& .MuiInputBase-root':{
                    height: "40px",
                },
                '& .MuiFormLabel-root':{
                    lineHeight: '1rem',
                    top: '-4px'
                }
            }}>
                {props.children}
            </Box>
        </Box>
    );
}
