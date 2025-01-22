import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import gruplaw from "../assets/png-transparent-corporate-lawyer-personal-injury-lawyer-law-firm-lawyer-service-people-team-removebg-preview.png";

const Home = () => {
  return (
    <div className="mx-auto w-10/12 mt-6">
      <Box className="bg-[#1976d2] rounded-xl shadow-lg relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-14 py-10 max-h-[600px] h-auto w-full">
        
        <div className="mt-8 md:mt-0 text-center md:text-left">
          <h1 className="text-white leading-tight font-semibold text-4xl md:text-5xl lg:text-6xl mb-4">
            Book Appointment <br /> with Trusted Lawyers
          </h1>
          <Link to="/lawyers">
            <button className="p-3 px-8 bg-gray-200 text-base rounded-full hover:bg-gray-300 transition">
              See All Lawyers
            </button>
          </Link>
        </div>

       
        <img
          className="w-[80%] md:w-[58%] max-w-sm md:max-w-full"
          src={gruplaw}
          alt="Group of lawyers"
        />
      </Box>
    </div>
  );
};

export default Home;

