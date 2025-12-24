import { Link, NavLink, Outlet } from "react-router-dom";

export default function Home({transactions, user, onLogout}){
    
    return(
    <>
        <div className="py-5 px-4  flex flex-row">
            {/* محتوای نوار سمت چپ home */}
            <div className="flex flex-col w-[50%] w-full md:w-[37%] lg:w-[20%]  pr-2 min-h-screen  ">
             <div className="">
            <p className=""> عزیز خوش آمدید {user.username}</p>
            <button className="rounded bg-teal-500 p-1 text-center my-5 ml-4" onClick={onLogout}>logout</button>
        </div>

            <div className="ml-4 pb-5">
                <NavLink to="/profile">Profile</NavLink>
            </div>        

             <div className="ml-4 py-2 ">
                <NavLink to="/setting" >Setting</NavLink>
            </div>
            </div>

            <div className="ml-5 w-full">
            {transactions.length === 0 ? ( 
              <>
                <p className="mb-4">There is no transaction. please create </p>
                <Link to="/transactions" className="cursor-pointer bg-teal-400 rounded border-none p-1 h-max ml-2">Add New Transaction ➕</Link> 
             </>
                 ): (
                    <p >you have <strong>{transactions.length}</strong> transactions. click 
                    <NavLink to="/transactions" className="font-bold"> here </NavLink>
                     to see details </p>
                 )}
            
            </div>
        </div>
        </>
    
    )
}