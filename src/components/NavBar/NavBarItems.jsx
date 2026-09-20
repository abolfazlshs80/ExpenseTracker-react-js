import React from "react";
import profileIcon from "../../images/profile.png";
import settingInIcon from "../../images/setting.png";
import bellInIcon from "../../images/bell.png";
import searchInIcon from "../../images/search.png";
import Inputs from "../Inputs/Inputs";

const NavBarItems = () => {
  return (
    <div className="flex flex-row gap-2.5">
      <Inputs type={"text"} placeholder={"search..."} icon={searchInIcon} />

      <a className="flex flex-row items-center" href="#">
        <img className="w-[25px] h-[25px]" src={profileIcon} />
        <p className="text-gray-700 text-sm">Sign In</p>
      </a>

      <a href="#">
        <img className="w-[25px] h-[25px] mt-2" src={settingInIcon} />
      </a>

      <a href="#">
        <img className="w-[25px] h-[25px] mt-2" src={bellInIcon} />
      </a>
    </div>
  );
};

export default NavBarItems;
