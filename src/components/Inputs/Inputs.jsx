import React from "react";

const Inputs = ({ type, value, icon, placeholder, onchange }) => {
  return (
    <div className="relative">
      <img
        src={icon}
        className="absolute ml-2 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-[25px] h-[25px]"
      />
      <input
        className="text-gray-500 border-2 m-1.5 border-gray-300 bg-white/60 rounded-2xl shadow-lg shadow-black/10 w-90 h-8 focus:outline-1 pl-12 pr-2"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
    </div>
  );
};

export default Inputs;
