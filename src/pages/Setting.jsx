
import AnimatedPage from"../../animations/AnimatedPage"


export default function Setting({checked,setChecked,dateType,setDateType}){
const setTheme = (e)=>{
    setChecked(e.target.checked);
}
    
    return(
        <AnimatedPage>
        <div className="ml-6 py-2 min-h-screen">
            <div className="mb-5">
            <label className="">تغییر تم 
                <input className="inputStatus ml-3"  type="checkbox"  checked={checked}  onChange={setTheme} />
            </label>
            </div>
            <div className="mb-5">
                <label htmlFor="currency"> واحد پول  </label>
                <select id="currency"  className={`${checked ? "text-black" : ""} p-0.5 rounded border border-teal-600 outline-0`}>
                    <option value="toman">تومان</option>
                    <option value="dolar">دلار</option>
                    <option value="rial">ریال</option>
                    <option value="euro">یورو</option>
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="selected-date"> نوع تاریخ </label>
                <select name="" value={dateType} onChange={(e)=>setDateType(e.target.value)} id="selected-date" className={`${checked ? "text-black" : ""} p-0.5 rounded border border-teal-600 outline-0`}>
                    <option value="jalali">شمسی</option>
                    <option value="gregorian">میلادی</option>
                    <option value="hijri">قمری</option>
                </select>
            </div>


            
        </div>
        </AnimatedPage>
        
    )
}