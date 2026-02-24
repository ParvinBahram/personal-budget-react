import { useContext, useReducer, useState } from "react";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";

const initialState= {username:"", password:"", phoneNumber:"", email:"" };

export default function Register(){
    const [error,setError] = useState({});
     const {checked} = useContext(ThemeContext);
    const {handleRegister} = useContext(AuthContext);
    

 function reducer(state, action){
    switch (action.type) {
        case "setField":
            return{...state, [action.name]: action.value};
            
            case "reset" :
                return initialState;

                default:
                    return state;
                }
            }
           

 const handleChange= (e)=>{
    dispatch( {
        type:"setField",
        name: e.target.name,
        value: e.target.value
    })
 }

    const handleSubmit= (e)=>{
        e.preventDefault();
        let submitErr = {};

        if(user.username <4){
            submitErr.username ="حداقل4کاراکتر";
        }
         if(user.password.length <6){
            submitErr.password ="طول رمز نباید کمتر از 6 باشد"
        }
         if(user.phoneNumber.length < 11 || user.phoneNumber.length >11){
            submitErr.phoneNumber ="شماره تلفن معتبر نیست"
        }
         if(!user.email.includes("@")){
            submitErr.email="ایمیل باید شامل@باشد"
        }

        setError(submitErr);

        if(Object.keys(submitErr).length === 0){
            setError({});
            handleRegister(user);
            dispatch({type:"reset"})
            console.log(`username:${user.username}, password:${user.password}, phone:${user.phoneNumber}, email:${user.email}`);
    }}


    const [user,dispatch ]=useReducer(reducer, initialState)

    return(
        <div className="py-20 px-10  text-center">
            <h2 className="mb-5 ">پر کردن تمام فیلدها ضروری است</h2>
            <form className={`${checked ? "bg-white/10" : "bg-white shadow-lg"} p-4 w-60  rounded mx-auto space-y-6 `} onSubmit={handleSubmit}>
                <label className="field-label">نام کاربری</label>
                <input className="field-input" name="username" value={user.username} type="text"  onChange={handleChange}/>
                    {error.username && <p className="text-xs text-red-500 -mt-3">{error.username}</p>}

                <label className="field-label">رمز عبور</label>
                <input className="field-input" name="password" value={user.password} type="text"  onChange={handleChange}/>
                    {error.password && <p className="text-xs text-red-500 -mt-3">{error.password}</p>}

                <label className="field-label">شماره موبایل</label>
                <input className="field-input" name="phoneNumber" value={user.phoneNumber} type="number" onChange={handleChange} />
                    {error.phoneNumber && <p className="text-xs text-red-500 -mt-3">{error.phoneNumber}</p>}

                <label className="field-label">ایمیل</label>
                <input className="field-input" name="email" value={user.email} type="email" onChange={handleChange} />
                    {error.email && <p className="text-xs text-red-500 -mt-3">{error.email}</p>}

                <button className="rounded bg-teal-500 p-1 text-center" type="submit">ثبت نام</button>
            </form>
        </div>
    )
}