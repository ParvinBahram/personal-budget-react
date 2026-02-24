import { createContext, useState } from "react";

const TRANSACTION_KEY = "app_transaction";
export const TransactionContext = createContext();

export default function TransactionProvider({children}){
    const [transactions, setTransactions] = useState(()=>{
    const savedTrans =localStorage.getItem(TRANSACTION_KEY);
    return savedTrans ? JSON.parse(savedTrans) : [];
  });

  return(
    <TransactionContext.Provider value={{transactions, setTransactions, TRANSACTION_KEY}}>
        {children}
    </TransactionContext.Provider>
  )
}