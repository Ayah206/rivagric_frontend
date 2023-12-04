import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormPage from '../components/fromPage';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ToolBar from '../components/toolBar';
import useRequest from '../hooks/useRequest';
import { GetPath } from '../hooks/getPath';
import { useCallback } from 'react';

function AddCategory() {

    //state for form data
    const [data, setData] = useState({} as any);

    const {postRequest} = useRequest()

    const handleSubmit = ()=>{
        setData((prevData:any)=>{
            return {
                ...prevData, 
                addedBy: '6555cdb5c93d3c5e74c684ef',
            }
        })
    }
    // find a better way to implement this, Aya
    useEffect(() => {
        if(data.addedBy){
            postRequest('product', data)
            setData({})
        }
    }, [data]);

    return (
        <FormPage title = "add category">
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> name :</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <TextField 
                    InputLabelProps={{shrink: false}} 
                    fullWidth
                    required
                    value = {data.description || ''}  
                    onChange = {(e)=>setData({...data, name : e.target.value} )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {6 } className = "labelGrid" mdOffset = {4}>
                    <ToolBar btnLabel = "submit" onClick = {handleSubmit} />
                </Grid>
            </Grid>   
            
        </FormPage>
    );
}

export default AddCategory;