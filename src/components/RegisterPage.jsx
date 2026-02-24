import { useContext } from "react"
import bg from "../assets/img/img1.jpg"
import Register from "./Register"
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";

export default function RegisterPage(){
    const {checked} = useContext(ThemeContext);
             

    return(
        <>
        <div className={`${checked ? "bg-gray-900 " : "relative min-h-screen w-full flex items-senter justify-center bg-cover bg-bottom bg-center md:bg-center bg-no-repeat" }`}
          style={!checked ? {backgroundImage: `url(${bg})`}: {}}>
            <Register />
            </div>
        
        </>
    )
}