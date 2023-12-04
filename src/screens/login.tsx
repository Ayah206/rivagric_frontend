import React from "react";
import Box from '@mui/material/Box';
import Form from "../components/login/form";
import { Toolbar } from "@mui/material";




export default function Login(){

    return(
        <div className = "loginScreen">
            <Toolbar sx = {{p: 2}}>
                <img alt = "logo" src = "/Government_of_Rivers_State_logo.png" width = "60px" />
            </Toolbar>
            <Form/>
        </div>    
    )
}