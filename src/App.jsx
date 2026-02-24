
import  {Routes, Route} from "react-router-dom";
import { lazy, Suspense, useContext} from "react";
import Spinner from "./components/Loading.jsx";
import AnimatedPage from "../animations/AnimatedPage.jsx";
import LoginPage from "./components/LoginPage.jsx"
import RegisterPage from "./components/RegisterPage.jsx"
import ForgetPassword from "./components/ForgetPassword.jsx";
import { ThemeContext } from "./context/themeContext.jsx";

const Home = lazy(() => import ("./pages/Home"));
const Setting = lazy(()=> import ("./pages/Setting"));
const Transactions = lazy(()=> import  ("./pages/Transactions.jsx"));
const Chart = lazy(()=> import ("./pages/Chart"));
const Navbar = lazy(()=> import  ("./components/menu.jsx"));
const Account = lazy(()=> import  ("./pages/Account.jsx"));
const Profile = lazy(()=> import  ("./pages/Profile.jsx"));
const ProtectedRoute = lazy(()=> import  ("./components/ProtectedRoute.jsx"));


export default function App(){

 const {checked} = useContext(ThemeContext);
  
  return (
      <div  className={` ${checked ? "bg-gray-900 text-white" : ""}`}>
         <Suspense fallback = {<Spinner/>}>
         <AnimatedPage exitBeforeEnter>
         <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/menu" element={<Navbar />} /> 
                <Route path="/" element={<Home  />}  />
                <Route path="/account" element={<Account  />}>
                    <Route path="setting"  element={<Setting />} />
                    <Route path="profile" element={<Profile  />} />
                </Route>
                <Route path="/transactions" element={<Transactions />}/>
                <Route path="/chart" className="" element={<Chart  />}/>
              </Route>
              <Route  path="/loginPage" element={<LoginPage  />}/>
              <Route path="/registerPage" element={<RegisterPage  />} />
              <Route path="/forgetPassword" element={<ForgetPassword  />}/>
        </Routes>
        </AnimatedPage>
        </Suspense>
      </div>
  )
}

 

