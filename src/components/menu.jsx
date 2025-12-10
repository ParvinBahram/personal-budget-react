import { useState } from 'react'
import { NavLink } from'react-router-dom'

export default function Navbar(){
    const[isOpen, setIsOpen] = useState(false)
    return(
        <>
        <nav className="flex justify-around items-center py-4 shadow-lg ">
            <span className="sm:hidden" onClick={()=> setIsOpen(!isOpen)}><i className="fa fa-bars text-xl text-teal-600 "></i></span>
            <span className="hidden sm:block"><i className="fa fa-user-circle text-2xl text-teal-600"></i></span>
            <p className=" text-lg text-teal-700  ">💳Budget Management</p>
             <ul className="hidden sm:flex sm:flex-row justify-center gap-4 lg:gap-6">
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/" >Home</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/setting">Setting</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/crud">CRUD</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/chart">Chart</NavLink>
                </ul>
        </nav>

        {isOpen && (
         <ul className="absolute w-[20%] sm:hidden flex flex-col items-center p-2 bg-teal-100 space-y-2 w-20 h-screen shadow-lg ">
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/" onClick={()=> setIsOpen(false)} >Home</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/setting" onClick={()=> setIsOpen(false)}>Setting</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/crud" onClick={()=> setIsOpen(false)}>CRUD</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/chart" onClick={()=> setIsOpen(false)}>Chart</NavLink>
                </ul>
        )}
</> 
        
               
    )
}