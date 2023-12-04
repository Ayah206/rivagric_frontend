import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsPage from '../components/detailsPage';
import useRequest from '../hooks/useRequest';
import moment from 'moment'
import { UserType } from '../types';


function User() {
    const [user, setUser] = useState({} as UserType);

    const {sendRequest} = useRequest()
 
    const location = useLocation()
    const param = location.pathname.split('/')[2]
    const url = `account/${param}`
    function cb(data: any){
        setUser(data);
    }
    useEffect(() => {
        sendRequest(url, cb)
    }, []);
    return (
        <DetailsPage title = "User Details">
            <Grid container spacing = {2}>
                <Grid item xs = {12} md = {2}>
                    <Typography variant = 'h6'> user Id :</Typography>
                </Grid>
                <Grid item xs = {12} md = {10}>
                    <Typography component = 'p'> {user.userId} </Typography>
                </Grid>
                <Grid item xs = {12} md = {2}>
                    <Typography variant = 'h6'> email :</Typography>
                </Grid>
                <Grid item xs = {12} md = {10}>
                    <Typography> {user.email}</Typography>
                </Grid>
                <Grid item xs = {12} md = {2}>
                    <Typography variant = 'h6'>first name :</Typography>
                </Grid>
                <Grid item xs = {12} md = {10}>
                    <Typography> {user.firstName}</Typography>
                </Grid>
                <Grid item xs = {12} md = {2}>
                    <Typography variant = 'h6'>middle name :</Typography>
                </Grid>
                <Grid item xs = {12} md = {10}>
                    <Typography> {user.middleName}</Typography>
                </Grid>
                <Grid item xs = {12} md = {2}>
                    <Typography variant = 'h6'> phone number :</Typography>
                </Grid>
                <Grid item xs = {12} md = {10}>
                    <Typography> {user.mobileNumber}</Typography>
                </Grid>
                <Grid item xs = {12} md = {2}>
                    <Typography variant = 'h6'> role :</Typography>
                </Grid>
                <Grid item xs = {12} md = {10}>
                    <Typography component = 'p'> {user.role}</Typography>
                </Grid>
                <Grid item xs = {12} md = {2}>
                    <Typography variant = 'h6'>date added :</Typography>
                </Grid>
                <Grid item xs = {12} md = {10}>
                    <Typography> {moment(user.addedOn).format("DD/MM/YYYY hh:mm:ss")}</Typography>
                </Grid>
            </Grid>
        </DetailsPage>
    );
}

export default User;