export default function Setting({checked,setChecked}){
  

const setTheme = (e)=>{
    setChecked(e.target.checked);
}
    
    return(
        
        <div className="ml-6 py-2 min-h-screen">
            <div className="mb-5">
            <label className="">Set Theme
                <input className="inputStatus ml-3"  type="checkbox"  checked={checked}  onChange={setTheme} />
            </label>
            </div>
            <div className="">
                <label htmlFor="currency"> currency  </label>
                    {/* <div className=}> */}
                <select id="currency" className={`${checked ? "text-black" : ""} p-0.5 rounded border border-teal-600 outline-0`}>
                    <option value="">تومان</option>
                    <option value="">دلار</option>
                    <option value="">ریال</option>
                    <option value="">یورو</option>
                </select>
                    {/* </div> */}
            </div>
        </div>
        
    )
}