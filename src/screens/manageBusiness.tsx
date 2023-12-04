import { Box, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import useRequest from '../hooks/useRequest'
import DataGridDemo from '../components/dataGrid'
import ToolBar from '../components/toolBar';
import Status from '../components/status'


const cols = [
    { field: 'regId', headerName: 'ID', width: 150 },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
    },
    {
        field: 'ownedBy',
        headerName: 'Owner',
        width: 200,
    },
    {
        field: 'cacId',
        headerName: 'CAC ID',
        width: 150,
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 150,
    },
    {
        field: 'createdAt',
        headerName: 'Created at',
        width: 150,
        valueFormatter: (params: any) => 
        moment(params?.value).format("DD/MM/YYYY")
    }
]

export default function ManageBusiness(){
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true)

    const {sendRequest} = useRequest()
    const url = 'businesses'
    function cb(data: any){
        data.forEach((item:any)=>{
            item.ownedBy = item.owner.firstName +" "+ item.owner.lastName
            item.status = false
        })
        setBusinesses(data);
        setLoading(false)
    }
    function err(data:any){
        setLoading(false)
    }
    useEffect(() => {
        sendRequest(url, cb, err)
    }, []);

    return(
        <Box>
            <Toolbar disableGutters>
            <Typography variant='h5'>
                Manage businesses   
            </Typography>
            </Toolbar>
            <ToolBar btnLabel = 'add business'/>
            <DataGridDemo cols = {cols} rows = {businesses} rowId = '_id' loading = {loading} url={url}/>
        </Box>
    )
}