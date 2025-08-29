import { Phone } from "lucide-react";
import React from "react";

const ButtonMengkilap = ({ text, icon, className, bg, textColor, ring }) => {
  return (
    <button
      href="#"
      className={`flex overflow-hidden items-center text-sm font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-${bg} text-${textColor} shadow h-fit px-4 py-2 whitespace-pre md:flex group relative justify-center gap-2 transition-all duration-300 ease-out  ${className}`}
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-40 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
      <div className="flex items-center">
        {icon}
        <span className="ml-1 ">{text}</span>
      </div>
    </button>
  );
};

export default ButtonMengkilap;
