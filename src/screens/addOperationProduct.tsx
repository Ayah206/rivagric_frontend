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

function AddOperationProduct() {
    const [firstCost, setFirstCost] = useState({} as any)

    //state for form data
    const [data, setData] = useState({} as any);

    const [products, setProducts] = useState([] as any);

    //generate unique ids for cost input object
    const uniqueId = ()=>{
        return Date.now()
    }
    
    //state for rendering extra input field for cost
    const [costList, setCostList] = useState([] as any)

    // add extra input field for cost
    const addCost = useCallback(()=>{ 
        setCostList([...costList, {id : uniqueId(), price: "", unit: ""}])
    }, [costList])

    // remove extra cost input field
    const removeCost = useCallback((id: number)=>{
        setCostList(costList.filter((a:any) =>a.id !== id))
    }, [costList])
    
    //update costList
    const updateCostList = useCallback((index:number, data:any)=>{
        let items = [...costList]
        let item = {...items[index], ...data}
        items[index] = item
        setCostList(items)
    }, [costList])

    const {sendRequest} = useRequest()

    // get products to populate product select fields
    const url = 'products'
    function cb(data: any){   
        setProducts(data);
    }
    useEffect(() => {
        sendRequest(url, cb)
    }, []);

    const param = GetPath(3)
    const {postRequest} = useRequest()

    const handleSubmit = ()=>{
        let newArr = [firstCost, ...costList]
        newArr = newArr.map((item)=>{
            return(item.price+' per '+item.unit) 
        })
        setData((prevData:any)=>{
            return {
                ...prevData, 
                costs: newArr,
                addedBy: '6555cdb5c93d3c5e74c684ef',
                operation: param
            }
        })
    }

    useEffect(() => {
        if(data.addedBy && data.costs){
            postRequest('operation-product', data)
            setData({})
            setFirstCost([])
            setCostList([])
        }
    }, [data]);


    return (
        <FormPage title = "add operation product">
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> product:</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <FormControl fullWidth>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value = {data.product || ''}
                        required
                        onChange = {(e)=>setData({...data, product : e.target.value} )}
                        >
                            {products.map((item:any, index:number)=>{
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
                    <Typography variant = 'h6'> size :</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <TextField 
                    InputLabelProps={{shrink: false}} 
                    fullWidth
                    required
                    value = {data.size || ''}
                    onChange = {(e)=>setData({...data, size : e.target.value} )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> net production capacity :</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <TextField 
                    InputLabelProps={{shrink: false}} 
                    fullWidth 
                    required
                    value = {data.netProductionCapacity || ''}
                    onChange = {(e)=>setData({...data, netProductionCapacity : e.target.value} )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing = {4}>
                <Grid xs = {12} md = {4} className = "labelGrid">
                    <Typography variant = 'h6'> cost(s) :</Typography>
                </Grid>
                <Grid xs = {12} md = {4}>
                    <TextField fullWidth label="price" id="price1"
                     InputProps={{startAdornment: <InputAdornment position="start">&#8358;</InputAdornment>}}
                     value = {firstCost.price || ''}
                     onChange = {(e)=>setFirstCost({...firstCost, price: e.target.value})}
                     />
                </Grid>
                <Typography sx = {{lineHeight:'20px', fontWeight: 'bolder'}}>/</Typography>
                <Grid xs = {12} md = {1.9}>
                    <TextField fullWidth label="unit" id="unit1"
                    value = {firstCost.unit || ''} 
                    onChange = {(e)=>setFirstCost({...firstCost, unit: e.target.value})}
                    />
                </Grid>
                <Grid xs = {12} md = {1} className = "labelGrid">
                    <Tooltip title = "add cost">
                        <IconButton disableTouchRipple onClick = {addCost}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>    
                </Grid>
            </Grid>
            {
               costList.map((item:any, index:number)=>{
                   return(
                    <Grid container spacing = {4} key = {index} >
                        <Grid xs = {12} md = {4} mdOffset= {4}>
                            <TextField fullWidth label="price" id = {`price${index}`}
                             InputProps={{startAdornment: <InputAdornment position="start">&#8358;</InputAdornment>}}
                             value = {costList[index].price || ''}
                             onChange = {(e)=>updateCostList(index, {price: e.target.value})}
                            />
                        </Grid>
                        <Typography sx = {{lineHeight:'20px', fontWeight: 'bolder'}}>/</Typography>
                        <Grid xs = {12} md = {1.9}>
                            <TextField fullWidth label="unit" id = {`unit${index}`}
                             value = {costList[index].unit || ''}  
                             onChange = {(e)=>updateCostList(index, {unit: e.target.value})}
                             />
                        </Grid>
                        <Grid xs = {12} md = {1} className = "labelGrid">
                            <Tooltip title = "remove cost">
                                <IconButton disableTouchRipple onClick = {()=>removeCost(item.id)}>
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
                    <Typography variant = 'h6'> availaible quantity :</Typography>
                </Grid>
                <Grid xs = {12} md = {6}>
                    <TextField InputLabelProps={{shrink: false}} fullWidth
                    onChange = {(e)=>setData({...data, availableQuantity : e.target.value} )}
                    value = {data.availableQuantity || ''}
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

export default AddOperationProduct;