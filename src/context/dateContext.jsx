import { createContext, useEffect, useState } from "react";

const DATE_TYPE ="date_type";

export const DateContext = createContext();

export default function DateProvider({children}){
     const [dateType, setDateType]=useState(()=>{
          return localStorage.getItem(DATE_TYPE) ||"jalali" })
    
      useEffect(()=>{
         localStorage.setItem(DATE_TYPE, dateType)
      },[dateType]);

      return(
        <DateContext.Provider value={{dateType, setDateType, DATE_TYPE}}>
            {children}
        </DateContext.Provider>
      )
}