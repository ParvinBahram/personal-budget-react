
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import arabic from "react-date-object/calendars/arabic" ;
import arabic_ar from "react-date-object/locales/arabic_ar";
import AnimatedPage from "../../animations/AnimatedPage";
import AnimatedModal from "../../animations/AnimatedModal";

const initialState = {type:"", category:"", amount:"", date: ""};

export default function Transactions({ transactions, setTransactions, STORAGE_KEY,dateType, checked}){
    const [form, setForm] = useState(initialState);
    const [showModal, setShowModal] = useState(false);
      const [editTransaction, setEditTransaction] = useState(null);
      const [showAll, setShowAll] = useState(false);
      const [date, setDate]=useState(null);


  const calenderConfig = {
    jalali:{
      calendar: persian,
      locale:persian_fa,
    },

    gregorian :{
      calendar: gregorian,
      locale: gregorian_en,
    },

    hijri:{
      calendar: arabic,
      locale:arabic_ar,
  },
  }


    // save to local storage
  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  },[transactions])

     const addTransaction = (form)=>{
    const newTransaction= {id: Date.now(), ...form};
        setTransactions([...transactions, newTransaction]);
  }

   const handleEdit =(transaction)=>{
      setEditTransaction(transaction);
  }

  const handleDelete = (id)=> {
    console.log("deleted");
    const newTrans = transactions.filter((t) => t.id !== id)
    setTransactions(newTrans);
  }


     const updateTransaction = (id,updateFields)=>{
    setTransactions(prev=>
      prev.map((transaction) => transaction.id === id? {...transaction, ...updateFields}: transaction )
    )

  }

    const handleChange = (e)=>{
      const {name,value} = e.target;
      
      setForm((prev) => ({...prev, [name]:value }))
    }

    useEffect(()=>{
        if(editTransaction){ 
          setShowModal(true)          
            setForm({
                type:editTransaction.type,
                category: editTransaction.category,
                amount: editTransaction.amount,
                date: editTransaction.date
            });
          }
    },[editTransaction])


    const handleSubmit= (e)=>{
        e.preventDefault();
        if(editTransaction){
            updateTransaction(editTransaction.id, form)
        }else{
            addTransaction(form) ;
        }
        setForm(initialState);
        setShowModal(false);
    }

    const visibleTr= showAll ? transactions : transactions.slice(-5);
    return(
      <AnimatedPage >
        <div dir="rtl" className="py-5 px-6 min-h-screen">
             <button  className="cursor-pointer bg-teal-400 rounded border-none mt-5 mb-7 p-1" 
             onClick={()=>{setShowModal(true), setForm(initialState), setEditTransaction(null)}}>
              ایجاد تراکنش ➕
             </button> 
            <div className="flex flex-col gap-y-10 sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mx-auto ">
             {visibleTr.map((t,i)=>
            < div key={t.id} className={`flex flex-col  items-start gap-y-3 border-none outline-0 shadow-xl  w-40 xl:w-46 p-3 mx-auto rounded bg-gray-200 ${checked ? "bg-white text-gray-900" : ""}`}
>
            <p className="font-bold text-center"> تراکنش  {i+1}</p>
            <p className={t.type === "debt" ? "text-red-600" : "text-green-600"} > نوع = {t.type  === "debt" ?  " بدهکاری" : "بستانکاری"}</p>
            <p className="">دسته بندی = {t.category}</p>
            <p className=""> مقدار= {t.amount}</p>
            <p className=""> تاریخ =  {t.date}</p>

             <div className="flex justify-center mx-auto gap-4">
            <button className="bg-teal-300 rounded border-none px-1 mt-2" onClick={()=> handleEdit(t)}>ویراش</button>
            <button className="bg-teal-300 rounded border-none px-1 mt-2 " onClick={()=> handleDelete(t.id)}>حذف</button>
             </div>
              </div>
              )}
              </div> 

              {transactions.length > 5 && 
              <div className="mx-auto text-center w-50 mt-10">
              <button className=" rounded border-2 border-teal-500 otline-0 p-1 text-teal-600 w-full " 
                onClick={()=> setShowAll(open => !open)}>{ showAll ? "نمایش کمتر" : "نمایش همه" }</button>
                </div> 
            }
             <div className={`${transactions.length === 0 ? "hidden": "w-50 mt-15 mx-auto" }`}>
            <button className=" rounded border-2 border-teal-500 otline-0 p-1   text-teal-600 w-full"
              onClick={()=>setTransactions([])} > حذف همه </button>
             </div>

             {/* {showModal &&  */}
             
                 <AnimatedModal isOpen={showModal} onClose= {(()=>{
                setShowModal(false);
                setForm(initialState);
                setEditTransaction(null)
      })}>
             <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[100] 
               before:fixed before:inset-0 before:w-full before:h-full before:bg-gray-300/70 overflow-auto">
               
                <form action="" className="  mt-10 mx-auto bg-white z-[102] p-4 rounded-xl shadow-xl" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4 ">
                  <select className="text-sm border border-gray-400" name="type" value={form.type} id="" onChange={handleChange}>
                <option value="" disabled >نوع تراکنش</option>
                <option className="text-red-600" value="debt">بدهکاری</option>
                <option  className="text-green-600" value="credit">بستانکاری</option>
              </select>
                <input type="text" name="category" value={form.category} className="" placeholder="category" onChange={handleChange} required/>
                <input type="number" name="amount" value={form.amount} className="" placeholder="amount" onChange={handleChange} required/>
                  <DatePicker value={date} onChange={(value) => {
                      setDate(value);
                      setForm(prev => ({
                        ...prev,
                        date: value ? value.format("YYYY/MM/DD") : ""
                      }));
                    }}
                   calendar = {calenderConfig[dateType]?.calendar || persian}
                   locale={calenderConfig[dateType]?.locale }
                   inputClass="w-full"  placeholder="date"  required />
                </div>
                 <div className="flex mx-auto justify-center items-center  mt-5">

                <button className="ml-5" onClick={()=>{setShowModal(false), setForm(initialState), setEditTransaction(null)}}>❌</button>
                <button className="bg-teal-500 rounded border-none p-1 ">
                  {editTransaction ? "آپدیت" : "ذخیره"}</button>
                 </div>
                
             </form>
             </div>
             </AnimatedModal>
             </div>
                  {/* } */}

        {/* </div> */}
        </AnimatedPage>
    )
}