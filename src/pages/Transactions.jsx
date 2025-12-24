
import { useEffect, useState } from "react";

const initialState = {type:"", category:"", amount:"", date: ""};

export default function Transactions({ transactions, setTransactions, STORAGE_KEY, checked}){
    const [form, setForm] = useState(initialState);
    const [showForm, setShowForm] = useState(false);
      const [editTransaction, setEditTransaction] = useState(null);
      const [showAll, setShowAll] = useState(false);


    // save to local storage
  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  },[transactions])

     const addTransaction = (form)=>{
    const newTransaction= {id: Date.now(), ...form};
        setTransactions([...transactions, newTransaction]);
  }

   const handleEdit =(transaction)=>{
      setEditTransaction(transaction);
  }

  const handleDelete = (id)=> {
    console.log("deleted");
    const newTrans = transactions.filter((t) => t.id !== id)
    setTransactions(newTrans);
  }


     const updateTransaction = (id,updateFields)=>{
    setTransactions(prev=>
      prev.map((transaction) => transaction.id === id? {...transaction, ...updateFields}: transaction )
    )

  }

    const handleChange = (e)=>{
      const {name,value} = e.target;
      setForm((prev) => ({...prev, [name]:value }))
    }

    useEffect(()=>{
        if(editTransaction){ 
          setShowForm(true)          
            setForm({
                type:editTransaction.type,
                category: editTransaction.category,
                amount: editTransaction.amount,
                date: editTransaction.date
            });
          }
    },[editTransaction])


    const handleSubmit= (e)=>{
        e.preventDefault();
        if(editTransaction){
            updateTransaction(editTransaction.id, form)
        }else{
            addTransaction(form) ;
        }
        setForm(initialState);
        setShowForm(false);
    }

    const visibleTr= showAll ? transactions : transactions.slice(-5);
    return(
        <div className="py-5 px-6 min-h-screen">
             <button  className="cursor-pointer bg-teal-400 rounded border-none mt-5 mb-7 p-1" onClick={()=>{setShowForm(true), setForm(initialState), setEditTransaction(null)}}>
             Add new ➕
             </button> 
            <div className="flex flex-col sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto ">
             {visibleTr.map((t,i)=>
            < div key={t.id} className={`mb-5 border-none outline-0 shadow-xl  w-40 p-3 mx-auto rounded bg-gray-200 ${checked ? "bg-white text-gray-900" : ""}`}
>
            <p className="font-bold">transaction {i+1}</p>
            <p className="" >type= {t.type}</p>
            <p className="">category= {t.category}</p>
            <p className="">amount= {t.amount}</p>
            <p className="">date= {t.date}</p>
            <button className="bg-teal-300 rounded border-none px-1 mt-2" onClick={()=> handleEdit(t)}>Edit</button>
            <button className="bg-teal-300 rounded border-none px-1 mt-2 ml-4" onClick={()=> handleDelete(t.id)}>Delete</button>
              </div>
              )}
              </div> 

              {transactions.length > 5 && <div className="mx-auto text-center w-50 my-5">
              <button className="mt-5 rounded border-2 border-teal-500 otline-0 p-1 text-teal-600 w-full " onClick={()=> setShowAll(open => !open)}>{ showAll ? "نمایش کمتر" : "نمایش همه" }</button>
            </div>
            }

             {showForm && 
             <form action="" className=" mx-auto w-40 border p-2 fixed top-20 right-20" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4 ">
                <input type="text" name="type" value={form.type} className="" placeholder="type" onChange={handleChange} />
                <input type="text" name="category" value={form.category} className="" placeholder="category" onChange={handleChange}/>
                <input type="number" name="amount" value={form.amount} className="" placeholder="amount" onChange={handleChange}/>
                <input type="date" name="date" value={form.date} className="" placeholder="date" onChange={handleChange}/>
                </div>
                <button className="bg-teal-500 rounded border-none mt-5 p-1 ">
                  {editTransaction ? "Update" : "Add"}</button>
                <button className="ml-5" onClick={()=>{setShowForm(false), setForm(initialState), setEditTransaction(null)}}>❌</button>
                
             </form>
            }
        </div>
    )
}