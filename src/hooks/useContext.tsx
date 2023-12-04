import React, {useState, useContext, createContext, useEffect} from 'react'
import { string } from 'yup';

interface Props{
    err : string
    setErr: any
    info : string
    setInfo: any
}
export const MyContext = createContext<Props>({} as Props);

function useProvider(){
    const [err, setErr] = useState("");
    const [info, setInfo] = useState("");
    return {
        err,
        info,
        setErr,
        setInfo
    }
    
}

export default function ProvideContext(props:any){
    const context = useProvider()
    return(
      <MyContext.Provider value={context}>
        {props.children}
      </MyContext.Provider>
    )
  }