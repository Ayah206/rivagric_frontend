import { Box, Button, Grid, IconButton, Link, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsPage from '../components/detailsPage';
import LoadingCircle from '../components/loading';
import ToolBar from '../components/toolBar';
import useRequest from '../hooks/useRequest';
import { ProductType } from '../types';

export default function Product() {
    const [product, setProduct] = useState({} as ProductType);

    const [loading, setLoading] = useState(true);

    const {sendRequest} = useRequest()
 
    const location = useLocation()
    const param = location.pathname.split('/')[2]
    const url = `product/${param}`
    function cb(data: any){
        setProduct(data);
        setLoading(false)
    }
    useEffect(() => {
        sendRequest(url, cb)
    }, []);
    return (
        <DetailsPage title = "Product Details">
            <Grid container spacing = {2}>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> product Id :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>{product.productId}</Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> name :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>{product.name}</Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>category :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>
                         {loading && <LoadingCircle/>}
                        <Link href= {`/categories/${product.category?._id}`} >{product.category?._id}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>added by :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>
                        <Link href= {`/accounts/${product.addedBy?._id} `} >{product.addedBy?._id}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>date added :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>{product.addedOn && moment(product.addedOn).format("DD/MM/YYYY hh:mm:ss")}</Typography>
                </Grid>
            </Grid>
        </DetailsPage>
    );
}
