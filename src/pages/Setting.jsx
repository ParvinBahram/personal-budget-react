
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
            <div className="mb-7">
                <input className="inputStatus ml-3"  type="checkbox"  checked={checked}  onChange={setTheme} />
            <label className="ml-2">تم تاریک 
            </label>
            </div>
            <div className="mb-7 flex flex-col sm:flex-row-reverse items-center gap-x-4 " >
                <label htmlFor="currency" className=""> واحد پول  </label>
                <div className="flex flex-row gap-x-5 mt-2">
                <div className="">
                <label htmlFor="" className="text-sm">
                <input type="radio" className="mr-1 " name="currency" value="toman" />
                    ریال
                </label>
                </div>
                <div className="">
                    <label htmlFor="" className="text-sm">
                <input type="radio" className="mr-1 " name="currency" value="dolar" />
                    دلار
                    </label>
                </div>
                 <div className="">
                    <label htmlFor="" className="text-sm">
                <input type="radio" className="mr-1 " name="currency" value="rial" />
                    تومان
                    </label>
                </div>
                </div>
                
              
            </div>

            <div className="mb-5">
                <select name="" value={dateType} onChange={(e)=>setDateType(e.target.value)} id="selected-date" className=" ml-3 p-0.5 rounded border border-teal-600 outline-0 text-sm">
                    <optgroup className={`${checked ? "text-black" : ""} text-center `}>
                    <option value="jalali">شمسی</option>
                    <option value="gregorian">میلادی</option>
                    <option value="hijri">قمری</option>
                    </optgroup>
                </select>
                <label htmlFor="selected-date" className="ml-2">نوع تاریخ </label>
            </div>


            
        </div>
        </AnimatedPage>
        
    )
}