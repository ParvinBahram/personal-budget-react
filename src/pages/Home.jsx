import { Link, NavLink, Outlet } from "react-router-dom";
import AnimatedPage from "../../animations/AnimatedPage";

export default function Home({transactions, user, onLogout}){
    
    return(
        <AnimatedPage>
    <>
        <div className="flex flex-row min-h-screen">
            <div className="ml-5 w-full text-end py-5">
            {transactions.length === 0 ? ( 
              <>
                <p className="mb-4 ">هیچ  تراکنشی وجود ندارد. برای ایجاد کلیک کنید </p>
                 <div className="">
                <Link to="/transactions" className=" cursor-pointer bg-teal-400 rounded border-none p-1 h-max mr-2">ایجاد تراکنش جدید ➕</Link> 
                 </div>
             </>
                 ): (
                    
                    <div className="pr-4">
                    <p >شما <strong>{transactions.length}</strong> تراکنش دارید. برای دیدن جزئیات
                    <NavLink to="/transactions" className="font-bold"> اینجا </NavLink> کلیک کنید
                      </p>

                      </div>

                        
                 )}
            
            </div>
        </div>
        </>
    
    </AnimatedPage>
    )
}