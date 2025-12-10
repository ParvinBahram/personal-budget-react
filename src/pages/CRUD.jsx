import { useEffect, useState } from "react"

const initialState = {type:"", category:"", amount:"", date: ""};

export default function CRUD({addTransaction, updateTransaction, editTransaction}){
    const [form, setForm] = useState(initialState);
    const [showForm, setShowForm] = useState(false);


    const handleChange = (e)=>{
      const {name,value} = e.target;
      setForm((prev) => ({...prev, [name]:value }))
    }

    useEffect(()=>{
        if(editTransaction){           
            setForm({
                type:editTransaction.type,
                category: editTransaction.category,
                amount: editTransaction.amount,
                date: editTransaction.date
            });
             setForm(initialState);
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

    return(
        <div className="my-5 px-4">
             <button to="/crud" className="cursor-pointer bg-teal-400 rounded border-none mb-2 p-1" onClick={()=>setShowForm(true) }>
             Add new ➕
             </button> 
             {showForm && 
             <form action="" className=" mx-auto w-40 border p-2" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4 ">
                <input type="text" name="type" value={form.type} className="" placeholder="type" onChange={handleChange} />
                <input type="text" name="category" value={form.category} className="" placeholder="category" onChange={handleChange}/>
                <input type="number" name="amount" value={form.amount} className="" placeholder="amount" onChange={handleChange}/>
                <input type="date" name="date" value={form.date} className="" placeholder="date" onChange={handleChange}/>
                </div>
                <button className="bg-teal-500 rounded border-none mt-5 p-1 ">Add</button>
             </form>
            }
        </div>
    )
}