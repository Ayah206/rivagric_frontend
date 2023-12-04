import { Box, Grid, Link, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsPage from '../components/detailsPage';
import LoadingCircle from '../components/loading';
import useRequest from '../hooks/useRequest';
import { BusinessType } from '../types';



export default function Business() {
    const [business, setBusiness] = useState({} as BusinessType);
    const [loading, setLoading] = useState(true);

    const {sendRequest} = useRequest()
 
    const location = useLocation()
    const param = location.pathname.split('/')[2]
    const url = `business/${param}`
    function cb(data: any){
        setBusiness(data);
        setLoading(false)
    }
    useEffect(() => {
        sendRequest(url, cb)
    }, []);
    return (
        <DetailsPage title = "Business Details">
            <Grid container spacing = {2}>
                <Grid xs = {12} md = {2}>
                    <Typography variant = 'h6'> name :</Typography>
                </Grid>
                <Grid xs = {12} md = {10}>
                    <Typography> {business.name}</Typography>
                </Grid>
                <Grid xs = {12} md = {2}>
                    <Typography variant = 'h6'> registration id :</Typography>
                </Grid>
                <Grid xs = {12} md = {10}>
                    <Typography> {business.regId}</Typography>
                </Grid>
                <Grid xs = {12} md = {2}>
                    <Typography variant = 'h6'>owner :</Typography>
                </Grid>
                <Grid xs = {12} md = {10}>
                    <Typography>
                        <Link href= {`/accounts/${business.owner?._id}`}>{business.owner?._id}</Link>
                    </Typography>
                </Grid>
                <Grid xs = {12} md = {2}>
                    <Typography variant = 'h6'>cac id :</Typography>
                </Grid>
                <Grid xs = {12} md = {10}>
                    {loading && <LoadingCircle/>}
                    <Typography> {business.cacId}</Typography>
                </Grid>
                <Grid xs = {12} md = {2}>
                    <Typography variant = 'h6'> address :</Typography>
                </Grid>
                <Grid xs = {12} md = {10}>
                    <Typography> {business.address}</Typography>
                </Grid>
                <Grid xs = {12} md = {2}>
                    <Typography variant = 'h6'> added by :</Typography>
                </Grid>
                <Grid xs = {12} md = {10}>
                    <Typography>
                        <Link href= {`/accounts/${business.addedBy?._id} `}>{business.addedBy?._id}</Link>
                    </Typography>                
                </Grid>
                <Grid xs = {12} md = {2}>
                    <Typography variant = 'h6'>date added :</Typography>
                </Grid>
                <Grid xs = {12} md = {10}>
                    <Typography>{business.addedOn && moment(business.addedOn).format("DD/MM/YYYY hh:mm:ss")}</Typography>
                </Grid>
            </Grid>
        </DetailsPage>
    );
}
