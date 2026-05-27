import { useEffect, useState } from "react";
import http from "../utils/http";
import { Navigate , Outlet } from "react-router-dom";
import Loader from "../components/shared/loader";
// import { verifyToken } from "../../../Backend/src/user/user.controller";

 const Guard =({endpoint,role,children})=>{
     const [authorized,setAuthorized]=useState(false);
    const [loader,setLoader]=useState(true);
    const[user,setUser]=useState(null);

    useEffect(()=>{
        const verifyToken =async ()=>{
     try{
     const{data}=await http.get(endpoint);
        sessionStorage.setItem("userInfo",JSON.stringify(data));
        setUser(data?.role);
        setAuthorized(true);
     } catch(err){
        setUser(null);
        setAuthorized(false);
     } finally {
        setLoader(false);
     }
         }
         verifyToken()
    
    },[endpoint])

    if(loader)
    return <Loader />
 if(authorized && role===user) {

     return children;
} 

    return <Navigate to="/" />
 

}
export default Guard;