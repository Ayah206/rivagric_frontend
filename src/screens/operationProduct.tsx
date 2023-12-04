import { Box, Button, Grid, IconButton, Link, Typography } from '@mui/material';
import moment from 'moment';
import { truncateSync } from 'node:fs';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsPage from '../components/detailsPage';
import LoadingCircle from '../components/loading';
import ToolBar from '../components/toolBar';
import useRequest from '../hooks/useRequest';
import { OperationProductType, OperationType } from '../types';

export default function OperationProduct() {
    const [product, setProduct] = useState({} as OperationProductType);
    const [loading, setLoading] = useState(true);

    const {sendRequest} = useRequest()
    const location = useLocation()
    const param = location.pathname.split('/')[2]
    const url = `operation-product/${param}`
    function cb(data: any){
        setProduct(data);
        setLoading(false)
    }
    useEffect(() => {
        sendRequest(url, cb)
    }, []);
    return (
        <DetailsPage title = "Operation Product Details">
            <Grid container spacing = {2}>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> operation product Id :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography> {product.opProductId} </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> product :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>
                        <Link href= {`/categories/${product.product?._id}`} >{product.product?.name}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>operation :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>
                        <Link href= {`/business/${product.operation?._id}`} >{product.operation?._id}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>description :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography> {product.description} </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> cost(s) :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    { product.costs?.map((item)=>{
                        return(<Typography> {item}</Typography>)    
                    })}    
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> available quantity :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    {loading && <LoadingCircle/>}
                    <Typography>{product.availableQuantity}</Typography>
                </Grid>
                
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>added by :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>
                        <Link href= {`/account/${product.addedBy?._id}`} >{product.addedBy?._id}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>date added :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>{product.addedOn && moment(product?.addedOn).format("DD/MM/YYYY hh:mm:ss")}</Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>last edited :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>{product.lastEdited && moment(product?.lastEdited).format("DD/MM/YYYY hh:mm:ss")}</Typography>
                </Grid>
            </Grid>
        </DetailsPage>
    );
}
