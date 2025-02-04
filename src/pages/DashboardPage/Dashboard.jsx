import React, { useEffect, useState } from "react";
import adminicon from '../../images/auth/adminicon.png'
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";
import more from "../../images/more2.png";
import { LineChart } from "@mui/x-charts/LineChart";

import { IconButton } from "@mui/material";
import create from "../../images/create.png";
import { IoIosInformationCircleOutline } from "react-icons/io";
import InfoModal from "../../components/InfoModal/InfoModal";
import Alert from "../../components/Alert/Alert";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Dashboard() {
  const [btnloader, setBTnloader] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");

  let navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("daily"); // Default option

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update selected value
  };
  const countries = [
    { name: "Pakistan", users: 16037, percentage: 80, flag: "🇵🇰" },
    { name: "India", users: 1273, percentage: 56, flag: "🇮🇳" },
    { name: "Bangladesh", users: 789, percentage: 24, flag: "🇧🇩" },
    { name: "Sri Lanka", users: 56, percentage: 8, flag: "🇱🇰" },
    { name: "Saudi Arabia", users: 1146, percentage: 41, flag: "🇸🇦" },
  ];

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const { id } = useParams();


  let screenwidth = window.innerWidth;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([dayjs("2023-11-23"), dayjs("2024-01-25")]);
  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-black">
        <div className="w-[100%] h-[100vh] flex">
          {screenwidth > 430 && <Sidebar />}
          <div className="sm:w-[80%] w-[100%] h-[100vh] overflow-y-scroll  pb-3 sm:ml-[2px] sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px]">
            <div className="w-[97%] flex justify-between items-center sm:h-max h-[80px] sm:p-0 p-3 sm:mt-6">
              <span className="flex justify-center items-center w-full sm:w-auto sm:flex-row">
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

                <h1 className="text-[white] sm:text-[25px] text-[20px] font-bold sm:ml-10 sm:mb-6 flex items-center  justify-center sm:justify-start w-full">
                  {/* Image visible only on larger screens */}
                  <img
                    className="hidden sm:block w-[40px] mr-3"
                    src={more}
                    alt="Icon"
                  />
                  {"Dashboard Analytics"}
                </h1>
              </span>
              <div className="flex items-center space-x-4">
      {/* Date Button */}
      <div
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-white mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7v.01M12 7v.01M16 7v.01M3.5 9.5h17m-17 5h17m-17 5h17M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
          />
        </svg>
        <span className="text-white">{`${value[0].format("DD MMM")} - ${value[1].format("DD MMM")}`}</span>
      </div>

      {/* Admin Button */}
      <div className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg">
         <img src={adminicon} width='25px'/>
        <span className="pl-2">Admin</span>
      </div>

      {/* Material-UI Date Picker */}
      {open && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            open={open}
            onClose={() => setOpen(false)}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            renderInput={() => null} // Removes default input
          />
        </LocalizationProvider>
      )}
    </div>
            </div>

            {responseMessage && (
              <p className="text-white mt-3 w-[90%] ml-10">{responseMessage}</p>
            )}
            <div className="w-[100%] flex items-center justify-center flex-col">
              <div className="w-[95%] sm:w-[95%] flex items-center justify-center flex-col p-[12px] sm:p-[25px] mt-[10px] rounded-[15px]">
              <div className="w-full bg-[#64646469] flex items-center  rounded-lg overflow-hidden  mb-4">
  <span className="px-3 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M16.65 10.5a6.15 6.15 0 11-12.3 0 6.15 6.15 0 0112.3 0z"
      />
    </svg>
  </span>
  <input
    type="text"
    placeholder="Search"
    className="w-full py-2 text-white focus:outline-none"
  />
</div>

                <div className="flex justify-around w-[95%] sm:w-[100%] flex-wrap gap-4">
                  <div className="w-[200px] p-4 bg-white text-center border rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total user</p>
                        <h5 className="text-xl font-semibold text-gray-800">
                          20000
                        </h5>
                      </div>
                      <div>
                        <img
                          src={more}
                          alt="More"
                          className="w-12 h-12 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Last 30 days users</p>
                  </div>

                  <div className="w-[200px] p-4 bg-white text-center border rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total user</p>
                        <h5 className="text-xl font-semibold text-gray-800">
                          15000
                        </h5>
                      </div>
                      <div>
                        <img
                          src={more}
                          alt="More"
                          className="w-12 h-12 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Last 30 days users</p>
                  </div>

                  <div className="w-[200px] p-4 bg-white text-center border rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total user</p>
                        <h5 className="text-xl font-semibold text-gray-800">
                          12000
                        </h5>
                      </div>
                      <div>
                        <img
                          src={more}
                          alt="More"
                          className="w-12 h-12 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Last 30 days users</p>
                  </div>

                  <div className="w-[200px] p-4 bg-white text-center border rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total user</p>
                        <h5 className="text-xl font-semibold text-gray-800">
                          18000
                        </h5>
                      </div>
                      <div>
                        <img
                          src={more}
                          alt="More"
                          className="w-12 h-12 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Last 30 days users</p>
                  </div>

                  <div className="w-[200px] p-4 bg-white text-center border rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total user</p>
                        <h5 className="text-xl font-semibold text-gray-800">
                          22000
                        </h5>
                      </div>
                      <div>
                        <img
                          src={more}
                          alt="More"
                          className="w-12 h-12 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Last 30 days users</p>
                  </div>
                </div>
                <div className="flex justify-between w-[95%] sm:w-[100%] flex-wrap gap-4">
                <div className="bg-white rounded-lg mt-4">
                  <div className="flex justify-between items-center w-full bg-white p-4 rounded-lg">
                    <p className="text-md font-semibold text-gray-700">
                      Total Users Statistic
                    </p>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="timeframe-select"
                        className="text-gray-600 font-medium"
                      ></label>
                      <select
                        id="timeframe-select"
                        value={selectedOption}
                        onChange={handleChange}
                        className="p-2 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    width={690}
                    height={300}
                  />
                </div>
                <div className="bg-white rounded-lg mt-4">
                <div className="bg-white rounded-lg shadow-md p-6 w-[400px]">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sessions by Country</h3>
      {countries.map((country, index) => (
        <div key={index} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{country.flag}</span>
            <div>
              <p className="font-medium text-gray-800">{country.name}</p>
              <p className="text-sm text-gray-500">{country.users} Users</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-1/2">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-yellow-500 rounded-full"
                style={{ width: `${country.percentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">{country.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
                </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
