import { useReducer } from "react";

const initialState= {username:"", password:"", phoneNumber:"", email:"" };

export default function Register({onRegister}){

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
           

 const handleSubmitChange= (e)=>{
    dispatch( {
        type:"setField",
        name: e.target.name,
        value: e.target.value
    })
 }

    const handleSubmit= (e)=>{
        e.preventDefault();
        onRegister(user);
        dispatch({type:"reset"})
        console.log(`username:${user.username}, password:${user.password}, phone:${user.phoneNumber}, email:${user.email}`);
    }


    const [user,dispatch ]=useReducer(reducer, initialState)

    return(
        <div className="py-20 px-10  text-center">
            <h2 className="mb-5">پر کردن تمام فیلدها ضروری است</h2>
            <form className="p-4 w-60 border border-gray-400 rounded mx-auto" onSubmit={handleSubmit}>
                <label className="field-label">نام کاربری</label>
                <input className="field-input" name="username" value={user.username} type="text"  onChange={handleSubmitChange}/>

                <label className="field-label">رمز عبور</label>
                <input className="field-input" name="password" value={user.password} type="text"  onChange={handleSubmitChange}/>

                <label className="field-label">شماره موبایل</label>
                <input className="field-input" name="phoneNumber" value={user.phoneNumber} type="number" onChange={handleSubmitChange} />

                <label className="field-label">ایمیل</label>
                <input className="field-input" name="email" value={user.email} type="email" onChange={handleSubmitChange} />
                <button className="rounded bg-green-400 p-1 text-center" type="submit">ثبت نام</button>
            </form>
        </div>
    )
}