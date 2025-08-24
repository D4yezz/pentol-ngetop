import { Phone } from "lucide-react";
import React from "react";

const BtnGeserAtas = ({
  text,
  textPopup,
  styleText,
  stylePopup,
  iconAtas,
  iconBawah,
}) => {
  return (
    <button
      className={`relative w-44 h-fit px-4 py-2 cursor-pointer rounded-full transition-colors duration-300 group ${styleText}`}
    >
      <div
        className="relative w-full h-full overflow-hidden flex justify-center items-center gap-2"
        data-tooltip={textPopup}
      >
        <div className="relative py-1 inset-0 flex items-center justify-center gap-2 transition-all duration-500 group-hover:-translate-y-full text-sm">
          {iconAtas}
          {text}
        </div>
        <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-all duration-500 group-hover:translate-y-0">
          {iconBawah}
        </span>
      </div>
      <div
        className={`absolute w-3/4 h-fit flex items-center justify-center left-1/2 -translate-x-1/2 -bottom-18 opacity-0 invisible transition-all duration-500 group-hover:opacity-100 group-hover:visible group-hover:-bottom-12 ${stylePopup}`}
      >
        {textPopup}
      </div>
      <div className="absolute rotate-180 left-1/2 -translate-x-1/2 -bottom-[33px] border-[10px] border-transparent border-t-yellow-300 opacity-0 invisible transition-all duration-500 group-hover:opacity-100 group-hover:visible group-hover:-bottom-3"></div>
    </button>
  );
};

export default BtnGeserAtas;
