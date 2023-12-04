import { Box, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import useRequest from '../hooks/useRequest'
import DataGridDemo from '../components/dataGrid'
import ToolBar from '../components/toolBar';
const cols = [
    { field: 'categoryId', headerName: 'ID', width: 150 },
    {
        field: 'name',
        headerName: 'Name',
        width: 300,
        editable: true,
    },
    {
        field: 'addedByWho',
        headerName: 'Added By',
        width: 300,
        editable: true,
    },
    {
        field: 'addedOn',
        headerName: 'Created at',
        width: 200,
        valueFormatter: (params: any) => 
        moment(params?.value).format("DD/MM/YYYY")
    },
    
]
export default function ManageCategories(){
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    const {sendRequest} = useRequest()
    const url = 'categories'
    function cb(data: any){
        data.forEach((item:any)=>{
            item.addedByWho = item.addedBy.firstName +" "+ item.addedBy.lastName
        })
        setCategories(data);
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
                Manage Categories   
            </Typography>
            </Toolbar>
            <ToolBar btnLabel = 'add category' href = '/manage-categories/add' />
            <DataGridDemo cols = {cols} rows = {categories} rowId = '_id' loading = {loading} url={url}/>
        </Box>
    )
}