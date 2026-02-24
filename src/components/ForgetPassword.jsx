import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeContext";


// const navigate = useNavigate();

export default function ForgetPassword(){
    const {checked} = useContext(ThemeContext);
    const {USER_STORAGE_kEY, user, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const[forgetForm,setForgetForm]= useState({ password: "",  confirmPassword: "" });
    const [error,setError] = useState("");
    const [success,setSuccess]= useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
       const {name, value} = e.target;
        setForgetForm(prev => ({...prev, [name]: value}));
    }


    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!user){
            setError(" هیچ کاربری وجود ندارد");
            return;
        }

        if(!forgetForm.password || !forgetForm.confirmPassword){
            setError(" همه فیلدها الزامی است");
            return;
        }

        if(forgetForm.password === user.password){
            setError("  رمز جدید با رمز قبلی برابر است ");
            return;
        }

        if(forgetForm.password !== forgetForm.confirmPassword){
            setError(" رمز عبور با تکرار آن برابر نیست");
            return;
        }

        const updateUser = {
            ...user,
            password: forgetForm.password
        }

        localStorage.setItem(USER_STORAGE_kEY, JSON.stringify(updateUser));
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);

    setError("");
    setSuccess("رمز عبور با موفقیت تغییر کرد");


    setTimeout(()=>{
        navigate("/loginPage", {replace:true});
    }, 1500)
    }

    return(
        
        <div className="py-10 px-10 text-center">
             {error && (
                <div className="rounded bg-red-200 w-max p-2 mt-4 text-red-500 text-sm mx-auto">{error}</div>
            )}

            {success && (
                <div className="rounded bg-green-200 w-max p-2 mt-4 text-green-500 text-sm mx-auto">{success}</div>
            )}
            <form className={`${checked ? "bg-white/10" : "bg-white/80"} p-4 w-60 rounded mx-auto`} onSubmit={handleSubmit}>
                <label className="field-label text-end"> رمز جدید</label>
                <input className="field-input  p-2 text-end " name="password" value={forgetForm.password} type="password"  onChange={handleChange}/>
                <label className="field-label "> تکرار رمز جدید  </label>
                <input className="field-input  p-2" name="confirmPassword" value={forgetForm.confirmPassword}  type="password"  onChange={handleChange}/>
                <button className="rounded bg-teal-400 p-1 text-center mt-3" type="submit">ذخیره</button>
        </form>
        </div>
    )
}