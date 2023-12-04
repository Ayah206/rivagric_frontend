import React from "react"
import axios from 'axios'
import { useState, useContext } from "react"
import { MyContext } from "./useContext";

export default function useRequest(){
    // get react context
    const context = useContext(MyContext);

    const sendRequest = (url:string, cb: any, err?:any)=> {
        axios.get(`http://localhost:5000/admin/${url}`)
        .then((response: any) => {
            if(response.status == 200){
                cb(response.data)
            }
            else{
                console.log(response)
                context.setErr(response.data)
            }
        })
        .catch((error: any) => {
            err && err(error)
            context.setErr(error.message)
        })
    };

    const postRequest = (url:string, data: any, cb?: any)=>{
        axios.post(`http://localhost:5000/admin/${url}`, data)
          .then((response)=> {
            if(response.data.errors){
                context.setErr(response.data.message)    
            }
            else{
                context.setInfo(response.data)
            }
          })
          .catch((error)=> {
            console.log(error);
            context.setErr(error.message)
          });
    }

    const deleteRequest = (url:string, cb?: any)=>{
        axios.delete(`http://localhost:5000/admin/${url}`)
          .then((response)=> {
            if(response.data.errors){
                console.log(response)
                context.setErr(response.data.message)    
            }
            else{
                context.setInfo('record deleted')
                console.log(response)
                cb(response.data)
            }
          })
          .catch((error)=> {
            console.log(error);
            context.setErr(error.message)
          });
    }

    return {
        sendRequest,
        postRequest,
        deleteRequest
    }
}