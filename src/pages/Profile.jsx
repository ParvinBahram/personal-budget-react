import { useState } from "react";

export default function Profile({user, USER_STORAGE_kEY}){
        const [editUser,setEditUser]= useState(user);
        const[isEditing, setIsEditing]= useState(false);
        const [showPassword, setShowPassword]= useState(false);

    const handleChange=(e)=>{
       const {name, value}= e.target;
       setEditUser(prev =>({...prev, [name]:value}))

    }


    const handleSubmit =(e)=>{
        e.preventDefault();
        localStorage.setItem(USER_STORAGE_kEY, JSON.stringify(editUser));
        setIsEditing(false);
        alert("تغییرات با موفقیت ذخیره شد");
    }

    return(
        <div className="min-h-screen">
             <form className="my-10 py-8 p-4 w-70 border border border-gray-300 shadow-xl  rounded mx-auto space-y-5 text-end"
               onSubmit={handleSubmit}>
                 
                  <div>
                    <label  className="">ویرایش  رمز</label>
                        <div className="relative flex items-center">
                    <input  className="field-input " name="password" value={editUser.password} disabled={!isEditing} type={showPassword? "text" : "password"}
                     onChange={handleChange} /> 
                     <button type="button" className="absolute right-5 top-3 text-center" 
                     onClick={()=> setShowPassword(prev => !prev)}>{showPassword? "🙈" : "👁"}
                     </button> 
                    </div>
                </div>
                <div>
                    <label  className="">ویرایش  موبایل</label>
                    <input  className="field-input " name="phoneNumber" value={editUser.phoneNumber} disabled={!isEditing} type="number" onChange={handleChange} />
                </div>
                <div>
                <label className="">ویرایش ایمیل</label>
                <input className="field-input " name="email" value={editUser.email} disabled={!isEditing} type="email" onChange={handleChange} />
                </div>
                
                <div className="flex justify-around">
                <button className="rounded bg-green-400 p-1 text-center " type="submit">ذخیره تغییرات</button> 
                <button className="rounded bg-green-400 p-1 text-center  " type="button" onClick={()=> setIsEditing(true)}>ویرایش</button> 
                </div>
            </form>
            </div>
        
    ) 
}