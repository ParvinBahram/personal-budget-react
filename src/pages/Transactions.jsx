
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import arabic from "react-date-object/calendars/arabic" ;
import arabic_ar from "react-date-object/locales/arabic_ar";
import AnimatedPage from "../../animations/AnimatedPage";
import AnimatedModal from "../../animations/AnimatedModal";
import { handleSort } from "../components/Sort";
import { ThemeContext } from "../context/themeContext";
import { TransactionContext } from "../context/transactionContext";
import { DateContext } from "../context/dateContext";

const initialState = {type:"", category:"", amount:"", date: ""};
const SORT_TYPE = "sort_type"

export default function Transactions(){
  const {dateType} = useContext(DateContext);
    const{transactions, setTransactions, TRANSACTION_KEY} = useContext(TransactionContext);

    const [form, setForm] = useState(initialState);
    const [showModal, setShowModal] = useState(false);
    const [editTransaction, setEditTransaction] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [date, setDate]=useState(null);
    const {checked} = useContext(ThemeContext);
    const [filteredTrns, setFilteredTrns]= useState(transactions);
    
useEffect(() => {
  setFilteredTrns(transactions);
}, [transactions]);

    const [sortType, setSortType]= useState(()=>{
      return localStorage.getItem(SORT_TYPE)
    })
    useEffect(()=>{
      localStorage.setItem(SORT_TYPE, sortType)
    },[sortType])


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
    localStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions))
  },[transactions])

     const addTransaction = (form)=>{
    const newTransaction= {id: Date.now(), ...form};
        setTransactions([...transactions, newTransaction]);
  }

   const handleEdit =(transaction)=>{
      setEditTransaction(transaction);
  }

  const handleDelete = (id)=> {
    const newTrans = transactions.filter((t) => t.id !== id)
    setTransactions(newTrans);
  }


     const updateTransaction = (id,updateFields)=>{
    setTransactions(prev=>
      prev.map((transaction) => transaction.id === id? {...transaction, ...updateFields}: transaction )
    )
  }

    const handleChange = (e)=>{
      const name = e.target.name;
      const value= e.target.value ;
    
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


    const absAmount = (type, amount)=>{
      const value = Math.abs(Number(amount));
      return type==="expense" ? -value : value;
    }

    const handleSubmit= (e)=>{
       const absForm = {
        ...form,
        amount: absAmount(form.type, form.amount),
  };

        e.preventDefault();
        if(editTransaction){
            updateTransaction(editTransaction.id, absForm)
        }else{
            addTransaction(absForm) ;
        }
        setForm(initialState);
        setShowModal(false);
    }

     const totalAmount = transactions.reduce(
  (sum, t) => sum + t.amount,
  0
);

    const visibleTr= showAll ? filteredTrns : filteredTrns.slice(-5);
    return(
      <AnimatedPage >
        <div dir="rtl" className={` ${checked ? "bg-gray-900 text-white" : " bg-amber-100/50"} py-5 px-6 min-h-screen`}>
          <div className="flex flex-col sm:flex-row  sm:justify-center gap-10 items-center mt-5 mb-10 p-1">
            <p>  جمع کل :  <span className={totalAmount < 0 ? "text-red-600" : "text-green-600"}>{totalAmount}</span></p>
            <div className="">
             <button  className="cursor-pointer  rounded px-1" 
             onClick={()=>{setShowModal(true), setForm(initialState), setEditTransaction(null)}}> تراکنش جدید  <i className="fa fa-plus pt-1 text-teal-500"></i>
             </button> 
             </div>
             <div className="">
              <label htmlFor="">مرتب سازی </label>
               <select name="" id="" className=" rounded outline outline-teal-400 mr-1" onChange={(e) =>{
                  const sorted = handleSort(e.target.value, transactions);
                  setFilteredTrns(sorted) }}>
                <option value="newest" className="">جدیدترین</option>
                <option value="oldest" className="">قدیمی ترین</option>
                <option value="expense" className="">هزینه</option>
                <option value="earnings" className="">درآمد</option>
               </select>
             </div>
          </div>

          {/* نمایش تراکنشها */}
            <div className=" grid flex-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-x-3 gap-y-7 mx-auto ">
             {visibleTr.map((t,i)=>
            < div key={t.id} className={`flex flex-col space-y-2 items-start  w-55 p-3 mx-auto  border-0 rounded-lg bg-white shadow-lg
               ${checked ? "bg-white text-gray-900" : ""}`}
>
             <p className={t.type === "expense" ? "text-red-600" : "text-green-600"} >{t.type  === "expense" ?  "  ⬆ هزینه" : "درآمد ⬇"}</p>
            <p className="">دسته بندی = {t.category}</p>
            < p> مقدار =  <span className={t.type === "expense" ? "text-red-600" : "text-green-600"}>{t.amount}</span></p>
            <p className=""> تاریخ =  {t.date}</p>

             <div className="flex justify-between mx-auto gap-6">
            <button className="text-teal-500  mt-2" onClick={()=> handleEdit(t)}>ویرایش</button>
            <button className="text-teal-500  mt-2 " onClick={()=> handleDelete(t.id)}>حذف</button>
             </div>
              </div>
              )}
              </div> 

              <div className="flex flex-row justify-center gap-x-5 mt-12">
              {transactions.length > 5 && 
              <div className=" text-center w-auto ">
              <button className=" rounded  otline-0 p-1 text-teal-600 " 
                onClick={()=> setShowAll(open => !open)}>{ showAll ? "نمایش کمتر" : "نمایش همه" }</button>
                </div> 
            }
             <div className={`${transactions.length === 0 ? "hidden": "w-auto " } `}>
            <button className=" rounded  otline-0 p-1 text-teal-600 "
              onClick={()=>setTransactions([])} > حذف همه </button>
             </div>
             </div>


             {/* showModal  */}
              {/* فرم اضافه کردن تراکنش */}
              <AnimatedModal isOpen={showModal} onClose= {(()=>{
                setShowModal(false);
                setForm(initialState);
                setEditTransaction(null)
      })}>
             <div className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[100] 
               before:fixed before:inset-0 before:w-full before:h-full before:bg-gray-300/70 overflow-auto ${checked?"text-black" : ""} `}>
               <button  className="p-1 z-[102] fixed top-6 left-6  cursor-pinter" onClick={()=>{setShowModal(false), setForm(initialState), setEditTransaction(null)}}>❌</button>
                <form action="" className="  mt-10 mx-auto bg-white z-[102] p-4 rounded-xl shadow-xl" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4 ">
                  <select className="text-sm border border-gray-400 p-1" name="type" value={form.type} id="" onChange={handleChange}>
                <option value="" disabled >نوع تراکنش</option>
                <option className="text-red-600" value="expense">هزینه</option>
                <option  className="text-green-600" value="earnings">درآمد</option>
              </select>
                <input type="text" name="category" value ={form.category} className="p-1" placeholder="category" onChange={handleChange} required/>
                <input type="number" name="amount" value ={form.amount} className="p-1" placeholder="amount" onChange={handleChange} required/>
                  <DatePicker value={date} onChange={(value) => {
                      setDate(value);
                      setForm(prev => ({
                        ...prev,
                        date: value ? value.format("YYYY/MM/DD") : ""
                      }));
                    }}
                   calendar = {calenderConfig[dateType]?.calendar || persian}
                   locale={calenderConfig[dateType]?.locale }
                   inputClass="w-full p-1"  placeholder="date"  required />
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
             
        </AnimatedPage>
    )
}