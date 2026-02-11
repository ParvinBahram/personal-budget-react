import { useContext } from "react"
import bg from "../assets/img/img1.jpg"
import Register from "./Register"
import { ThemeContext } from "./Context"

export default function RegisterPage({onRegister}){
    const {checked} = useContext(ThemeContext)
    return(
        <>
        <div className={`${checked ? "bg-gray-900 " : "relative min-h-screen w-full flex items-senter justify-center bg-cover bg-bottom bg-center md:bg-center bg-no-repeat" }`}
          style={!checked ? {backgroundImage: `url(${bg})`}: {}}>
            <Register   onRegister={onRegister}/>
            </div>
        
        </>
    )
}