import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";
import { FadeLoader, HashLoader } from "react-spinners";
import { IconButton } from "@mui/material";
import { TbMenu2 } from "react-icons/tb";
import payment from "../../images/payment2.png";

const PrivacyPolicy = () => {
  let screenwidth = window.innerWidth;
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-black">
        <div className="w-[100%] h-[100vh] flex  ">
          {screenwidth > 430 && <Sidebar />}
       
            <div className="sm:w-[80%] w-[100%] h-[100vh] overflow-y-scroll sm:pb-3 ml-[2px]  sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px] ">
              <div className="w-[100%] flex justify-between items-center h-[80px] sm:p-0 p-3 sm:mt-6 border-b-[1px] border-[#535353] ">
                <span className="flex justify-center items-center">
                  {screenwidth < 430 && (
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={toggleDrawer(true)}
                      edge="start"
                    >
                      <TbMenu2 className="text-white text-[35px]" />
                    </IconButton>
                  )}
                  <MobileSidebar
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                  />

                  <h1 className="text-[white] sm:text-[25px] text-[20px] font-bold ml-3 sm:ml-10 sm:mb-6 flex items-center">
                    {/* Image visible only on larger screens */}
                    {/* <img
                      className="hidden sm:block w-[40px] mr-3"
                      src={payment}
                      alt="payment"
                    /> */}
                    Privacy Policy
                  </h1>
                </span>
              </div>

              <div
               
                className="mt-6 mb-1 bg-[#2B2B2B] rounded-[8px] py-[25px] px-[20px] mx-[30px] text-white" // Add bottom margin here
              >
                <p>kkk</p>
              </div>
            </div>
        
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
