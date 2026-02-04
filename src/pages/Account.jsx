import AnimatedPage from "../../animations/AnimatedPage";
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../components/Context";


export default function Account({user, isLoggedIn, onLogout}){
       const {checked} = useContext(ThemeContext)
   

    return(
        <AnimatedPage >
            <div className="flex flex-row justify-end gap-x-7 md:gap-x-10">
                 <div className="text-end py-12 ">
                   <Outlet  />
                 </div>
        <div className={`min-h-screen  px-4 py-7  text-end shadow-2xl"  ${checked ? "bg-gray-800 text-white" : "bg-gray-100 text-black shadow-[-6px_0_12px_-4px_rgba(0,0,0,0.2)]"} `} >
            <p className=""> خوش آمدید {isLoggedIn ? user?.username : ""} </p>
            <div className="flex flex-col mt-10 space-y-5">
                 <NavLink to="setting">تنظیمات <i className="fas fa-gear ml-2"></i></NavLink>
                <NavLink to="profile"> حساب کاربری<i className="fas fa-user ml-2"></i></NavLink>
                 <NavLink to="../loginPage" onClick={onLogout}>خروج<i className="fas fa-right-from-bracket ml-2"></i></NavLink>
            </div>
            </div>
           
            </div>
        </AnimatedPage>
    ) 
}