import { Pie,PieChart, Cell, BarChart,Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import AnimatedPage from "../../animations/AnimatedPage";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import arabic from "react-date-object/calendars/arabic" ;
import arabic_ar from "react-date-object/locales/arabic_ar";

const CHART_TYPE = "chart_type" ;

export default function Chart({STORAGE_KEY, dateType, transactions}){
    const storedTrs= JSON.parse(localStorage.getItem(STORAGE_KEY));
    const [totalAmount, setTotalAmount] = useState(0);
    const [fromDate, setFromDate]= useState("");
    const [toDate, setToDate]= useState("");
    const [chartType, setChartType] = useState(()=>{
        return localStorage.getItem(CHART_TYPE);
    }) ;

    useEffect(()=>{
        localStorage.setItem(CHART_TYPE, chartType)
    },[chartType])


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
    
    //   فیلتر تراکنشها بر اساس تاریخ
    const filteredTrs= transactions.filter( t => {
        const dt= new Date(t.date);
        if(fromDate && dt < new Date(fromDate))
            return false;
        if(toDate && dt> new Date(toDate))
            return false;

        return true;
    });

    // ساخت داده نمودار
    const chartData= filteredTrs.map(ft =>({
        name: ft.date, value:ft.amount
    }))




  //   useEffect(()=>{
  //       const sum = storedTrs.reduce((acc, storedTrs) => acc + Number(storedTrs.amount), 0 );
  //       (setTotalAmount(sum));
  //   },[totalAmount])

  //    useEffect(() => {
  //   console.log("Chart type changed:", chartType);
  // }, [chartType]);
    
  
    return(
        <AnimatedPage>
        <div className="py-5 px-20 min-h-screen">
          <h2 className="text-center my-8">نمودارها</h2>
          <div className=" flex flex-col sm:flex-row justify-center items-center mx-auto gap-4 mb-10 md:gap-8 ">
            <div className="">
            <label htmlFor=""  className="mr-2"> از تاریخ</label>
               <DatePicker value={fromDate} onChange={(value) => {
                  setFromDate(value);
                       }}
                    calendar = {calenderConfig[dateType]?.calendar || persian}
                    locale={calenderConfig[dateType]?.locale }
                    inputClass="w-full"  placeholder="date"  required />
                    </div>

                    <div className="">
                    <label htmlFor="" className="mr-2"> تا تاریخ</label>
                 <DatePicker value={toDate} onChange={(value) => {
                  setToDate(value);
                       }}
                    calendar = {calenderConfig[dateType]?.calendar || persian}
                    locale={calenderConfig[dateType]?.locale }
                    inputClass="w-full"  placeholder="date"  required />
                    </div>

                    <div className="">
                <label htmlFor=""> نوع نمودار  </label>
                 <select name="" id="" className="p-0.5 rounded border border-teal-600 outline-0 ml-5" onChange={(e)=> setChartType(e.target.value)}>
                    <option value="pie">دایره ای</option>
                    <option value="bar"> میله ای</option>
                 </select>
            </div>
          </div>
          {chartType === "bar" && (
            <BarChart width={500} height={300} 
                data={chartData} >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#11b0ccff" />
                </BarChart>
          )}

           {chartType === "pie" && (
            <PieChart width={300} height={300} >
                <Pie 
                data={chartData} 
                dataKey="value"
                nameKey="name"
                outerRadius = {100}
                 />
                    <Tooltip />
                </PieChart>
          )}
        </div>
        </AnimatedPage>
        
    )
}


