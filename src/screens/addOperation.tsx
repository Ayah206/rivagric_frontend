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

function AddOperation() {
    const [firstLocation, setFirstLocation] = useState({} as any)

    //state for form data
    const [data, setData] = useState({} as any);

    //state to store businesses to populate business field
    const [businesses, setBusinesses] = useState([] as any);
    const [categories, setCategories] = useState([] as any);

    //generate unique ids for cost input object
    const uniqueId = ()=>{
        return Date.now()
    }
    
    //state for rendering extra input field for cost
    const [locationList, setLocationList] = useState([] as any)

    // add extra input field for cost
    const addLocation = useCallback(()=>{ 
        setLocationList([...locationList, {id : uniqueId(), data: ""}])
    }, [locationList])

    // remove extra cost input field
    const removeLocation = useCallback((id: number)=>{
        setLocationList(locationList.filter((a:any) =>a.id !== id))
    }, [locationList])
    
    //update costList
    const updateLocationList = useCallback((index:number, data:any)=>{
        let items = [...locationList]
        let item = {...items[index], ...data}
        items[index] = item
        setLocationList(items)
    }, [locationList])

    const {sendRequest} = useRequest()

    // get data to populate select fields
    function cb1(data: any){   
        setBusinesses(data);
    }
    function cb2(data: any){   
        setCategories(data);
    }
    useEffect(() => {
        sendRequest('businesses', cb1)
        sendRequest('categories', cb2)
    }, []);

    const param = GetPath(2)
    const {postRequest} = useRequest()

    const handleSubmit = ()=>{
        let newArr = [firstLocation, ...locationList]
        newArr = newArr.map((item)=>{
            return(item.data) 
        })
        setData((prevData:any)=>{
            return {
                ...prevData, 
                locations: newArr,
                addedBy: '6555cdb5c93d3c5e74c684ef',
            }
        })
    }
    // find a better way to implement this, Aya
    useEffect(() => {
        if(data.addedBy && data.locations){
            postRequest('operation', data)
            setData({})
            setFirstLocation({})
            setLocationList([])
        }
    }, [data]);


    return (
        <FormPage title = "add operation">
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> business:</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <FormControl fullWidth>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value = {data.runBy || ''}
                        required
                        onChange = {(e)=>setData({...data, runBy : e.target.value} )}
                        >
                            {businesses.map((item:any, index:number)=>{
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
                    <Typography variant = 'h6'> contact number :</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <TextField 
                    InputLabelProps={{shrink: false}} 
                    fullWidth 
                    required
                    value = {data.contactNumbers || ''}
                    onChange = {(e)=>setData({...data, contactNumbers : [e.target.value]} )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> location(s) :</Typography>
                </Grid>
                <Grid xs = {12} md = {5.9}>
                    <TextField fullWidth id="location1"
                     value = {firstLocation.data || ''}
                     onChange = {(e)=>setFirstLocation({data: e.target.value})}
                     />
                </Grid>
                <Grid xs = {12} md = {1} className = "labelGrid">
                    <Tooltip title = "add location">
                        <IconButton disableTouchRipple onClick = {addLocation}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>    
                </Grid>
            </Grid>
            {
               locationList.map((item:any, index:number)=>{
                   return(
                    <Grid container spacing = {4} key = {index} >
                        <Grid xs = {12} md = {5.9} mdOffset= {4}>
                            <TextField fullWidth id = {`location${index}`}
                             value = {locationList[index].data || ''}
                             onChange = {(e)=>updateLocationList(index, {data: e.target.value})}
                            />
                        </Grid>
                        <Grid xs = {12} md = {1} className = "labelGrid">
                            <Tooltip title = "remove cost">
                                <IconButton disableTouchRipple onClick = {()=>removeLocation(item.id)}>
                                    <RemoveCircleOutlineIcon/>
                                </IconButton>
                            </Tooltip>    
                        </Grid>
                    </Grid>
                   )
               })
            }
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> status:</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <FormControl fullWidth>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value = {data.status || ''}
                        required
                        onChange = {(e)=>setData({...data, status : e.target.value} )}
                        >
                            <MenuItem value= '1'>active</MenuItem>
                            <MenuItem value= '0' >inactive</MenuItem>
                        </Select>
                    </FormControl>
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

export default AddOperation;