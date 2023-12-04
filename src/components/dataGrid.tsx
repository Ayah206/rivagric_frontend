import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Tooltip from '@mui/material/Tooltip';
import { Navigate, useNavigate } from 'react-router-dom';
import useRequest from '../hooks/useRequest';
import { GetPath } from '../hooks/getPath';
import AlertDialog from './alertDialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

// width of all columns should be 950 + 100
interface Props{
    rows: Array<object>,
    cols: any
    loading?: boolean
    rowId: string
    url: string
}
export default function DataGridDemo(props: Props){
    const [row, setRow] = React.useState(props.rows);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState("");
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function cb(data: any){
      setRow(
        row.filter((record:any)=> record._id != data._id)
      )
    }
    React.useEffect(() => {
      console.log(open, id)
    }, [open, id]);

    const {deleteRequest} = useRequest()
    const param = GetPath(1)

    const confirmDelete = (id:string)=>{
      let url = `${param}/${id}`
      deleteRequest(url, cb)
      setId("")
      setOpen(false)
    }

    const deleteItem = React.useCallback((id:string)=>{
      setOpen(true)
      setId(id)
      // console.log(open, id)
    }, [open, id])
    
    const columns: GridColDef[] = [
        ...props.cols,
        {
          field: 'actions',
          headerName: 'Actions',
          width: 100,
          sortable: false,
          headerAlign: 'center',
          align: 'center',
          // type: 'actions',
          renderCell: (params: any) => {
            return (
            <>
            <Tooltip title = 'open in full'>
                <IconButton aria-label="delete" size="small" href = {`/${props.url}/${params.id}`} >
                  <OpenInFullIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title = 'delete' onClick = {()=>deleteItem(params.id)}>
                <IconButton aria-label="delete" size="small" >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title = 'edit'>
                <IconButton aria-label="delete" size="small" >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>   
            </>
            )
          },
        },
      ];
  return (
    <Box sx={{ 
        height: 'fit-content',
        width: '100%'
    }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        loading = {props.loading}
        getRowId = {(row)=> row[props.rowId]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[1,2,3,4,5,6,7,8,9]}
        density = {'comfortable'}
        disableRowSelectionOnClick
        autoHeight
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx = {{
            minWidth: '100%',
            maxWidth: '100px',
            overflowX: 'scroll',
            '& .MuiDataGrid-toolbarContainer':{
                pb: 2
            },
            '& .MuiDataGrid-columnHeaders': {
                padding: '20px',
                backgroundColor: 'white',
                mb: 1
            },
            '& .MuiDataGrid-row':{
                px: '20px',
                borderBottom: '1px solid',
                borderColor: 'rgba(224, 224, 224, 1)',
            },
            '& .MuiDataGrid-cell':{
                borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller':{
                backgroundColor: 'white',
                borderRadius: '0px 0px 4px 4px' 
            },
            '& .MuiDataGrid-root':{
                border: 0,
            },
            '& .MuiDataGrid-footerContainer':{
                borderTop: 0
            },
            "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
                outline: "none",
            },
            '& .MuiDataGrid-row:hover':{
                backgroundColor:'white'
            }
            
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"confirm delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={()=>confirmDelete(id)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}