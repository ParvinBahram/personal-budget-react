import React from "react";

export default function Spinner() {
  return (
   
      <div className="flex flex-wrap gap-8  mx-auto justify-center mt-20 items-center">


      <div className="spinner border-[30px] border-solid border-t-[#0D9488] border-r-[#0D9488] border-b-black border-l-black rounded-full relative animate-spin">
        <div className="absolute w-3 h-3 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[125%]"></div>
      </div>
        <p className="text-teal-600 text-xl"> Loading ...</p>


    </div>
  );
}
