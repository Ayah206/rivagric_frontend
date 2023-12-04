import React, { useEffect, useState } from "react"
import { Box, Typography, Toolbar, Stack, Paper, Avatar } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardPaper from "../components/dashboardPaper";
import CategoryIcon from '@mui/icons-material/Category';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BusinessIcon from '@mui/icons-material/Business';
import Graph from "../components/graph";
import Activity from "../components/activity";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useRequest from "../hooks/useRequest";


export default function Dashboard(){
  const [data, setData] = useState({} as any);
  const {sendRequest} = useRequest()

  const cb = (data:any)=>{
    setData(data)
  }

  useEffect(() => {
    sendRequest('get-counts', cb)
  }, []);
  return(
    <Box>
      <Toolbar disableGutters>
          <Typography variant='h5'>
              Dashboard  
          </Typography>
      </Toolbar>
      <Box>
        <Grid container spacing = {{xs: 2, md: 3}}>
          <Grid container spacing = {{xs: 2, md: 3}} xs = {6} md = {12}>
            <Grid xs={12} md={4}>
              <DashboardPaper avatar = {<PeopleAltIcon/>} color = {[50, 168, 164]} name = "total users" value = {data.users} />
            </Grid>
            <Grid xs={12} md={4}>
              <DashboardPaper avatar = {<AgricultureIcon/>} color = {[255, 0, 183]} name = "total operations" value = {data.operations} />
            </Grid>
            <Grid xs={12} md={4}>
              <DashboardPaper avatar = {<ShoppingCartIcon/>} color = {[0, 151, 255,]} name = "total products" value = {data.products} />
            </Grid>
          </Grid>
          <Grid container spacing = {2} xs = {6} md = {12}>
            <Grid xs={12} md={4}>
            <DashboardPaper avatar = {<BusinessIcon/>} color = {[0, 151, 19,]} name = "total businesses" value = {data.businesses} />
            </Grid>
            <Grid xs={12} md={4}>
              <DashboardPaper avatar = {<CategoryIcon/>} color = {[192, 0, 255,]} name = 'total categories' value = {data.categories} />
            </Grid>
            <Grid xs={12} md={4}>
              <DashboardPaper avatar = {<ShoppingCartIcon/>} color = {[87, 24, 255,]} name = 'operation products' value = {data.opProducts} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx = {{
          mt: 8    
        }}>
        <Grid container spacing={2}>
          <Grid md={8} xs = {12}>
            <Graph/>
          </Grid>
          <Grid md={4} xs = {12}>
            <Activity/>
          </Grid>  
        </Grid>
      </Box>
    </Box>
  )
} 
