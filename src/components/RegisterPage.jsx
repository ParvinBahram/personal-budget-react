import bg from "../assets/img/img3.jpg"
import Register from "./Register"
export default function RegisterPage({onRegister}){
    return(
        <>
        <div className="relative min-h-screen w-full flex items-senter justify-center bg-cover bg-left md:bg-center bg-no-repeat"
          style={{backgroundImage: `url(${bg})`}}>
            <Register   onRegister={onRegister}/>
            </div>
        
        </>
    )
}