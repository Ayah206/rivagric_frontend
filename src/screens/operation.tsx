import { Box, Button, Grid, IconButton, Link, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsPage from '../components/detailsPage';
import LoadingCircle from '../components/loading';
import ToolBar from '../components/toolBar';
import useRequest from '../hooks/useRequest';
import { OperationProductType, OperationType } from '../types';

export default function Operation() {
    const [operation, setOperation] = useState({} as OperationType);
    const [loading, setLoading] = useState(true);

    const {sendRequest} = useRequest()
    const arr = []
    const location = useLocation()
    const param = location.pathname.split('/')[2]
    const url = `operation/${param}`
    function cb(data: any){
        setOperation(data);
        setLoading(false)
    }
    useEffect(() => {
        sendRequest(url, cb)
    }, []);
    return (
        <DetailsPage title = "Operation Details">
            <Grid container spacing = {2}>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> operation Id :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography> {operation.operationId} </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> category :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>
                        <Link href= {`/categories/${operation.category?._id}`} >{operation.category?.name}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>run by :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>
                        <Link href= {`/business/${operation.runBy?._id}`} >{operation.runBy?.name}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>description :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography> {operation.description} </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> contact number(s) :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    { operation.contactNumbers?.map((item)=>{
                        return(<Typography> {item}</Typography>)    
                    })}    
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> location(s) :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    { operation.locations?.map((item)=>{
                        return(<Typography> {item}</Typography>)    
                    })} 
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> product(s) :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    { operation.products?.map((item)=>{
                        return(<Typography> 
                                <Link href= {`/operation-products/${item._id}`} >{item.product.name}</Link>
                                </Typography>)    
                    })}
                    {loading? <LoadingCircle/> 
                    :<Button disableRipple disableFocusRipple
                    href = {`/operations/add-product/${param}`}
                     sx = {{
                        py:0, 
                        mt:2,
                        fontSize: '12px',
                        color: 'white',
                        backgroundColor: 'rgb(0, 151, 255)',
                        '&:hover':{
                            backgroundColor: 'rgb(0, 151, 255)'
                        }
                
                }}>add product</Button>}
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>added by :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>
                        <Link href= {`/account/${operation.addedBy?._id}`} >{operation.addedBy?._id}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>date added :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>{operation.addedOn&&moment(operation?.addedOn).format("DD/MM/YYYY hh:mm:ss")}</Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>image(s) :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    {operation.mediaURLs?.map((item)=>{
                        return(<Typography> {item}</Typography>)    
                    })} 
                </Grid>
            </Grid>
        </DetailsPage>
    );
}
