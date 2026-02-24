import { useContext, useState } from 'react'
import { NavLink, useNavigate } from'react-router-dom'
import { AuthContext } from '../context/authContext';
import { ThemeContext } from '../context/themeContext';

export default function Navbar(){
    const {isLoggedIn, user} = useContext(AuthContext);
    const {checked} = useContext(ThemeContext);
    const[isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate();


    const handleClick=()=>{
        navigate("../account")
    }    
    return(
        <>
        <nav className={`flex  justify-around items-center  py-4 shadow-lg ${checked? "bg-gray-800 text-white" : ""}`} dir='rtl'>
            <button className="hidden sm:block text-teal-500"  onClick={handleClick}>
                <i className="fas fa-user  mr-2 text-teal-500 text-xl"  ></i>{isLoggedIn ? user?.username : ""}</button>
            <span className="sm:hidden" onClick={()=> setIsOpen(!isOpen)}><i className="fa fa-bars text-xl text-teal-500 "></i></span>
              
            {/* منو در حالت مدیوم به بالا */}
            <p className="text-lg text-teal-500  ">مدیریت هزینه ها💳</p>
             <ul className="hidden sm:flex sm:flex-row justify-center gap-4 lg:gap-6" >
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/" >خانه</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/transactions">تراکنش ها</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/chart">نمودارها</NavLink>
                </ul>
        </nav>

        {/* منو در حالت موبایل */}
        {isOpen && (
           
         <ul className={`pt-8 pb-5 absolute top-0 right-0 pr-3 w-[35%] sm:hidden flex flex-col space-y-4 min-h-screen shadow-lg ${checked? "bg-gray-800 text-white" : "bg-teal-100 shadow-[4px_0_0_0.3"}`}>
            <button  className="text-start cursor-pointer ml-3" onClick={()=> setIsOpen(false)}><i className="fas fa-close"></i></button>
             <div className="flex flex-col space-y-4 items-end">
               <NavLink className={({isActive})=> isActive ? "active" : ""} to="/" onClick={()=> setIsOpen(false)} >خانه
                         <i className="fas fa-home ml-2"></i></NavLink>
                <NavLink className={({isActive}) => isActive ? "active" : ""} to="/account" onClick={()=> {setIsOpen(false), 
                      navigate("/profile") }}>داشبورد<i className="fas fa-border-all ml-2 "></i></NavLink>
                <NavLink className={({isActive})=> isActive ? "active" : ""} to="/transactions" onClick={()=> setIsOpen(false)}>تراکنش ها 
                         <i className="fas fa-receipt ml-2 "></i></NavLink>
                <NavLink className={({isActive})=> isActive ? "active" : ""} to="/chart" onClick={()=> setIsOpen(false)}> نمودارها
                        <i className="fas fa-chart-simple ml-2 "></i> </NavLink>
                   
                 </div>
                </ul>
              
        )}
</> 
        
               
    )
}



