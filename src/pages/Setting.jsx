
import { useContext } from "react";
import AnimatedPage from"../../animations/AnimatedPage"
import { ThemeContext } from "../components/Context";


export default function Setting({dateType,setDateType}){
    const {checked,setChecked}= useContext(ThemeContext);
const setTheme = (e)=>{
    setChecked(e.target.checked);
}
    
    return(
        <AnimatedPage>
        <div className="ml-6 py-2 min-h-screen">
            <div className="mb-5">
                <input className="inputStatus ml-3"  type="checkbox"  checked={checked}  onChange={setTheme} />
            <label className="ml-2">تم تاریک 
            </label>
            </div>
            <div className="mb-5">
                <select id="currency"  className="p-0.5 rounded border border-teal-600 outline-0 ml-4">
                    <div className={ `${checked ? "text-black" : ""} text-center`}>
                    <option value="toman">تومان</option>
                    <option value="dolar">دلار</option>
                    <option value="rial">ریال</option>
                    <option value="euro">یورو</option>
                    </div>
                </select>
                <label htmlFor="currency" className="ml-2"> واحد پول  </label>
            </div>

            <div className="mb-5">
                <select name="" value={dateType} onChange={(e)=>setDateType(e.target.value)} id="selected-date" className=" ml-3 p-0.5 rounded border border-teal-600 outline-0">
                    <div className={`${checked ? "text-black" : ""} text-center `}>
                    <option value="jalali">شمسی</option>
                    <option value="gregorian">میلادی</option>
                    <option value="hijri">قمری</option>
                    </div>
                </select>
                <label htmlFor="selected-date" className="ml-2">نوع تاریخ </label>
            </div>


            
        </div>
        </AnimatedPage>
        
    )
}