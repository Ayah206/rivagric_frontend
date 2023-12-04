import { Box, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import useRequest from '../hooks/useRequest'
import DataGridDemo from '../components/dataGrid'
import ToolBar from '../components/toolBar';

const cols = [
    { field: 'productId', headerName: 'ID', width: 200 },
    {
        field: 'name',
        headerName: 'Name',
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
    
]
export default function ManageProducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    const {sendRequest} = useRequest()
    const url = 'products'
    function cb(data: any){
        if(data.length>0){
            data.forEach((item:any)=>{
                item.categoryName = item.category.name
                item.addedByWho = item.addedBy.firstName +" "+ item.addedBy.lastName
            })
            setProducts(data)
        }
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
                Manage products   
            </Typography>
            </Toolbar>
            <ToolBar btnLabel = 'add products' href = '/manage-products/add'/>
            <DataGridDemo cols = {cols} rows = {products} rowId = '_id' loading = {loading} url={url} />
        </Box>
    )
}