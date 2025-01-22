import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full bg-white shadow-md">
      <div className="mx-auto p-5 py-3 flex justify-between items-center w-10/12">
        
        <NavLink to="/">
          <h1 className="font-bold text-3xl text-[#1976d2]">Lawyerhire</h1>
        </NavLink>

       
        <ul className="hidden md:flex gap-8 text-lg text-gray-500">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-[#1976d2] font-bold hover:underline"
                : "hover:underline hover:text-[#1976d2]"
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/lawyers"
            className={({ isActive }) =>
              isActive
                ? "text-[#1976d2] font-bold hover:underline"
                : "hover:underline hover:text-[#1976d2]"
            }
          >
            <li>Lawyers</li>
          </NavLink>
        </ul>

        
        <Avatar
          alt="User"
          src="/static/images/avatar/1.jpg"
          className="hidden md:block"
        />

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600">
            {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </button>
        </div>
      </div>

    
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 absolute z-10 w-full">
          <ul className="flex flex-col gap-4 text-lg text-gray-700">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)} 
              className={({ isActive }) =>
                isActive
                  ? "text-[#1976d2] font-bold hover:underline"
                  : "hover:underline hover:text-[#1976d2]"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/lawyers"
              onClick={() => setMenuOpen(false)} 
              className={({ isActive }) =>
                isActive
                  ? "text-[#1976d2] font-bold hover:underline"
                  : "hover:underline hover:text-[#1976d2]"
              }
            >
              <li>Lawyers</li>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
