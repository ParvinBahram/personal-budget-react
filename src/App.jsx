import  {Routes, Route, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import CRUD from "./pages/CRUD.jsx";
import Chart from "./pages/Chart";
import Navbar from "./components/menu.jsx";
import { useEffect, useState } from "react";

const STORAGE_KEY = "app_transaction";

export default function App(){
  const navigate= useNavigate()
  // read localstorage
  const [transactions, setTransactions] = useState(()=>{
    const savedTrans =localStorage.getItem(STORAGE_KEY);
    return savedTrans ? JSON.parse(savedTrans) : [];
  });
  const [editTransaction, setEditTransaction] = useState(null);


  // save to local storage
  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  },[transactions])


  const addTransaction = (form)=>{
    const newTransaction= {id: Date.now(), ...form};
        setTransactions([...transactions, newTransaction]);
  }

  const updateTransaction = (id,updateFields)=>{
    setTransactions((prev)=>{
      prev.map((transaction) => transaction.id === id? {...transaction, ...updateFields}: transaction )
    })

  }

  const handleEdit =(transaction)=>{
      setEditTransaction(transaction);
      navigate("/crud")
  }


  return (
      <div className="">
        <Navbar />
    <Routes  >
      <Route path="/" element={<Home transactions={transactions} handleEdit={handleEdit} />}/>
      <Route path="/setting" element={<Setting/>}/>
      <Route path="/crud" element={<CRUD  transactions={transactions}  addTransaction={addTransaction} 
        updateTransaction={updateTransaction}  editTransaction={editTransaction}  />}/>
      <Route path="/chart" className="" element={<Chart/>}/>
      
    </Routes>
      </div>
  )
}