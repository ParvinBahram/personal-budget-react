import Login from "./Login"
import bg from "../assets/img/img4.jpg"
export default function LoginPage({onLogin}){
    return(
        <>
        <div className="relative min-h-screen w-full flex items-senter justify-center bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: `url(${bg})`}}>
            <Login   onLogin={onLogin}/>
            </div>
        
        </>
    )
}