import { Link, NavLink, Outlet } from "react-router-dom";
import AnimatedPage from "../../animations/AnimatedPage";

export default function Home({transactions, user, onLogout}){
    
    return(
        <AnimatedPage>
    <>
        <div className=" px-4  flex flex-row">
            {/* محتوای نوار سمت چپ home */}
            <div className="border-r-2 border-r-teal-500 flex flex-col w-[50%]  w-full md:w-[37%] lg:w-[20%]  pr-2 min-h-screen  ">
             <div className="py-5">
            <p className="">{user?.username} عزیز خوش آمدید</p>
            <button className="rounded bg-teal-500 p-1 text-center my-5 ml-4" onClick={onLogout}>خروج</button>
        </div>

            <div className="ml-4 pb-5">
                <NavLink to="/profile">حساب کاربری</NavLink>
            </div>        

             <div className="ml-4 py-2 ">
                <NavLink to="/setting" >تنظیمات</NavLink>
            </div>

            </div>

            <div className="ml-5 w-full text-end py-5">
            {transactions.length === 0 ? ( 
              <>
                <p className="mb-4 ">هیچ  تراکنشی وجود ندارد. برای ایجاد کلیک کنید </p>
                 <div className="">
                <Link to="/transactions" className=" cursor-pointer bg-teal-400 rounded border-none p-1 h-max mr-2">ایجاد تراکنش جدید ➕</Link> 
                 </div>
             </>
                 ): (
                    <div className="">
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