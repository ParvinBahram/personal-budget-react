import Login from "./Login"
import bg from "../assets/img/img5.jpg"
import { useContext } from "react"
import { ThemeContext } from "../context/themeContext";
// import { AuthContext } from "../context/authContext";

export default function LoginPage(){
    const {checked} = useContext(ThemeContext);
         

    return(
        <>
        <div className={`${checked ? "bg-gray-900" : "relative min-h-screen w-full flex items-senter justify-center bg-cover  bg-bottom bg-no-repeat"}`}
          style={!checked ? {backgroundImage: `url(${bg})`} : {}}>
            <Login />
            </div>
        </>
    )
}