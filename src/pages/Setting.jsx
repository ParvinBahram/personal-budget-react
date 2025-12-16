export default function Setting({checked,setChecked}){
  

const setTheme = (e)=>{
    setChecked(e.target.checked);
}
    
    return(
        <div className="h-screen px-6 py-5 ">
            <label className="">Set Theme
                <input className="inputStatus ml-3"  type="checkbox"  checked={checked}  onChange={setTheme} />
            </label>
        </div>
    )
}