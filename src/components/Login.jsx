import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";

export default function Login({onLogin, loginErr}){
const [login, setLogin] = useState({username:"", password:""});
const navigate = useNavigate()

    const handleChange =(e)=>{
        const {name, value}= e.target;
        setLogin((prev)=>({...prev, [name]:value}))
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        const isLogged = onLogin(login);
        if(!isLogged){
            if(loginErr ==="NO_USER"){
                 alert("شما حسابی ندارید. ابتدا یک حساب ایجاد کنید")
            }else  {
                alert("نام کاربری یا رمز عبور اشتباه است")
            }
            return;
        }
        navigate("/")
    }


    return(
        
        <div className="py-20 px-10  text-center">
            <h2 className="mb-5">ورود به حساب کاربری</h2>
            <form className="p-4 w-60 border border-gray-400 rounded mx-auto" onSubmit={handleSubmit}>
                <label className="field-label">نام کاربری</label>
                <input className="field-input" name="username" value={login.username} type="text"  onChange={handleChange}/>

                <label className="field-label">رمز عبور</label>
                <input className="field-input" name="password" value={login.password} type="text"  onChange={handleChange}/>
                <button className="rounded bg-green-400 p-1 text-center" type="submit">ورود</button>
        </form>
                <NavLink  to="/register" className="inline-block mr-3 text-sm text-blue-600"  >ایجاد حساب کاربری</NavLink  >
                <p className="mt-5 inline-block">حساب کاربری ندارید؟</p>
                <NavLink to="/forgetPassword" className="block mt-2 text-sm text-blue-500" >فراموشی گذرواژه</NavLink>
        </div>
         )
    
}