import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login({onLogin}){
const [login, setLogin] = useState({username:"", password:""});
const navigate = useNavigate()

    const handleLoginChange =(e)=>{
        const {name, value}= e.target;
        setLogin((prev)=>({...prev, [name]:value}))
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        onLogin();
        navigate("/")
    }

    return(
        
        <div className="py-20 px-10  text-center">
            <h2 className="mb-5">ورود به حساب کاربری</h2>
            <form className="p-4 w-60 border border-gray-400 rounded mx-auto" onSubmit={handleSubmit}>
                <label className="field-label">نام کاربری</label>
                <input className="field-input" name="username" value={login.username} type="text"  onChange={handleLoginChange}/>

                <label className="field-label">رمز عبور</label>
                <input className="field-input" name="password" value={login.password} type="text"  onChange={handleLoginChange}/>
                <button className="rounded bg-green-400 p-1 text-center" type="submit">ورود</button>
        </form>
        </div>
         )
    
}