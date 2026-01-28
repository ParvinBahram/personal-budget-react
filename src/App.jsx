
import  {Routes, Route, useNavigate, BrowserRouter} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Spinner from "./components/Loading.jsx";
import AnimatedPage from "../animations/AnimatedPage.jsx";
import LoginContext, { ThemeContext } from "./components/Context.js";

const Home = lazy(() => import ("./pages/Home"));
const Setting = lazy(()=> import ("./pages/Setting"));
const Transactions = lazy(()=> import  ("./pages/Transactions.jsx"));
const Chart = lazy(()=> import ("./pages/Chart"));
const Navbar = lazy(()=> import  ("./components/menu.jsx"));
const LoginPage = lazy(()=> import ("./components/LoginPage.jsx"));
const RegisterPage = lazy(()=> import  ("./components/RegisterPage.jsx"));
const Account = lazy(()=> import  ("./pages/Account.jsx"));
const Profile = lazy(()=> import  ("./pages/Profile.jsx"));
const ProtectedRoute = lazy(()=> import  ("./components/ProtectedRoute.jsx"));


const STORAGE_KEY = "app_transaction";
const USER_STORAGE_kEY = "my_user" ;
const DATE_TYPE ="date_type";

export default function App(){
  const navigate = useNavigate()


  // read localstorage
  const [transactions, setTransactions] = useState(()=>{
    const savedTrans =localStorage.getItem(STORAGE_KEY);
    return savedTrans ? JSON.parse(savedTrans) : [];
  });
 
//  console.log(transactions);
   
  // set theme and save in localstorage
  const [checked, setChecked]= useState(()=>{
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  useEffect(()=>{
    localStorage.setItem("theme", checked? "dark": "light")
  }, [checked])


  // set user in localstorage
  const [user,setUser]= useState(()=>{
      const savedUser = localStorage.getItem(USER_STORAGE_kEY);
      const parsedUser = JSON.parse(savedUser) ;
      return savedUser ? parsedUser : null ;
  });

 
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
     return localStorage.getItem("isLoggedIn") === "true" ;
  });
 

// انتخاب نوع تاریخ
  const [dateType, setDateType]=useState(()=>{
      return localStorage.getItem(DATE_TYPE) ||"jalali" })

  useEffect(()=>{
     localStorage.setItem(DATE_TYPE, dateType)
  },[dateType])

  
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

      return null;
      }
      

      const handleLogout=()=>{
     setIsLoggedIn(false);
     setUser (null);
     localStorage.setItem("isLoggedIn", "false")
   }
    
  return (
    <div  className={` ${checked ? "bg-gray-900 text-white" : ""}`}>
      <LoginContext.Provider value={isLoggedIn}>
       <ThemeContext.Provider value={{checked, setChecked}}>  
         <Suspense fallback = {<Spinner/>}>
         <AnimatedPage exitBeforeEnter>
         <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/menu" element={<Navbar  user={user} isLoggedIn={isLoggedIn}/>} /> 
                <Route path="/" element={<Home  transactions={transactions} user={user}/>}  />
                <Route path="/account" element={<Account user={user}   isLoggedIn={isLoggedIn}  onLogout={handleLogout} />}>
                    <Route path="setting"  element={<Setting  dateType={dateType}
                     setDateType={setDateType} DATE_TYPE={DATE_TYPE}/>} />
                    <Route index  element={<Setting/>}/>
                    <Route path="profile" element={<Profile  user={user}  USER_STORAGE_kEY={USER_STORAGE_kEY} isLoggedIn={isLoggedIn}  onLogout={handleLogout}/>} />
                </Route>
                <Route path="/transactions" element={<Transactions STORAGE_KEY={STORAGE_KEY} transactions={transactions} 
                   setTransactions={setTransactions} dateType={dateType} />}/>
                <Route path="/chart" className="" element={<Chart  Transactions={Transactions}  
                    STORAGE_KEY={STORAGE_KEY}  dateType={dateType} transactions={transactions} />}/>
                <Route path="/lock" />
              </Route>
                  <Route  path="/loginPage" element={<LoginPage  onLogin={handleLogin} />}/>
              <Route path="/registerPage" element={<RegisterPage onRegister={handleRegister} />} />
        </Routes>
        </AnimatedPage>
        </Suspense>
       </ThemeContext.Provider>
      </LoginContext.Provider>
      </div>
  )
}

 

