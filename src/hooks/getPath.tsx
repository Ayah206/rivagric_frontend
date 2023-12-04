import { useLocation } from "react-router-dom"


export function GetPath(index: number){
    const location = useLocation()
    return location.pathname.split('/')[index]
}
