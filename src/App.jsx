import  {Routes, Route, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Transactions from "./pages/Transactions.jsx";
import Chart from "./pages/Chart";
import Navbar from "./components/menu.jsx";
import { useEffect, useState } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


const STORAGE_KEY = "app_transaction";
const USER_STORAGE_kEY = "my_user" ;

export default function App(){
  const navigate = useNavigate()

  // read localstorage
  const [transactions, setTransactions] = useState(()=>{
    const savedTrans =localStorage.getItem(STORAGE_KEY);
    return savedTrans ? JSON.parse(savedTrans) : [];
  });

  // set theme and save in localstorage
  const [checked, setChecked]= useState(()=>{
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  useEffect(()=>{
    localStorage.setItem("theme", checked? "dark": "light")
  }, [checked])


  // set user in localstorage
  const [user,setUser]= useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const savedUser = localStorage.getItem(USER_STORAGE_kEY);
  const parsedUser = JSON.parse(savedUser);
  let loginErr= null;

   useEffect(()=>{
     if(!savedUser){
       localStorage.setItem("isLoggedIn", "false");
       setIsLoggedIn(false);
       setTransactions([]);
      } 
      setUser(parsedUser)
    },[]);
    
    
    useEffect(()=>{
      const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
    },[])

    const handleRegister=(userData)=>{
      localStorage.setItem(USER_STORAGE_kEY, JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      setUser(userData);
      setIsLoggedIn(true);
      navigate("/")
    }

  
    const handleLogin=(loginData)=>{
      if(!savedUser){
        loginErr= "NO_USER";
        return false;
      }
      if(loginData.username !== parsedUser.username || loginData.password !== parsedUser.password ){
        loginErr = "INVALID_DATA";
        return  false;
      }
        localStorage.setItem("isLoggedIn", "true");
        setUser(parsedUser);
        setIsLoggedIn(true);
      return true;
      }
      

      const handleLogout=()=>{
     setIsLoggedIn(false);
     localStorage.setItem("isLoggedIn", "false")
   }
    
  return (
      <div className={`py-5 px-4 ${checked ? "bg-gray-900 text-white" : ""}`}>
         <Navbar checked={checked} isLoggedIn={isLoggedIn} user={user} />
         <Routes>
              {/* <Route path="/" element={!isLoggedIn ?  */}
                  {/* اضافه کردن neted route /setting */}
                {/* </Route> */}
              <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                <Route path="/" element={<Home  transactions={transactions} user={user} onLogout={handleLogout}/>}  />
                <Route path="/setting" element={<Setting checked={checked} setChecked={setChecked} />} />
                <Route path="/profile" element={<Profile checked={checked} setChecked={setChecked} />} />
                <Route path="/transactions" element={<Transactions STORAGE_KEY={STORAGE_KEY} transactions={transactions} 
                   setTransactions={setTransactions} checked={checked} />}/>
                <Route path="/chart" className="" element={<Chart/>}/>
              </Route>
                  <Route  path="/login" element={<Login  onLogin={handleLogin} loginErr={loginErr}/>}/>
              <Route path="forgetPassword" element={<ForgetPassword user={user}  setUser={setUser} parsedUser={parsedUser} USER_STORAGE_kEY={USER_STORAGE_kEY}/>} />
              <Route path="/register" element={<Register onRegister={handleRegister} />} />
      </Routes>
      </div>
  )
}

 

