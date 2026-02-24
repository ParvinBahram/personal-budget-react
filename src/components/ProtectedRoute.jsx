import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./menu";
import { AuthContext } from "../context/authContext";

export default function ProtectedRoute(){
  const {isLoggedIn }= useContext(AuthContext);
  
    if(!isLoggedIn){
    return <Navigate  to="/loginPage" replace  />
    }
    
    return(
    <div className="">
      <Navbar />
      <Outlet />
    </div>
    )    
    
}