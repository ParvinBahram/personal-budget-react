import { useState } from 'react'
import { NavLink, useNavigate } from'react-router-dom'

export default function Navbar({checked,isLoggedIn,user}){
    const[isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate();


    const handleClick=()=>{
        navigate("/profile")
    }    
    return(
        <>
        <nav className="flex justify-around items-center py-4 shadow-lg ">
            <button className="hidden sm:block text-teal-600" onClick={handleClick}>
                <i className="fas fa-user  mr-2 text-teal-500 text-xl" ></i>{isLoggedIn ? user?.username : ""}</button>
            <span className="sm:hidden" onClick={()=> setIsOpen(!isOpen)}><i className="fa fa-bars text-xl text-teal-600 "></i></span>
              
              {/* منو در حالت مدیوم به بالا */}
            <p className="text-lg text-teal-700  ">مدیریت هزینه ها💳</p>
             <ul className="hidden sm:flex sm:flex-row justify-center gap-4 lg:gap-6">
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/" >خانه</NavLink>
                    {/* <NavLink className={({isActive})=> isActive ? "active" : ""} to="/setting">Setting</NavLink> */}
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/transactions">تراکنش ها</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/chart">جدولها</NavLink>
                </ul>
        </nav>

        {/* منو در حالت مدیوم به پایین */}
        {isOpen && (
         <ul className={`absolute px-2 w-[30%] sm:hidden flex flex-col items-start  space-y-4  h-screen shadow-lg ${checked? "bg-gray-800 text-white" : "bg-amber-100 shadow-[4px_0_0_0.3"}`}>
                    <button className="shadow-xl w-full py-2 px-0" onClick={handleClick}>
                        <i className="fa fa-user-circle mr-2  text-xl"></i>{isLoggedIn ? user.username : ""}</button>

                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/" onClick={()=> setIsOpen(false)} >خانه</NavLink>
                    {/* <NavLink className={({isActive})=> isActive ? "active" : ""} to="/setting" onClick={()=> setIsOpen(false)}>Setting</NavLink> */}
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/transactions" onClick={()=> setIsOpen(false)}>تراکنش ها</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/chart" onClick={()=> setIsOpen(false)}>جدولها</NavLink>
                </ul>
        )}
</> 
        
               
    )
}