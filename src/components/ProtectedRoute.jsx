import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginContext, { ThemeContext } from "./Context";
import Navbar from "./menu";

export default function ProtectedRoute(){
  const isLoggedIn= useContext(LoginContext);
  
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