import React, { useEffect, useState, useRef } from "react";
import k1 from "../../images/k1.png";
import k2 from "../../images/k2.png";
import k3 from "../../images/k3.png";
import k4 from "../../images/k4.png";
import k5 from "../../images/k5.png";
import k6 from "../../images/k6.png";
import k7 from "../../images/k7.png";
import k8 from "../../images/k8.png";
import k9 from "../../images/k9.png";
import k10 from "../../images/k10.png";
import k11 from "../../images/k11.png";
import k12 from "../../images/k12.png";
import k13 from "../../images/k13.png";
import k14 from "../../images/k14.png";
import daily1 from "../../images/daily1.png";
import daily2 from "../../images/daily2.png";
import toogle from "../../images/toogle.png";
import toogle2 from "../../images/toogle2.png";
import Sidebar from "../../components/Sidebar/Sidebar";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import money from "../../images/Moneypay.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import "./Payment.css";
import calander from "../../images/appointment 1.png";
import check from "../../images/Checkmark.png";
import bank from "../../images/paymentImage/banknotes 2.png";
import lastdate from "../../images/paymentImage/calendar 2.png";
import cash from "../../images/paymentImage/cash-payment 1.png";
import startdate from "../../images/paymentImage/january 1.png";
import box from "../../images/paymentImage/safe-box 2.png";
import payday1 from "../../images/paymentImage/Payday.png";
import thirty from "../../images/paymentImage/thirty-one 1.png";
import calender2 from "../../images/paymentImage/payday 1.png";
import money1 from "../../images/paymentImage/money (1) 2.png";
import money2 from "../../images/paymentImage/money 2.png";
import Alert from "../../components/Alert/Alert";
import { MdOutlineRestartAlt } from "react-icons/md";
import unpay from "../../images/paymentImage/unpay.png";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import { FadeLoader, HashLoader } from "react-spinners";
import { IconButton } from "@mui/material";
import kametiLogo2 from "../../images/kametiLogo2.png";
import { IoShareSocialSharp } from "react-icons/io5";

