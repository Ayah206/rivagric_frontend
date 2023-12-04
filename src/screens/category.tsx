import { Box, Grid, Link, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsPage from '../components/detailsPage';
import LoadingCircle from '../components/loading';
import useRequest from '../hooks/useRequest';
import { CategoryType } from '../types';


export default function Category() {
    const [category, setCategory] = useState({} as CategoryType);
    const [loading, setLoading] = useState(true);

    const {sendRequest} = useRequest()
 
    const location = useLocation()
    const param = location.pathname.split('/')[2]
    const url = `category/${param}`
    function cb(data: any){
        setCategory(data);
        setLoading(false)
    }
    useEffect(() => {
        sendRequest(url, cb)
    }, []);
    return (
        <DetailsPage title = "User Details">
            <Grid container spacing = {2}>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> category Id :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography> {category.categoryId} </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'> name :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography> {category.name} </Typography>
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>added by :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    {loading && <LoadingCircle/>}
                    <Typography>
                        <Link href= {`/accounts/${category.addedBy?._id} `}>{category.addedBy?._id}</Link>
                    </Typography> 
                </Grid>
                <Grid xs = {12} md = {3}>
                    <Typography variant = 'h6'>date added :</Typography>
                </Grid>
                <Grid xs = {12} md = {9}>
                    <Typography>{category.addedOn && moment(category.addedOn).format("DD/MM/YYYY hh:mm:ss")}</Typography>
                </Grid>
            </Grid>
        </DetailsPage>
    );
}
