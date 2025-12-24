import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword({parsedUser,USER_STORAGE_kEY}){

    const [forgetForm,setForgetForm]= useState({newPassword:"", confirmNewPassword:""});
    const navigate= useNavigate();

    const handleChange=(e)=>{
      const {name,value} = e.target;
      setForgetForm((prev)=> ({...prev, [name]: value}))
    }


    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(parsedUser.password === forgetForm.newPassword ){
            alert("رمز جدید با رمز قبلی یکسان است");
            return;
        }

        if(forgetForm.newPassword !== forgetForm.confirmNewPassword){
            alert("رمز جدید با تکرار آن برابر نیست")
            return;
        }

        if(forgetForm.newPassword.length <6){
            alert("طول رمز نباید کمتر از 6 باشد");
            return;
        }
        parsedUser.password = forgetForm.newPassword ;
        alert("رمز با موفقیت تغییر کرد");
        navigate("/")

        localStorage.setItem(USER_STORAGE_kEY, JSON.stringify(parsedUser));
                   
    }
    
    return(
        <form className="flex flex-col mx-auto text-center mt-10 items-center justify-center" onSubmit={handleSubmit}>
            <h2 className="text-xl text-center">بازیابی گذرواژه</h2>
            <label htmlFor="">
            <input type="text" onChange={handleChange}  name="newPassword" value={forgetForm.newPassword} className="outline-0 border-gray-500 p-1 my-10 mr-9" /> رمز جدید
            </label>
            <label htmlFor="">
            <input type="text" onChange={handleChange}  name="confirmNewPassword" value={forgetForm.confirmNewPassword} className="outline-0 border-gray-500 p-1 mr-2" />تکرار رمز جدید 
            </label>
            <button className="mt-5" type="submit">ذخیره</button>
        </form>
    )
}