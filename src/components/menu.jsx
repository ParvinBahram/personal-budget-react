import { useState } from 'react'
import { NavLink } from'react-router-dom'

export default function Navbar({checked}){
    const[isOpen, setIsOpen] = useState(false)
    return(
        <>
        <nav className="flex justify-around items-center py-4 shadow-lg ">
            <span className="sm:hidden" onClick={()=> setIsOpen(!isOpen)}><i className="fa fa-bars text-xl text-teal-600 "></i></span>
              
            <p className=" text-lg text-teal-700  ">💳Budget Management</p>
             <ul className="hidden sm:flex sm:flex-row justify-center gap-4 lg:gap-6">
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/" >Home</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/setting">Setting</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/transactions">Transactions</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/chart">Chart</NavLink>
                </ul>
        </nav>

        {isOpen && (
         <ul className={`absolute w-[20%] sm:hidden flex flex-col items-start p-2 space-y-2  h-screen shadow-lg ${checked? "bg-gray-400 text-black" : "bg-teal-400 "}`}>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/" onClick={()=> setIsOpen(false)} >Home</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/setting" onClick={()=> setIsOpen(false)}>Setting</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/transactions" onClick={()=> setIsOpen(false)}>Transactions</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active" : ""} to="/chart" onClick={()=> setIsOpen(false)}>Chart</NavLink>
                </ul>
        )}
</> 
        
               
    )
}