import { TbMenu2 } from "react-icons/tb";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";
export default function kametiSetting() {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");
  const [committeeData, setCommitteeData] = useState(null);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [paymentData, setPaymentData] = useState({ date: null, price: null });
  const [confirmAction, setConfirmAction] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [kametiType, setKametiType] = useState("daily");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [isToggled, setIsToggled] = useState(false);

  const [loading, setLoading] = useState(true);
  // const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  // console.log(filteredPayments)
  const fetchKametis = async (type) => {
    try {
      const response = await axios.get(`${apiBaseUrl}payment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      let kametees;
      if (type === "daily") {
        setCommitteeData(response?.data?.data?.daily_committees);
        kametees = response?.data?.data?.daily_committees;
      } else {
        setCommitteeData(response?.data?.data?.monthly_committees);
        kametees = response?.data?.data?.monthly_committees;
      }

      if (kametees.length > 0) {
        const currentCommittee = kametees.find(
          (committee) => committee.id === selectedCommittee?.id
        );
        if (!currentCommittee) {
          setSelectedCommittee(kametees[0]);
          fetchPayments(kametees[0]?.id, kametees[0]?.kametiType);
        } else {
          fetchPayments(currentCommittee?.id, currentCommittee?.kametiType);
          setSelectedCommittee(currentCommittee);
          // console.log(currentCommittee);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchPayments = async (kametiId, type) => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}paymentsByKametiId/${kametiId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(type);
      if (type === "daily") {
        console.log(response?.data?.data?.paidKametiResponse);
        const allPaidKametis =
          response?.data?.data?.paidKametiResponse?.flatMap(
            (item) => item.paidkametis
          ) ?? [];
        // console.log(allPaidKametis);
        // Update the filteredPayments state
        setFilteredPayments(allPaidKametis);
      } else {
        console.log(response?.data?.data);
        console.log(
          response?.data?.data?.paidKametiResponse[0]?.paidkametis ?? []
        );

        var paidKametiResp = response?.data?.data?.paidKametiResponse;
        paidKametiResp.length == 0
          ? setFilteredPayments([])
          : setFilteredPayments(
              response?.data?.data?.paidKametiResponse[0]?.paidkametis ?? []
            );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePayCommittee = async (status) => {
    if (status === "pay" && selectedRow.date == null) {
      toast.error("date not selected");
    } else {
      try {
        console.log(selectedRow);
        console.log(selectedCommittee?.id);
        console.log(status);
        const response = await axios
          .post(
            `${apiBaseUrl}payCommittee`,
            {
              committeeID: selectedCommittee?.id,
              status: status === "pay" ? "paid" : "Unpaid",
              price: selectedRow.amount,
              date: dateToTimestamp(selectedRow.date),
              payment_id: status === "unpay" ? selectedRow.paymentId : null,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            setSelectedCommittee((prevCommittee) => ({
              ...prevCommittee,
              paidAmount: prevCommittee.paidAmount + selectedRow.amount,
              remainingAmount:
                prevCommittee.remainingAmount - selectedRow.amount,
            }));
            fetchKametis(selectedCommittee?.kametiType);
          });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
    setShowConfirmAlert(false);
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  const dateToTimestamp = (date) => {
    const timestamp = new Date(date).getTime();
    return timestamp;
  };

  const handleAlertCancel = () => {
    setShowConfirmAlert(false); // Hide the confirm alert
  };
  useEffect(() => {
    fetchKametis(kametiType);
  }, [kametiType]);

  useEffect(() => {
    if (selectedCommittee) {
      const filtered = selectedCommittee?.payments?.filter((payment) => {
        // Convert ase kall properties to lowercase for case-insensitive search
        const paymentValues = Object.values(payment).map((value) =>
          value.toString().toLowerCase()
        );
        // Check if any property includes the search query
        return paymentValues.some((value) =>
          value.includes(searchQuery.toLowerCase())
        );
      });
      setFilteredPayments(filtered);
    }
  }, [searchQuery, selectedCommittee]);

  const handleSortBy = (sortBy, sortOrder) => {
    // Sort the filtered payments based on the chosen property
    const sorted = [...filteredPayments].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        // Convert date strings to Date objects for proper comparison
        comparison = new Date(a[sortBy]) - new Date(b[sortBy]);
      } else if (sortBy === "price") {
        // Convert prices to numbers for proper comparison
        comparison = parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
      } else if (sortBy === "status") {
        // Sort by status alphabetically
        comparison = a[sortBy].localeCompare(b[sortBy]);
      } else {
        // Default sorting for other propertiess
        comparison = a[sortBy] - b[sortBy];
      }
      // Apply sortOrder
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setFilteredPayments(sorted);
  };

  const handleKametiTypeChange = (selectedType) => {
    // const selectedType = event.target.value;
    // console.log(selectedType)
    setKametiType(selectedType);
    fetchKametis(selectedType);
  };

  const handleCommitteeChange = (event) => {
    const commId = parseInt(event.target.value, 10); // Convert the value to an integer
    console.log(commId);
    console.log(committeeData);
    const selectedComm = committeeData?.find((comm) => comm?.id === commId);
    console.log(selectedComm);
    setSelectedCommittee(selectedComm);
    fetchPayments(commId, selectedComm?.kametiType);

    // Update the date to the starting month of the selected committee
    if (selectedComm?.startingMonth) {
      const newStartDate = new Date(selectedComm.startingMonth);
      setDate(newStartDate); // Reset calendar to start month
    }
  };

  const [date, setDate] = useState(new Date());
  const [highlightedDatesMap, setHighlightedDatesMap] = useState({});
  const [highlightedDates, setHighlightedDates] = useState({
    dates: [],
    committeeId: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [months, setMonths] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [calendarKey, setCalendarKey] = useState(0); // Key to force re-render of the calendar
  const calendarRef = useRef(null);

  const getMonthsInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      months.push(currentDate.getTime());
      currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    }
    return months;
  };

  useEffect(() => {
    if (selectedCommittee) {
      // Set the months to be displayed on the calendar
      const newMonths = getMonthsInRange(
        selectedCommittee?.startingMonth,
        selectedCommittee?.endingMonth
      );
      setMonths(newMonths);

      // Reset calendar to the starting month of the selected committee
      setDate(new Date(selectedCommittee?.startingMonth));

      // Force calendar to re-render by changing key
      setCalendarKey((prevKey) => prevKey + 1);
    }
  }, [selectedCommittee?.id]);

  useEffect(() => {
    if (selectedCommittee?.id) {
      if (filteredPayments?.length > 0) {
        const paymentDates = filteredPayments.map(
          (payment) => new Date(payment.date)
        );

        setHighlightedDatesMap((prevMap) => ({
          ...prevMap,
          [selectedCommittee.id]: paymentDates,
        }));

        setHighlightedDates({
          dates: paymentDates,
          committeeId: selectedCommittee.id,
        });
      } else {
        setHighlightedDatesMap((prevMap) => ({
          ...prevMap,
          [selectedCommittee.id]: [],
        }));

        setHighlightedDates({
          dates: [],
          committeeId: selectedCommittee.id,
        });
      }
    }
  }, [filteredPayments, selectedCommittee?.id]);

  useEffect(() => {
    if (calendarRef.current) {
      // Force calendar to update view if necessary
      calendarRef.current.viewDate = new Date(selectedCommittee?.startingMonth);
    }
  }, [calendarKey]);

  useEffect(() => {
    if (selectedCommittee?.id && highlightedDatesMap[selectedCommittee?.id]) {
      setHighlightedDates({
        dates: highlightedDatesMap[selectedCommittee?.id],
        committeeId: selectedCommittee?.id,
      });
    } else {
      setHighlightedDates({ dates: [], committeeId: selectedCommittee?.id });
    }
  }, [selectedCommittee?.id, highlightedDatesMap]);

  const minDate = new Date(Math.min(...months));
  const maxDate = new Date(Math.max(...months));

  const handleDateClick = (value) => {
    const clickedDate = value.toDateString();
    const clickedMonth = value.getMonth();
    const clickedYear = value.getFullYear();

    const payment = filteredPayments.find((p) => {
      const paymentDate = new Date(p.date);
      return paymentDate.toDateString() === clickedDate;
    });

    if (payment) {
      // Show payment details
      if (selectedCommittee?.kametiType == "daily") {
        var price =
          selectedCommittee?.pricePerDayKameti *
          selectedCommittee?.myTotalKametis;
      } else {
        var price =
          selectedCommittee?.pricePerMonthKameti *
          selectedCommittee?.myTotalKametis;
      }
      setPaymentDetails({
        date: payment.date,
        price: price,
      });
      setModalVisible(true);
    } else {
      let alreadyPaid = false;

      if (selectedCommittee?.kametiType === "monthly") {
        alreadyPaid = filteredPayments.some((p) => {
          const paymentDate = new Date(p.date);
          return (
            paymentDate.getMonth() === clickedMonth &&
            paymentDate.getFullYear() === clickedYear
          );
        });
      }

      if (!alreadyPaid) {
        // check daily or monthly payment
        if (selectedCommittee?.kametiType === "monthly") {
          setSelectedRow({
            date: clickedDate,
            amount:
              selectedCommittee?.pricePerMonthKameti *
              selectedCommittee?.myTotalKametis,
          });
        } else {
          setSelectedRow({
            date: clickedDate,
            amount:
              selectedCommittee?.pricePerDayKameti *
              selectedCommittee?.myTotalKametis,
          });
        }
        setConfirmMessage("Do you want to make a payment for this date?");
        setConfirmAction("payCommitee");
        setShowConfirmAlert(true);
      } else {
        toast.error("This month kameti has already been paid.");
      }
    }
  };

  const [rows, setRows] = useState([]);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    console.log(month);
    // Filter payments for the selected month from selectedCommittee object
    const selectedPayments = filteredPayments.filter((payment) => {
      const paymentDate = new Date(payment.date);
      console.log(paymentDate.getMonth());
      const selectedMonthDate = new Date(Number(month));
      console.log(new Date(selectedMonthDate).getMonth());
      return (
        paymentDate.getMonth() + 1 === selectedMonthDate.getMonth() + 1 &&
        paymentDate.getFullYear() === selectedMonthDate.getFullYear()
      );
    });

    // Map payments to rows format and setRows
    const formattedRows = selectedPayments.map((payment, index) => ({
      id: index + 1,
      status: payment.status,
      amount: payment.price,
      paymentId: payment.id,
      date: new Date(payment.date).toISOString().split("T")[0], // Format date as YYYY-MM-DD
      photoStatus: payment.photoStatus || "No Photo",
    }));

    setRows(formattedRows);
  };
  let screenwidth = window.innerWidth;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const toggleDropdown = () => {
    setIsToggled(!isToggled);
    setShowDropdown(!showDropdown);
  };
  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-black">
        <div className="w-[100%] h-[100vh] flex  ">
          {screenwidth > 430 && <Sidebar />}
          {loading ? (
            <div className="loading-screen flex justify-center items-center sm:w-[75%] w-[100%] h-[100vh] bg-[black]">
              <FadeLoader color="#A87F0B" />
            </div>
          ) : (
            <div className="sm:w-[80%] w-[100%] h-[100vh] overflow-y-scroll sm:pb-3 bg-maincolor ml-[2px]  sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px] ">
              <div className="w-[100%] flex justify-between items-center h-[80px] sm:p-0 p-3 sm:mt-6 border-b-[2px] border-[black] ">
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
                  <h1 className="text-[#A87F0B] sm:text-[25px] text-[20px] font-bold sm:ml-10 ml-3 sm:mb-6">
                    Payments
                  </h1>{" "}
                </span>
              </div>
              <div className="w-[100%] mt-2 bg-[#282828] shadow-[inset_16px_6px_24px_0px_#FFFFFF40] flex justify-between items-center h-[100px]">
  {/* Left Section */}
  <div className="w-[50%] ml-5 flex flex-col justify-center">
    <p className="text-gray-300 font-semibold text-[14px]">
      {selectedCommittee?.kametiName || "No Kameti"}
    </p>
    <h1 className="text-yellow-500 font-bold text-[28px]">
      Rs.{" "}
      {Number(selectedCommittee?.totalPrice || 0).toLocaleString()}
    </h1>
    <p className="text-gray-400 text-[12px] mt-1">Select Kameti</p>
  </div>

  {/* Dropdown Section */}
  <div className="flex justify-center flex-col w-[30%] mr-5 relative">
    <select
      className="w-full h-[40px] bg-[#373737] text-gray-300 text-[14px] rounded-[8px] pl-3 pr-8 border border-[#555] appearance-none outline-none focus:ring-2 focus:ring-yellow-500"
      onChange={handleCommitteeChange}
    >
      {committeeData?.length === 0 ? (
        <option value="" disabled>
          No kameti
        </option>
      ) : (
        committeeData.map((comm, index) => (
          <option
            key={index}
            value={comm.id}
            selected={selectedCommittee?.id === comm.id}
          >
            {comm.kametiName} ({comm.totalPrice})
          </option>
        ))
      )}
    </select>

    {/* Dropdown Icon */}
    <div className="absolute top-[12px] right-[12px] pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
</div>


              <div className="flex w-[23%] ml-[35%] mt-9 mb-2 items-center relative">
                <div className="bg-[#181818] border text-white outline-none border-[#A87F0B] rounded-[30px] h-[39px] sm:h-[45px] w-[100%] pl-[165px]">
                  <button
                    className=" text-white absolute left-0 rounded-[30px] h-[39px] sm:h-[44px] sm:text-[20px] w-[53%]"
                    onClick={() => handleKametiTypeChange("daily")}
                    style={
                      kametiType == "daily"
                        ? { backgroundColor: "#A87F0B", color: "black" }
                        : null
                    }
                  >
                    Daily
                  </button>
                  <button
                    className=" absolute right-0 rounded-[30px] h-[39px] sm:h-[44px] sm:text-[20px] w-[53%]"
                    onClick={() => handleKametiTypeChange("monthly")}
                    style={
                      kametiType == "monthly"
                        ? { backgroundColor: "#A87F0B", color: "black" }
                        : null
                    }
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <div className="text-white min-h-screen mx-[30px]">
                {/* Monthly Details */}
                <div className="mt-6">
                  <div
                    className="grid grid-cols-1 rounded-b-[20px] mb-12 
"
                  >
                    {/* Mapping through the separate sections */}
                    {Object.entries({
                      monthly: [
                        ...(selectedCommittee?.kametiType === "daily"
                          ? [
                              {
                                image: daily1,
                                title: "Daily Amount",
                                value:
                                  "Rs." +
                                  Number(
                                    selectedCommittee?.pricePerDayKameti
                                  ).toLocaleString(),
                              },
                              {
                                image: daily2,
                                title: "Daily Payable",
                                value:
                                  "Rs." +
                                  Number(
                                    selectedCommittee?.perDayPayablePrice
                                  ).toLocaleString(),
                              },
                            ]
                          : []),
                        {
                          image: k1,
                          title: "Monthly Amount",
                          value:
                            "Rs." +
                            Number(
                              selectedCommittee?.pricePerMonthKameti
                            ).toLocaleString(),
                        },
                        {
                          image: k2,
                          title: "Monthly Payable",
                          value:
                            "Rs." +
                            Number(
                              selectedCommittee?.pricePerMonthKameti *
                                selectedCommittee?.myTotalKametis
                            ).toLocaleString(),
                        },
                        {
                          image: k3,
                          title: "Total Payable",
                          value: "Rs." + selectedCommittee?.totalPrice,
                        },
                        {
                          image: k4,
                          title: "Total Months",
                          value: selectedCommittee?.totalMonths,
                        },
                      ],
                      amounts: [
                        {
                          image: k5,
                          title: "Total Amount",
                          value:
                            "Rs." +
                            parseInt(selectedCommittee?.totalPrice) /
                              parseInt(selectedCommittee?.myTotalKametis),
                        },
                        {
                          image: k6,
                          title: "Paid Amount",
                          value:
                            "Rs." +
                            parseInt(selectedCommittee?.noOfPaidKameties) *
                              parseInt(selectedCommittee?.myTotalKametis),
                        },
                        {
                          image: k7,
                          title: "Remaining Amount",
                          value:
                            "Rs." +
                            Number(
                              selectedCommittee?.remainingAmount
                            ).toLocaleString(),
                        },
                      ],
                      kameties: [
                        {
                          image: k8,
                          title: "My Kameties",
                          value: selectedCommittee?.myTotalKametis,
                        },
                        {
                          image: k9,
                          title: "Paid Kameties",
                          value: Number(
                            selectedCommittee?.paidAmount
                          ).toLocaleString(),
                        },
                        {
                          image: k10,
                          title: "Kameties Payable",
                          value:
                            parseInt(selectedCommittee?.totalMonths) *
                            parseInt(selectedCommittee?.myTotalKametis),
                        },
                        {
                          image: k11,
                          title: "Remaining Kameties",
                          value:
                            parseInt(selectedCommittee?.totalMonths) *
                              parseInt(selectedCommittee?.myTotalKametis) -
                            parseInt(selectedCommittee?.noOfPaidKameties) *
                              parseInt(selectedCommittee?.myTotalKametis),
                        },
                      ],
                      dates: [
                        {
                          image: k12,
                          title: "Start Date",
                          value: formatDate(selectedCommittee?.startingMonth),
                        },
                        {
                          image: k13,
                          title: "End Date",
                          value: formatDate(selectedCommittee?.endingMonth),
                        },
                        {
                          image: k14,
                          title: "Withdrawal Dates",
                          value: "Click To View",
                        },
                      ],
                    }).map(([section, items], sectionIndex) => (
                      <div
                        key={sectionIndex}
                        className="mt-6 mb-1 bg-[#2B2B2B] rounded-[11px] py-[25px]" // Add bottom margin here
                      >
                        {/* Section Header */}
                        <h3 className="font-medium text-lg pl-6 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 text-sm sm:text-lg md:text-xl lg:text-2xl">
                          {section === "monthly"
                            ? selectedCommittee?.kametiType == "daily"
                              ? "Daily Kameti Info"
                              : "Monthly Kameti Info"
                            : section === "amounts"
                            ? "Amounts Info"
                            : section === "kameties"
                            ? "Kameties Info"
                            : section === "dates"
                            ? "Dates Info"
                            : ""}
                        </h3>

                        {/* Section Items */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 p-2 font-medium text-lg xl:pl-16 lg:pl-16 sm:pl-8 md:pl-12">
                          {items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center p-4 space-x-4 relative"
                            >
                              {/* Conditionally Render Image */}
                              {item.title !== "Withdrawal Dates" && (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-[35px] h-[35px] sm:w-[65px] sm:h-[65px] object-cover rounded-md"
                                />
                              )}
                              <div>
                                {/* Conditional Dropdown for 'Withdrawal Dates' */}
                                {item.title === "Withdrawal Dates" ? (
                                  <div
                                    className="relative bg-[#A87F0B] w-[270px] rounded-[20px] px-[15px] py-[10px] shadow-[inset_0px_-7px_4px_0px_#00000040]"
                                    onClick={toggleDropdown}
                                  >
                                    <h4 className="text-xs sm:text-lg text-[#CACACA] sm:leading-[1.2]">
                                      {item.title}
                                    </h4>
                                    <div className="flex items-center justify-between w-full">
                                      <button>{item.value}</button>
                                      {isToggled ? (
                                        <img
                                          src={toogle2}
                                          alt="Toggle Two"
                                          className="w-[25px]"
                                        />
                                      ) : (
                                        <img
                                          src={toogle}
                                          alt="Toggle One"
                                          className="w-[25px]"
                                        />
                                      )}
                                    </div>
                                    {showDropdown && (
                                      <div className="absolute top-full left-0 z-10 w-[270px] max-h-[155px] overflow-y-auto dropdown-scrollbar bg-[#333] text-white rounded-md mt-2 p-2 shadow-[inset_0px_-7px_4px_0px_#00000040]">
                                        {selectedCommittee?.withdraw.map(
                                          (date, index) => (
                                            <div
                                              key={index}
                                              className="dropdown-item flex gap-4 items-center mb-5"
                                            >
                                              <span className="rounded-[100px] bg-[#A87F0B] px-[10px] text-center">
                                                {index + 1}
                                              </span>
                                              <strong>
                                                Rs.
                                                {parseInt(
                                                  selectedCommittee?.totalPrice
                                                ) /
                                                  parseInt(
                                                    selectedCommittee?.myTotalKametis
                                                  )}
                                              </strong>
                                              <span>
                                                {new Date(
                                                  paymentDetails.date
                                                ).toLocaleDateString()}
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <>
                                    <h4 className="text-xs sm:text-lg text-[#CACACA] sm:leading-[1.2]">
                                      {item.title}
                                    </h4>
                                    <p className="text-sm sm:text-lg text-[#FFFFFF] sm:leading-[1.2]">
                                      {item.value}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full flex flex-col items-center ">
                  <div class=" text-white p-6 text-center space-y-4 rounded-lg">
                    <p class="text-lg">
                      Want to share history with others? Tap Below
                    </p>
                    <div class="flex justify-center items-center space-x-2 text-[#CACACA]">
                      <a
                        href="https://App.Kameti.Pk/Detail/29493"
                        class="underline"
                      >
                        Https://App.Kameti.Pk/Detail/29493
                      </a>
                      <div class="flex space-x-2">
                        <span class="material-icons">language</span>
                        <span class="material-icons">content_copy</span>
                      </div>
                    </div>

                    <p class="text-lg">Want to pay Kameti? Tap Below</p>
                  </div>

                  {/* Calendar Header */}
                  <div
                    className="w-full bg-[#A87F0B] text-center py-3 font-bold rounded-t-[20px] 
    text-sm sm:text-lg md:text-xl lg:text-2xl mt-5"
                  >
                    Calendar
                  </div>
                  {/* Calendar Container */}
                  <div
                    className="w-full h-[430px] sm:h-[450px] md:h-[440px]
    bg-[#333232] p-2 sm:p-4 overflow-hidden"
                  >
                    <div className="w-full overflow-auto calendar-container">
                      <Calendar
                        key={calendarKey}
                        ref={calendarRef}
                        onChange={setDate}
                        value={date}
                        tileClassName={({ date }) => {
                          const isHighlighted =
                            highlightedDates.committeeId ===
                              selectedCommittee?.id &&
                            highlightedDates.dates.some(
                              (d) =>
                                new Date(d).toDateString() ===
                                date.toDateString()
                            );

                          return isHighlighted ? "highlighted" : null;
                        }}
                        tileDisabled={({ date, view }) => {
                          return (
                            view === "month" &&
                            date.getMonth() !== new Date(date).getMonth()
                          );
                        }}
                        className="react-calendar w-full max-w-[400px] sm:max-w-[600px] md:max-w-[800px]"
                        onClickDay={handleDateClick}
                        minDate={minDate}
                        maxDate={maxDate}
                        view="month"
                        nextLabel="›"
                        prevLabel="‹"
                        next2Label={null}
                        prev2Label={null}
                      />
                    </div>
                  </div>
                </div>

                {/* <p className="text-center py-5 text-sm sm:text-lg md:text-md ">
                  ©avicennaenterprisesolutions | All Rights Reserved
                </p> */}
              </div>
            </div>
          )}
        </div>
      </div>
      {showConfirmAlert && (
        <Alert
          message={confirmMessage}
          onConfirm={() => {
            if (confirmAction === "payCommitee") {
              handlePayCommittee("pay");
            } else if (confirmAction === "unpayCommitee") {
              handlePayCommittee("unpay");
            }
          }}
          onCancel={handleAlertCancel}
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
    </>
  );
}
