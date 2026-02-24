import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeContext";

export default function Login(){
const [login, setLogin] = useState({username:"", password:""});
  const [loginError, setLoginError]=useState("");
 const {checked} = useContext(ThemeContext);
const {handleLogin} = useContext(AuthContext);

const navigate = useNavigate()

    const handleChange =(e)=>{
        const {name, value}= e.target;
        setLogin((prev)=>({...prev, [name]:value}))
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        const result = handleLogin(login);
        
            if(result ==="NO_USER"){
                 setLoginError( "شما حسابی ندارید. ابتدا یک حساب ایجاد کنید" );
                 return;
            }else if(result === "INVALID_DATA")  {
                setLoginError( "نام کاربری یا رمز عبور اشتباه است" );
                return;
            }
            // ورود موفق
            setLoginError("")
        navigate("/",{replace:true});
    }


    return(
        <div className="pb-10 pt-30 sm:pt-20 px-10  text-center">
            <h2 className="mb-5">ورود به حساب کاربری</h2>
            <form className={`${checked ? "bg-white/10" : "bg-white shadow-lg"} p-4 w-60 rounded mx-auto h-max`} onSubmit={handleSubmit}>
                <label className="field-label text-end">نام کاربری</label>
                <input className="field-input  p-2 text-end " name="username" value={login.username} type="text"  onChange={handleChange}/>

                <label className="field-label ">رمز عبور</label>
                <input className="field-input  p-2" name="password" value={login.password} type="text"  onChange={handleChange}/>
                <button className="rounded bg-teal-400 p-1 text-center mt-3" type="submit">ورود</button>
        </form>
                <NavLink  to="/registerPage" className="inline-block mr-3 text-sm text-blue-700"  >ایجاد حساب کاربری</NavLink  >
                <p className="mt-5 inline-block">حساب کاربری ندارید؟</p>
                <NavLink to="/forgetPassword" className="block mt-2 text-sm text-blue-600" >فراموشی گذرواژه</NavLink>

                {loginError && <div className="fixed top-10 left-1/2 -translate-x-1/2  border-none rounded-lg bg-red-200 px-2 py-4  text-center text-red-600">
                 <p>{loginError}</p>
                </div>
                }
        </div>
         )
    
}