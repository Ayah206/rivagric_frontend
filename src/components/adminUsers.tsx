import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react'
import useRequest from '../hooks/useRequest'
import moment from 'moment'
import DataGridDemo from './dataGrid'
import ToolBar from './toolBar'

const cols = [
  { field: 'userId', headerName: 'ID', width: 100 },
  {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
  },
  {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
  },
  {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
  },
  {
      field: 'mobile',
      headerName: 'Mobile number',
      width: 150
  },
  {
      field: 'role',
      headerName: 'Role',
      width: 100
  },
  {
    field: 'addedOn',
    headerName: 'Date added',
    width: 150,
    valueFormatter: (params: any) => 
     moment(params?.value).format("DD/MM/YYYY")
}
]


export default function AdminUsers(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)

  const {sendRequest} = useRequest()
  const url = 'accounts'
  function cb(data: any){
    setUsers(data);
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
        <ToolBar btnLabel = 'add admin users'/>
        <DataGridDemo cols = {cols} rows = {users} rowId = '_id' loading = {loading} url={url} />
      </Box>
    )
}