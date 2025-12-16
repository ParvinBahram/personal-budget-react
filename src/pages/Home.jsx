import { Link, NavLink } from "react-router-dom";

export default function Home({transactions, user, onLogout}){
    // console.log(transactions);
    
    return(
    
        <div className="py-5 px-4 min-h-screen">

             <div className="profile">
            <p className="">{user.username}عزیز خوش امدین</p>
            <button className="rounded bg-green-400 p-1 text-center my-5" onClick={onLogout}>logout</button>
        </div>

            {transactions.length === 0 ? ( 
              <>
                <p className="mb-4">There is no transaction. please create </p>
                <Link to="/transactions" className="cursor-pointer bg-teal-400 rounded border-none p-1">Add New Transaction ➕</Link> 
             </>
                 ): (
                    <p >you have <strong>{transactions.length}</strong> transactions. click 
                    <NavLink to="/transactions" className="font-bold"> here </NavLink>
                     to see details </p>
                 )}
            
        </div>
    
    )
}