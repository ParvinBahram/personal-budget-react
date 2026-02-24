import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const USER_STORAGE_kEY = "my_user" ;
export const AuthContext = createContext(null);

export default function AuthProvider({children}){
const navigate = useNavigate();

 const [isLoggedIn, setIsLoggedIn] = useState(()=>{
     return localStorage.getItem("isLoggedIn") === "true" ;
  });
 
 const [user,setUser]= useState(()=>{
      const savedUser = localStorage.getItem(USER_STORAGE_kEY);
      const parsedUser = JSON.parse(savedUser) ;
      return savedUser ? parsedUser : null ;
  });

 useEffect(()=>{
    if(!user){
       setIsLoggedIn(false);
        setUser (null);
         localStorage.setItem("isLoggedIn", "false")
    }
  },[user]);


    const handleRegister=(userData)=>{
      localStorage.setItem(USER_STORAGE_kEY, JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      setUser(userData);
      setIsLoggedIn(true);
      navigate("/",{replace:true})
    }

    
  
    const handleLogin=(loginData)=>{
       const savedUser = localStorage.getItem(USER_STORAGE_kEY);
       const parsedUser = JSON.parse(savedUser);
    
    
      if(!savedUser){
        return "NO_USER";
      }

      if(loginData.username !== parsedUser.username || loginData.password !== parsedUser.password ){
        return  "INVALID_DATA";
      }
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setUser(parsedUser);

      return null;
      }
      

      const handleLogout=()=>{
     setIsLoggedIn(false);
     setUser (null);
     localStorage.setItem("isLoggedIn", "false")
   }

   return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser, handleRegister, handleLogin, handleLogout, USER_STORAGE_kEY }}>
        {children}
    </AuthContext.Provider>
   )
}