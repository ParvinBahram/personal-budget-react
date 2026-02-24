import { createContext, useEffect, useState } from "react";



export const ThemeContext = createContext();

export default function ThemeProvider({children}){

 const [checked, setChecked]= useState(()=>{
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  useEffect(()=>{
    localStorage.setItem("theme", checked? "dark": "light")
  }, [checked])

  return(
    <ThemeContext.Provider value={{checked, setChecked}}>
        {children}
    </ThemeContext.Provider>
  );

}