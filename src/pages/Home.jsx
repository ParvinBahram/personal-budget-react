import { Link } from "react-router-dom";

export default function Home({transactions, handleEdit}){
    return(
        <div className="my-5 px-4">
            {transactions.length === 0 ? ( 
              <>
                <p className="mb-4">There is no transaction. please create </p>
                <Link to="/crud" className="cursor-pointer bg-teal-400 rounded border-none p-1">Add New Transaction ➕</Link> 
             </>
             ): (
                  transactions.map((t,i)=>(
            < div key={t.id} className="mb-5 border w-max p-2">
            <p className="font-bold">transaction {i+1}</p>
            <p className="" >type= {t.type}</p>
            <p className="">category= {t.category}</p>
            <p className="">amount= {t.amount}</p>
            <p className="">date= {t.date}</p>
            <button className="bg-teal-400 rounded border-none px-1 mt-2" onClick={()=> handleEdit(t)}>Edit</button>
            </div>
           )))}
            
        </div>
    )
}