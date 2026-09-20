import React from "react";
import NavBarItems from "./NavBarItems";
import profileIcon from "../../images/profile.png";

const Navbar = ({ onLogout }) => {
  return (
    <div className="col-span-2 row-span-1 grid grid-cols-2  items-center h-[70px] p-2  ml-4  bg-white/50 rounded-2xl  shadow-lg shadow-black/30">
      <div className="text-base font-bold text-gray-600 justify-self-start">
        Dashboard
      </div>
      <div className="justify-self-end flex items-center gap-4">
        <NavBarItems />
        <div className="flex items-center gap-2 text-gray-700">
          <img className="w-[25px] h-[25px]" src={profileIcon} />
          <span className="text-sm font-medium">admin</span>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
