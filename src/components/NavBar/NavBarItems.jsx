import React from "react";
import searchInIcon from "../../images/search.png";
import Inputs from "../Inputs/Inputs";

const NavBarItems = () => {
  return (
    <div className="flex flex-row gap-2.5">
      <Inputs type={"text"} placeholder={"search..."} icon={searchInIcon} />
    </div>
  );
};

export default NavBarItems;
