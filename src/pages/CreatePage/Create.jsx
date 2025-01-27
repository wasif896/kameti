import React, { useEffect, useState } from "react";
import profile from "../../images/profile 1.png";
import money from "../../images/money (1) 1.png";
import total from "../../images/money 1.png";
import calender from "../../images/appointment 1.png";
import custumer from "../../images/customer 1.png";
import date from "../../images/start-date 1.png";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineRestartAlt } from "react-icons/md";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import WithdrawDates from "../../components/WithdrawDates/WithdrawDates";
import { TbMenu2 } from "react-icons/tb";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";
import { IconButton } from "@mui/material";
import create from "../../images/create.png";
import { IoIosInformationCircleOutline } from "react-icons/io";
import InfoModal from "../../components/InfoModal/InfoModal";
import Alert from "../../components/Alert/Alert";

export default function Create() {
  const [btnloader, setBTnloader] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const [kametiHolderName, setKametiHolderName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [pricePerKameti, setPricePerKameti] = useState("");
  const [pricePerDayKameti, setPricePerDayKameti] = useState("");
  const [totalMonths, setTotalMonths] = useState("");
  const [myTotalKameties, setMyTotalKameties] = useState("");
  const [payablePerMonth, setPayablePerMonth] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [kametiType, setKametiType] = useState("monthly");
  const [withdrawDates, setWithdrawDates] = useState([]);
  const [showWithdrawDates, setShowWithdrawDates] = useState(false);

  let navigate = useNavigate();

  const handleReset = () => {
    // Reset form fields
    setKametiHolderName("");
    setTotalPrice("");
    setPricePerKameti("");
    setPricePerDayKameti("");
    setTotalMonths("");
    setMyTotalKameties("");
    setPayablePerMonth("");
    setStartingDate("");
    setEndingDate("");

    // Set the confirmation message
    setConfirmMessage("Form reset successfully!");
    setShowConfirmAlert(true);
  };

  const handleAlertConfirm = () => {
    // Close the confirmation alert after user confirms
    setShowConfirmAlert(false);
  };
  const handleAlertCancel = () => {
    setShowConfirmAlert(false); // Hide the confirm alert
  };

  const fillValues = (data) => {
    console.log(data);
    setKametiHolderName(data.kametiName);
    setTotalPrice(data.totalPrice / data.myTotalKametis);
    setPricePerKameti(data.pricePerMonthKameti);
    setPricePerDayKameti(data.pricePerDayKameti);
    setTotalMonths(data.totalMonths);
    setMyTotalKameties(data.myTotalKametis);
    setStartingDate(formatDate(data.startingMonth));
    setEndingDate(formatDate(data.endingMonth));
    setKametiType(data.kametiType);
    setWithdrawDates(data.withdraw);
  };

  // const formatDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${day}/${month}/${year}`; // Format as DD/MM/YY
  // };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  };
  

  const dateToTimestamp = (date) => {
    const timestamp = new Date(date).getTime();
    return timestamp;
  };

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    // Calculate ending date when starting date or total months change
    if (startingDate && totalMonths) {
      const startDate = new Date(startingDate);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + parseInt(totalMonths));
      setEndingDate(endDate.toISOString().split("T")[0]);
    }
  }, [startingDate, totalMonths]);

  useEffect(() => {
    // Calculate total price when price per kameti or total months changes
    if (totalPrice && totalMonths) {
      setPricePerKameti(totalPrice / totalMonths);
      setPricePerDayKameti(totalPrice / totalMonths / 30);
    } else {
      setPricePerKameti("");
      setPricePerDayKameti("");
    }
  }, [totalPrice, totalMonths]);

  const handleCreateCommittee = async () => {
    const toastId = "createCommitteeToast"; // Unique ID for this toast
    setBTnloader(true);

    // Validation for required fields
    if (!kametiHolderName) {
      if (!toast.isActive(toastId)) {
        toast.error("Kameti holder name is required.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!pricePerKameti || isNaN(pricePerKameti)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total Month kameti is required.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!totalMonths || isNaN(totalMonths)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total months is required and must be valid.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!totalPrice || isNaN(totalPrice)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total price is required and must be valid.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!myTotalKameties || isNaN(myTotalKameties)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total kameties is required and must be valid.", {
          toastId,
        });
      }
      setBTnloader(false);
      return;
    }

    if (!startingDate) {
      if (!toast.isActive(toastId)) {
        toast.error("Starting date is required.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    if (!endingDate) {
      if (!toast.isActive(toastId)) {
        toast.error("Ending month is required.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    // Additional validation
    if (parseInt(myTotalKameties) > parseInt(totalMonths)) {
      if (!toast.isActive(toastId)) {
        toast.error("Total kameties cannot exceed total months.", { toastId });
      }
      setBTnloader(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiBaseUrl}committee`,
        {
          kametiName: kametiHolderName,
          pricePerMonthKameti: pricePerKameti,
          pricePerDayKameti: pricePerDayKameti,
          totalPrice: totalPrice,
          myTotalKametis: myTotalKameties,
          totalMonths: totalMonths,
          startingMonth: dateToTimestamp(startingDate),
          endingMonth: dateToTimestamp(endingDate),
          kametiType: kametiType,
          myKametiWithdrawDate: withdrawDates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!toast.isActive(toastId)) {
        toast.success(response?.data?.message, { toastId });
      }

      handleReset();
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error(error?.response?.data?.message, { toastId });
      }
    } finally {
      setBTnloader(false);
    }
  };

  const handleUpdateCommittee = async () => {
    const toastId = "updateCommitteeToast"; // Unique ID for this toast

    try {
      const response = await axios.post(
        `${apiBaseUrl}committee/update`,
        {
          id: id,
          kametiName: kametiHolderName,
          pricePerMonthKameti: pricePerKameti,
          pricePerDayKameti: pricePerDayKameti,
          totalPrice: totalPrice,
          myTotalKametis: myTotalKameties,
          totalMonths: totalMonths,
          startingMonth: dateToTimestamp(startingDate),
          endingMonth: dateToTimestamp(endingDate),
          kametiType: kametiType,
          myKametiWithdrawDate: withdrawDates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!toast.isActive(toastId)) {
        toast.success(response?.data?.message, { toastId });
      }

      setTimeout(() => {
        navigate("/history");
      }, 2000);
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error(error?.response?.data?.message, { toastId });
      }
    }
  };

  const handleSaveWithdrawDates = (dates) => {
    console.log(dates);
    setWithdrawDates(dates);
    setShowWithdrawDates(false);
  };
  const getSingleCommittee = async () => {
    try {
      if (id) {
        const response = await axios.get(
          `${apiBaseUrl}singleComm/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fillValues(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching committee:", error);
    }
  };

  const openWithdrawDatesModal = () => {
    const toastId = "withdrawDatesToast"; // Unique ID for this toast

    if (myTotalKameties) {
      setShowWithdrawDates(true);
    } else {
      if (!toast.isActive(toastId)) {
        toast.error("Select total kameties first.", { toastId });
      }
    }
  };
  useEffect(() => {
    getSingleCommittee();
  }, [id]);
  const handleKametiTypeChange = (event) => {
    setKametiType(event.target.value);
  };
  const handlePricePerMonth = (event) => {
    var perMonthPrice = event.target.value;
    var totalMonthEntered = totalMonths != "" ? totalMonths : 0;
    setPricePerKameti(perMonthPrice / totalMonthEntered);
  };

  let screenwidth = window.innerWidth;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  let [shareTotalAmount, setTotalAmountShare] = useState(false);
  let [shareMyKameti, setKametiShare] = useState(false);
  let [shareTotalMonth, setTotalMonthShare] = useState(false);
  let [shareMonthlyAmmount, setMonthlyAmmountShare] = useState(false);
  let [info, setInfo] = useState(false);
  let [shareinfo, setShare] = useState(false);

  let handleinfoTotalAmmount = () => {
    setTotalAmountShare(true);
  };
  let handleinfoMyKametie = () => {
    setKametiShare(true);
  };
  let handleinfoTotalMonth = () => {
    setTotalMonthShare(true);
  };
  let handleinfoMonthlyAmmount = () => {
    setMonthlyAmmountShare(true);
  };

  let handleCloseshare = () => {
    setInfo(false);
    setShare(false);
    setTotalAmountShare(false);
    setKametiShare(false);
    setTotalMonthShare(false);
    setMonthlyAmmountShare(false);
  };

  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-black">
        <div className="w-[100%] h-[100vh] flex">
          {screenwidth > 430 && <Sidebar />}
          <div className="sm:w-[80%] w-[100%] h-[100vh] overflow-y-scroll  pb-3 sm:ml-[2px] sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px]">
          <div className="w-[100%] flex justify-between items-center sm:h-max h-[80px] sm:p-0 p-3 sm:mt-6 border-b-[1px] border-[#535353]">
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

    <h1 className="text-[white] sm:text-[25px] text-[20px] font-bold sm:ml-10 sm:mb-6 flex items-center sm:ml-5 justify-center sm:justify-start w-full">
      {/* Image visible only on larger screens */}
      <img
        className="hidden sm:block w-[40px] mr-3"
        src={create}
        alt="Icon"
      />
      {id ? "Update Kameti" : "Create Kameti"}
    </h1>
  </span>
</div>

            {responseMessage && (
              <p className="text-white mt-3 w-[90%] ml-10">{responseMessage}</p>
            )}
            <div className="w-[100%] flex items-center justify-center flex-col">
              <div className="w-[88%] flex justify-end">
                <p
                  onClick={handleReset}
                  className="text-white sm:mt-6 text-md cursor-pointer hover:text-gray-300"
                >
                  Reset
                </p>
              </div>

              <div className="w-[95%] sm:w-[90%] bg-[#64646469] flex items-center justify-center flex-col p-[12px] sm:p-[25px] mt-[10px] rounded-[15px]">
                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
                  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]">Kameti Holder Name</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center">
                      <div className="w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                        {/* <img className="h-[25px]" src={profile} /> */}
                        <input
                          type="text"
                          placeholder="Abdullah"
                          value={kametiHolderName}
                          onChange={(e) => setKametiHolderName(e.target.value)}
                          className="outline-none border-none text-[white] placeholder-[#CACACA] bg-colorinput w-[100%] h-[40px] pl-1"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:w-[90%]  w-[100%] sm:ml-10 flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]"> Total Amount </label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center px-4 relative">
                      <div className="w-[80%] flex items-center">
                        <input
                          type="text"
                          placeholder="e.g 24000"
                          value={totalPrice}
                          onChange={(e) => setTotalPrice(e.target.value)}
                          required
                          className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10"
                        />
                      </div>
                      <IoIosInformationCircleOutline
                        className="text-[white] text-[25px] absolute right-4"
                        onClick={handleinfoTotalAmmount}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
                  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
                    <div className="w-[100%] mt-2 mb-2">
                      <label className="text-[white]">Select</label>
                    </div>
                    <div className="flex items-center justify-between w-[90%] space-x-5">
                      {/* Daily Option */}
                      <div
                        className={`flex items-center  w-[50%] h-[50px] rounded-[10px] cursor-pointer mb-5 pl-5 ${
                          kametiType === "daily"
                            ? "bg-[#A87F0B6E] "
                            : "bg-[#FFFFFF0D] "
                        } ${id ? "opacity-50 cursor-not-allowed" : ""}`} // Add visual feedback for disabled state
                        onClick={() =>
                          !id &&
                          setKametiType((prevType) =>
                            prevType === "daily" ? "" : "daily"
                          )
                        } // Prevent click when ID is available
                      >
                        <input
                          type="checkbox"
                          value="daily"
                          checked={kametiType === "daily"}
                          disabled={!!id} // Disable input if ID is available
                          onChange={(e) =>
                            setKametiType(e.target.checked ? "daily" : "")
                          }
                          className="hidden"
                        />
                        <label
                          className={`flex items-center text-white ${
                            kametiType === "daily"
                              ? "font-normal"
                              : "font-normal"
                          }`}
                        >
                          <span
                            className={`w-[16px] h-[16px] rounded border-[2px] mr-2 relative ${
                              kametiType === "daily"
                                ? "bg-[#A87F0B] border-[#A87F0B]"
                                : "border-[#6A6A6A]"
                            }`}
                          >
                            {/* Custom checkmark */}
                            {kametiType === "daily" && (
                              <span className="absolute inset-0 flex justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1 5L4 8L9 2"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            )}
                          </span>
                          Daily
                        </label>
                      </div>

                      {/* Monthly Option */}
                      <div
                        className={`flex items-center w-[50%] h-[50px] rounded-[10px] cursor-pointer mb-5 pl-5 ${
                          kametiType === "monthly"
                            ? "bg-[#A87F0B6E]"
                            : "bg-[#FFFFFF0D]"
                        } ${id ? "opacity-50 cursor-not-allowed" : ""}`} // Add visual feedback for disabled state
                        onClick={() =>
                          !id &&
                          setKametiType((prevType) =>
                            prevType === "monthly" ? "" : "monthly"
                          )
                        } // Prevent click when ID is available
                      >
                        <input
                          type="checkbox"
                          value="monthly"
                          checked={kametiType === "monthly"}
                          disabled={!!id} // Disable input if ID is available
                          onChange={(e) =>
                            setKametiType(e.target.checked ? "monthly" : "")
                          }
                          className="hidden"
                        />
                        <label
                          className={`flex items-center text-white ${
                            kametiType === "monthly"
                              ? "font-normal"
                              : "font-normal"
                          }`}
                        >
                          <span
                            className={`w-[16px] h-[16px] rounded border-[2px] mr-2 relative ${
                              kametiType === "monthly"
                                ? "bg-[#A87F0B] border-[#A87F0B]"
                                : "border-[#6A6A6A]"
                            }`}
                          >
                            {/* Custom checkmark */}
                            {kametiType === "monthly" && (
                              <span className="absolute inset-0 flex justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1 5L4 8L9 2"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            )}
                          </span>
                          Monthly
                        </label>
                      </div>
                    </div>
                  </div>

                  {screenwidth > 430 && (
                    <>
                      {kametiType === "daily" ? (
                        <div
                          className={`sm:w-[90%] w-[100%] sm:ml-10 flex items-center flex-col ${
                            kametiType === "daily" ? "opacity-1" : "opacity-0"
                          }`}
                        >
                          <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                            <label className="text-[white]">Daily Amount</label>
                          </div>

                          <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center">
                            <div className="w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                              <input
                                type="text"
                                placeholder="e.g 200"
                                value={pricePerDayKameti}
                                onChange={(e) =>
                                  setPricePerDayKameti(e.target.value)
                                }
                                className="outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] placeholder-[#CACACA]"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`sm:w-[90%] w-[100%] flex items-center flex-col ${
                            kametiType === "dsf" ? "opacity-1" : "opacity-0"
                          }  `}
                        >
                          <div className="w-[90%] mt-1 mb-2">
                            <label className="text-[white]">Daily Amount</label>
                          </div>
                          <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center">
                            <div className="w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                              <input
                                type="text"
                                placeholder="e.g 200"
                                value={pricePerDayKameti}
                                onChange={(e) =>
                                  setPricePerDayKameti(e.target.value)
                                }
                                className="outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-1 placeholder-[#CACACA]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {screenwidth < 431 && (
                    <>
                      {kametiType === "daily" && (
                        <div
                          className={`sm:w-[90%] w-[100%] flex items-center flex-col ${
                            kametiType === "daily" ? "opacity-1" : "opacity-0"
                          }  `}
                        >
                          <div className="w-[100%] mt-1 mb-2">
                            <label className="text-[white]">Daily Amount</label>
                          </div>
                          <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center">
                            <div className="w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                              <input
                                type="text"
                                placeholder="e.g 200"
                                value={pricePerDayKameti}
                                onChange={(e) =>
                                  setPricePerDayKameti(e.target.value)
                                }
                                className="outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-1 placeholder-[#CACACA]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
                  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]"> Total Months</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center px-4 relative">
                      <input
                        type="text"
                        placeholder="e.g 12"
                        value={totalMonths}
                        onChange={(e) => setTotalMonths(e.target.value)}
                        className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10"
                      />
                      <IoIosInformationCircleOutline
                        onClick={handleinfoTotalMonth}
                        // Replace with your desired icon, e.g., calendar
                        className="text-[white] text-[25px] absolute right-4"
                      />
                    </div>
                  </div>

                  <div className="sm:w-[90%] w-[100%] sm:ml-10 flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]">Monthly Amount</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center px-4 relative">
                      <input
                        type="text"
                        placeholder="e.g 24000"
                        value={pricePerKameti}
                        className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10"
                      />
                      {/* <IoIosInformationCircleOutline
    onClick={handleinfoMonthlyAmmount}
      className="text-[white] text-[25px] absolute right-4"
    /> */}
                    </div>
                  </div>
                </div>

                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
                  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-0 mb-2">
                      <label className="text-[white]">My Kameties</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center px-4 relative">
                      <input
                        type="text"
                        placeholder="e.g 1,2"
                        value={myTotalKameties}
                        onChange={(e) => setMyTotalKameties(e.target.value)}
                        className="outline-none border-none text-[white] bg-colorinput w-full h-[40px] placeholder-[#CACACA] pr-10"
                      />
                      <IoIosInformationCircleOutline
                        onClick={handleinfoMyKametie}
                        className="text-[white] text-[25px] absolute right-4"
                      />
                    </div>
                  </div>

                  <div className="sm:w-[90%] w-[100%] sm:ml-10 flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]"> Withdrawal Dates</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center">
                      <div className="w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                        {/* <img className="h-[25px]" src={date} /> */}
                        <button
                          className="text-[white] outline-none border-none text-left w-[100%] h-[50px] pl-2 "
                          onClick={openWithdrawDatesModal}
                        >
                          {withdrawDates.length === 0
                            ? "Set Withdraw Dates"
                            : withdrawDates
                                .filter(
                                  (date) => !isNaN(new Date(date).getTime())
                                )
                                .map((date) =>
                                  date == null
                                  ? "N/A" :
                                  new Date(date).toLocaleDateString()
                                )
                                .join(", ")}
                        </button>

                        {showWithdrawDates && (
                          <WithdrawDates
                            counts={myTotalKameties} // Example value, replace with actual data
                            dates={withdrawDates} // Initial empty dates array
                            isCreating={true}
                            onClose={() => setShowWithdrawDates(false)}
                            onCreate={handleSaveWithdrawDates}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-[100%] justify-center sm:flex-row flex-col items-center">
                  <div className="sm:w-[90%] w-[100%] flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-0 mb-2">
                      <label className="text-[white]"> Starting Date</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] sm:mb-5 flex items-center">
                      <div className="w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                        {/* <img className="h-[25px]" src={date} /> */}
                        <input
                          onFocus={(e) => (e.target.type = "date")}
                          // onBlur={(e) => (e.target.type = "text")}
                          placeholder="DD-MM-YY"

                          value={startingDate}
                          onChange={(e) => setStartingDate(e.target.value)}
                          className="outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:w-[90%] w-[100%] sm:ml-10 flex items-center flex-col">
                    <div className="w-[100%] sm:mt-2 mt-5 mb-2">
                      <label className="text-[white]">Ending Date</label>
                    </div>
                    <div className="bg-[#FFFFFF2B] rounded-[10px] h-[50px] w-[100%] mb-5 flex items-center">
                      <div className="w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center">
                        {/* <img className="h-[25px]" src={date} /> */}
                        <input
                          onFocus={(e) => (e.target.type = "date")}
                          // onBlur={(e) => (e.target.type = "text")}
                          placeholder="DD-MM-YY"
                          value={endingDate}
                          onChange={(e) => setEndingDate(e.target.value)}
                          className="outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[95%] sm:w-[90%] justify-center items-center mt-5">
                <div className="flex flex-row sm:flex-row sm:w-[100%] w-[100%] justify-between items-center gap-7">
                  {/* Cancel Button */}
                  <button
                    style={{
                      boxShadow: "-4px -6px 6.8px 0px #00000040 inset",
                    }}
                    className="w-[48%] sm:w-[100%] h-[50px] rounded-[10px] bg-colorinput font-bold text-[white]"
                  >
                    Cancel
                  </button>

                  {/* Create/Update Button */}
                  <button
                    style={{
                      boxShadow: "-4px -6px 6.8px 0px #00000040 inset",
                    }}
                    className="w-[48%] sm:w-[100%] h-[50px] rounded-[10px] bg-[#A87F0B] font-bold text-[white]"
                    onClick={id ? handleUpdateCommittee : handleCreateCommittee}
                  >
                    {id ? (
                      btnloader ? (
                        <ClipLoader
                          size={20}
                          color="#ffffff"
                          className="mt-2"
                        />
                      ) : (
                        "Update Kameti"
                      )
                    ) : btnloader ? (
                      <ClipLoader size={20} color="#ffffff" className="mt-2" />
                    ) : (
                      "Create Kameti"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmAlert && (
        <Alert
          btnloader={btnloader}
          message={confirmMessage}
          onConfirm={handleAlertConfirm} // Handle alert confirmation here
          onCancel={handleAlertCancel} // Cancel button logic
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={2000} // Auto close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide} // Optional transition effect
      />
      <InfoModal
        info={shareTotalAmount}
        handleCloseshare={handleCloseshare}
        message="Total amount that you will pay in all months and that you will receive on withdraw date."
      />
      <InfoModal
        info={shareMyKameti}
        handleCloseshare={handleCloseshare}
        message="Number of your shares in kameti. e.g. if there are total 10 share in the kameti and you want to have 2 shares then you will have 2 withdraw dates. You can add only 20 kameti Max."
      />
      <InfoModal
        info={shareTotalMonth}
        handleCloseshare={handleCloseshare}
        message="Total number of months for which you want to pay kameti."
      />
      <InfoModal
        info={shareMonthlyAmmount}
        handleCloseshare={handleCloseshare}
        message="Share this kameti app with your friends to benefit from its features."
      />
    </>
  );
}
