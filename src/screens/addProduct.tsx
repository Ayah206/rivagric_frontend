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

function AddProduct() {

    //state for form data
    const [data, setData] = useState({} as any);

    //state to store businesses to populate business field
    const [categories, setCategories] = useState([] as any);

    const {sendRequest} = useRequest()

    // get data to populate select fields
    function cb2(data: any){   
        setCategories(data);
    }
    useEffect(() => {
        sendRequest('categories', cb2)
    }, []);

    const param = GetPath(2)
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
        <FormPage title = "add product">
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
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> category:</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <FormControl fullWidth>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value = {data.category || ''}
                        required
                        onChange = {(e)=>setData({...data, category : e.target.value} )}
                        >
                            {categories.map((item:any, index:number)=>{
                                return(
                                    <MenuItem value={item._id} key = {index}>{item.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> description :</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <TextField 
                    InputLabelProps={{shrink: false}} 
                    fullWidth
                    required
                    value = {data.description || ''}  
                    onChange = {(e)=>setData({...data, description : e.target.value} )}
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

export default AddProduct;