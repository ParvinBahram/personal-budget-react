 import  {Routes, Route, useNavigate} from "react-router-dom";
    import Home from "./pages/Home";
    import Setting from "./pages/Setting";
    import Transactions from "./pages/Transactions.jsx";
    import Chart from "./pages/Chart";
import Navbar from "./components/menu.jsx";
import { useEffect, useState } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

const STORAGE_KEY = "app_transaction";
const USER_STORAGE_kEY = "app_user" ;

export default function App(){

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
  const [user,setUser]= useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);


   useEffect(()=>{
     const savedUser = localStorage.getItem(USER_STORAGE_kEY);
     if(savedUser){
       setUser(JSON.parse(savedUser))
      }
    },[])
    
    useEffect(()=>{
      const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
    },[])

    const handleRegister=(userData)=>{
      localStorage.setItem(USER_STORAGE_kEY, JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      setUser(userData);
      setIsLoggedIn(true);
    }

    const handleLogin=(loginData)=>{
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }

     const handleLogout=()=>{
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false")
    }
    
  return (
      <div className={`py-5 px-4 ${checked ? "bg-gray-900 text-white" : ""}`}>
         <Navbar checked={checked} />
         <Routes>
              <Route path="/" element={!user ?<Register onRegister={handleRegister} /> :
                !isLoggedIn ? <Login  onLogin={handleLogin}/> :
              <Home transactions={transactions} user={user} onLogout={handleLogout} />}/>
              <Route path="/setting" element={<Setting checked={checked} setChecked={setChecked} />}/>
              <Route path="/transactions" element={<Transactions STORAGE_KEY={STORAGE_KEY} transactions={transactions} 
              setTransactions={setTransactions} checked={checked} />}/>
              <Route path="/chart" className="" element={<Chart/>}/>
      </Routes>
      </div>
  )
}

 

