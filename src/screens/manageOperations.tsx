import { Box, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import useRequest from '../hooks/useRequest'
import DataGridDemo from '../components/dataGrid'
import ToolBar from '../components/toolBar';
import Status from '../components/status'

const cols = [
    { field: 'operationId', headerName: 'ID', width: 100 },
    {
        field: 'owner',
        headerName: 'Run by',
        width: 200,
        editable: true,
    },
    {
        field: 'categoryName',
        headerName: 'Category',
        width: 200,
        editable: true,
    },
    {
        field: 'addedByWho',
        headerName: 'Added by',
        width: 200,
        editable: true,
    },
    {
        field: 'addedOn',
        headerName: 'Created at',
        width: 150,
        valueFormatter: (params: any) => 
        moment(params?.value).format("DD/MM/YYYY")
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params: any) => {
            return (
            <>
                <Status status= {params.value == '1' ? true:false} />
            </>
            )
        }
    }
]

export default function ManageOperations(){
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(true)

    const {sendRequest} = useRequest()
    const url = 'operations'
    function cb(data: any){
        data.forEach((item:any)=>{
            item.addedByWho = item.addedBy.firstName +" "+ item.addedBy.lastName
            item.owner = item.runBy.name
            item.categoryName = item.category.name
        })
        setOperations(data);
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
                Manage Operations   
            </Typography>
            </Toolbar>
            <ToolBar btnLabel = 'add operation' href = '/manage-operations/add' />
            <DataGridDemo cols = {cols} rows = {operations} rowId = '_id' loading = {loading} url={url}/>
        </Box>
    )
}