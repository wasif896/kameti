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
import "./Payment.css";
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
import { Button, IconButton } from "@mui/material";
import kametiLogo2 from "../../images/kametiLogo2.png";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoShareSocial } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { MdContentCopy } from "react-icons/md";
import payment from "../../images/payment2.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LuCopyCheck } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";


import { TbMenu2 } from "react-icons/tb";
import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";
export default function Payment() {
  const [isCopied, setIsCopied] = useState(false);
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
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get("id"); // Get the ID from the URL
  const [btnloader, setBTnloader] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  // const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [activeKameti, setActiveKameti] = useState(null);
  // console.log(filteredPayments)

  const fetchKametis = async (type) => {
    try {
      const response = await axios.get(`${apiBaseUrl}payment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dailyCommTemp = response?.data?.data?.daily_committees;
      const monthlyCommTemp = response?.data?.data?.monthly_committees;

      let kametees;
      if (type === "daily") {
        setCommitteeData(dailyCommTemp);
        kametees = dailyCommTemp;
      } else {
        setCommitteeData(monthlyCommTemp);
        kametees = monthlyCommTemp;
      }

      // Check if the URL has a valid id
      if (urlId) {
        console.log(urlId);

        const activeCommitteeExist = [
          ...dailyCommTemp,
          ...monthlyCommTemp,
        ].find((committee) => committee.id === parseInt(urlId, 10));
        console.log(activeCommitteeExist);

        if (activeCommitteeExist) {
          setSelectedCommittee(activeCommitteeExist);
          setKametiType(activeCommitteeExist?.kametiType || type);
          fetchPayments(
            activeCommitteeExist?.id,
            activeCommitteeExist?.kametiType
          );
        } else {
          console.warn("No committee found with the given URL ID");
        }
      } else {
        // Fallback when no ID is in the URL
        const firstCommittee = kametees[0];
        if (firstCommittee) {
          setSelectedCommittee(firstCommittee);
          setKametiType(firstCommittee?.kametiType || type);
          fetchPayments(firstCommittee?.id, firstCommittee?.kametiType);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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
    console.log(status);
    if (status === "pay" && selectedRow.date == null) {
      toast.error("Date not selected");
      return;
    }
    setBTnloader(true);
    try {
      const paymentType =
        selectedCommittee?.kametiType === "daily" ? "daily" : "monthly";

      if (
        status === "pay" &&
        paymentType === "daily" &&
        date.getDate() === 28 &&
        date.getMonth() === 1
      ) {
        for (let i = 0; i < 3; i++) {
          await callPayCommitteeAPI(status);
        }

        toast.success(
          "Payment processed successfully for the 28th of February and the next two days!"
        );
        setBTnloader(false);
      } else {
        await callPayCommitteeAPI(status);

        // Show success message based on payment status
        if (status === "pay") {
          toast.success("Payment paid successfully.");
          setBTnloader(false);
        } else if (status === "unpay") {
          toast.success("Payment unpaid successfully.");
          setBTnloader(false);
        }
      }
      setBTnloader(false);
      // Close confirmation alert after processing
      setShowConfirmAlert(false);
    } catch (error) {
      console.error("Error:", error);
      setBTnloader(false);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const callPayCommitteeAPI = async (status) => {
    const paymentType =
      selectedCommittee?.kametiType === "daily" ? "daily" : "monthly";

    const response = await axios.post(
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
    );

    console.log("API Response:", response.data);

    setSelectedCommittee((prevCommittee) => ({
      ...prevCommittee,
      paidAmount:
        prevCommittee.paidAmount + (status === "pay" ? selectedRow.amount : 0),
      remainingAmount:
        prevCommittee.remainingAmount -
        (status === "pay" ? selectedRow.amount : 0),
    }));

    fetchKametis(selectedCommittee?.kametiType);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" }; // 'numeric' for full year
    return date.toLocaleDateString("en-GB", options); // 'en-GB' ensures the dd/mm/yyyy format
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
    let currentDate = new Date(startDate); // Initialize currentDate with startDate

    while (currentDate <= endDate) {
      if (kametiType === "daily") {
        currentDate.setDate(1); // Set date to the 1st of the month if kametiType is 'daily'
      }
      months.push(currentDate.getTime()); // Add the timestamp of the current month

      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
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

//   useEffect(() => {
//     if (selectedCommittee?.id && highlightedDatesMap[selectedCommittee?.id]) {
//       setHighlightedDates({
//         dates: highlightedDatesMap[selectedCommittee?.id],
//         committeeId: selectedCommittee?.id,
//       });
//     } else {
//       setHighlightedDates({ dates: [], committeeId: selectedCommittee?.id });
//     }
    
//  const minDate = new Date(Math.min(...months));
//   let maxDate = new Date(selectedCommittee?.endingMonth);
  
//     const today = new Date();
//     setDate(today); 
//   }, [selectedCommittee?.id, highlightedDatesMap]);
//   const minDate = months.length > 0 
//   ? new Date(Math.min(...months.map(date => new Date(date).getTime()))) 
//   : null; 
// const today = new Date();
// const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);


useEffect(() => {
  if (selectedCommittee?.id && highlightedDatesMap[selectedCommittee?.id]) {
    setHighlightedDates({
      dates: highlightedDatesMap[selectedCommittee?.id],
      committeeId: selectedCommittee?.id,
    });
  } else {
    setHighlightedDates({ dates: [], committeeId: selectedCommittee?.id });
  }

  // Ensure the calendar always scrolls to the current month on page load
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed (January is 0)
  
  const scrollToCurrentMonth = () => {
    const monthElement = document.querySelector(
      `[data-year="${currentYear}"][data-month="${currentMonth}"]`
    );
    if (monthElement) {
      // Use 'auto' for smoothness during transitions
      monthElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  scrollToCurrentMonth();
}, [selectedCommittee, highlightedDatesMap]); // Dependency adjusted


const minDate = new Date(Math.min(...months));
console.log(minDate);
let maxDate = new Date(selectedCommittee?.endingMonth);




  const handleDateClick = (value) => {
    console.log(value);
    const clickedDate = value.toDateString();
    const clickedMonth = value.getMonth(); // 0-based index (January is 0, February is 1)
    const clickedYear = value.getFullYear();
    const date = new Date(value); // Parse the clicked date

    const payment = filteredPayments.find((p) => {
      const paymentDate = new Date(p.date);
      return paymentDate.toDateString() === clickedDate;
    });

    if (payment) {
      // Show payment details
      const price =
        selectedCommittee?.kametiType === "daily"
          ? selectedCommittee?.pricePerDayKameti *
            selectedCommittee?.myTotalKametis
          : selectedCommittee?.pricePerMonthKameti *
            selectedCommittee?.myTotalKametis;

      setPaymentDetails({
        date: payment.date,
        price: price,
      });
      setSelectedRow({
        date: payment.date,
        amount: price,
      });
      setModalVisible(true);

      setConfirmMessage("Do you want to cancel payment for this date?");
      setConfirmAction("unpayCommitee");
      setShowConfirmAlert(true);
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
        const price =
          selectedCommittee?.kametiType === "monthly"
            ? selectedCommittee?.pricePerMonthKameti *
              selectedCommittee?.myTotalKametis
            : selectedCommittee?.pricePerDayKameti *
              selectedCommittee?.myTotalKametis;

        setSelectedRow({
          date: clickedDate,
          amount: price,
        });

        // Check for February 28th condition
        if (
          selectedCommittee?.kametiType === "daily" &&
          date.getDate() === 28 &&
          date.getMonth() === 1
        ) {
          setConfirmMessage(
            "By paying the kameti for this date, the remaining two days' payments will also be covered."
          );
        } else {
          setConfirmMessage("Do you pay kameti?");
        }

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
      console.log(ok);
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedCommittee?.id || ""
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleSelectOption = (id) => {
    setSelectedOption(id);
    handleCommitteeChange({ target: { value: id } }); // Simulate onChange event
    setModalOpen(false); // Close the modal after selection
  };

  const link =
    selectedCommittee?.kametiType === "daily"
      ? `https://App.Kameti.Pk/Detail/${selectedCommittee?.id}`
      : `https://App.Kameti.Pk/Detail/${selectedCommittee?.id}`;

  const handleCopyLink = () => {
    const baseUrl = window.location.origin; // Get the current base URL
    navigator.clipboard.writeText(baseUrl).then(() => {
      setIsCopied(true);

      // Reset the icon after a certain period
      setTimeout(() => {
        setIsCopied(false);
      }, 3000); // Reset after 3 seconds
    });
  };

  // Share link (using Web Share API)
  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Kameti Link",
          text: "Check out this Kameti link:",
          url: link,
        });
      } catch (error) {
        console.error("Error sharing link:", error);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };
  const handleOpenWeb = () => {
    const url = `https://app.kameti.pk/detail/${selectedCommittee?.id}`;
    if (url) {
      window.open(url, "_blank"); // Open the URL in a new tab
    } else {
      console.error("URL is undefined.");
    }
  };
  const handleBack = () =>{
    navigate(-1);
  }

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
            <div className="sm:w-[80%] w-[100%] h-[100vh] overflow-y-scroll sm:pb-3  sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px] ">
            <div className="w-[100%] flex justify-between items-center h-[80px] sm:p-0 p-3 sm:mt-6 border-b-[1px] border-[#535353]">
  <span className="flex justify-center items-center w-full sm:w-auto">
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

    {urlId ? (
      <div className="flex items-center space-x-1" onClick={handleBack}>
        <IoIosArrowBack className="text-white text-xl" />
        <Button style={{ color: "white", fontSize: "16px" }}>Back</Button>
      </div>
    ) : (
      <div className="flex justify-center items-center w-full sm:w-auto">
        <h1 className="text-white sm:text-[25px] text-[20px] font-bold flex items-center justify-center sm:ml-5">
          {/* Image visible only on larger screens */}
          <img
            className="hidden sm:block w-[40px] mr-3"
            src={payment}
            alt="payment"
          />
          Payments
        </h1>
      </div>
    )}
  </span>
</div>

              {committeeData?.length > 0 ? (
                <div className="w-[100%] mt-2 bg-[#282828] shadow-[inset_16px_6px_24px_0px_#FFFFFF40] flex justify-between items-center h-[100px]">
                  {/* Left Section */}
                  <div className="w-[50%] ml-5 flex flex-col justify-center">
                    <p className="text-gray-300 font-semibold text-[14px]">
                      {selectedCommittee?.kametiName || "No Kameti"}
                    </p>
                    <h1 className="text-yellow-500 font-bold text-[20px] sm:text-[28px]">
                      Rs.{" "}
                      {(selectedCommittee?.totalPrice &&
                      selectedCommittee?.myTotalKametis
                        ? parseInt(selectedCommittee?.totalPrice) /
                          parseInt(selectedCommittee?.myTotalKametis)
                        : 0
                      ).toLocaleString()}
                    </h1>

                    {/* <p className="text-gray-400 text-[12px] mt-1">
                    Select Kameti
                  </p> */}
                  </div>
                {urlId ? 
                  ''
                :      <div className="flex justify-start flex-col mr-3">
                <select
                  className="w-[100%] outline-none border border-[white] bg-[#373737] text-[#999] text-[14px] h-[40px] rounded-[5px] pl-1 pr-3"
                  onChange={handleCommitteeChange}
                >
                  {committeeData?.length === 0 ? (
                    <option value="" selected disabled>
                      No kameti
                    </option>
                  ) : (
                    committeeData.map((comm, index) => {
                      // Calculate value dynamically
                      const calculatedValue =
                        comm.totalPrice && comm.myTotalKametis
                          ? "Rs. " +
                            (
                              parseInt(comm.totalPrice) /
                              parseInt(comm.myTotalKametis)
                            ).toLocaleString()
                          : "Rs. 0";

                      return (
                        <option
                          key={index}
                          value={comm.id}
                          selected={selectedCommittee?.id === comm.id}
                        >
                          {comm.kametiName} ({calculatedValue})
                        </option>
                      );
                    })
                  )}
                </select>
              </div>  }
                </div>
              ) : (
                ""
              )}
{urlId ? 
''
 :   <div className="w-[100%] flex items-center justify-center">
 <div className="flex w-[45%] sm:w-[23%] mt-9 mb-2 items-center relative">
   <div className="bg-[#181818] border text-white outline-none border-[#A87F0B] rounded-[30px] h-[39px] sm:h-[45px] w-[100%] relative">
     <button
       className={`text-white absolute left-0 rounded-[30px] h-[39px] sm:h-[44px] sm:text-[16px] w-[53%] ${
         kametiType === "daily" ? "bg-[#A87F0B]" : ""
       }`}
       style={
         kametiType === "daily"
           ? {
               boxShadow:
                 "-4.2px 5.88px 7.22px 0px rgba(255, 255, 255, 0.34) inset",
             }
           : {}
       }
       onClick={() => handleKametiTypeChange("daily")}
     >
       Daily
     </button>

     <button
       className={`absolute right-0 rounded-[30px] h-[39px] sm:h-[44px] sm:text-[16px] w-[53%] ${
         kametiType === "monthly" ? "bg-[#A87F0B]" : ""
       }`}
       style={
         kametiType === "monthly"
           ? {
               boxShadow:
                 "-4.2px 5.88px 7.22px 0px rgba(255, 255, 255, 0.34) inset",
             }
           : {}
       }
       onClick={() => handleKametiTypeChange("monthly")}
     >
       Monthly
     </button>
   </div>
 </div>
</div>
}
             
              {committeeData?.length > 0 ? (
                <div className="text-white min-h-screen mx-[1px] sm:mx-[50px]">
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
                            value: "Rs." + (selectedCommittee?.totalPrice).toLocaleString(),
                          },
                          {
                            image: k4,
                            title: "Total Months",
                            value: (selectedCommittee?.totalMonths).toLocaleString(),
                          },
                        ],
                        amounts: [
                          {
                            image: k5,
                            title: "Total Amount",
                            value:
                              "Rs." +
                              (parseFloat(selectedCommittee?.totalPrice) / parseFloat(selectedCommittee?.myTotalKametis)).toLocaleString(),
                          },                          
                          {
                            image: k6,
                            title: "Paid Amount",
                            value: Number(
                              selectedCommittee?.paidAmount
                            ).toLocaleString(),
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
                            value: (selectedCommittee?.myTotalKametis).toLocaleString(),
                          },
                          {
                            image: k9,
                            title: "Paid Kameties",
                            value:
                              "Rs." +
                              (parseInt(selectedCommittee?.noOfPaidKameties) *
                                parseInt(selectedCommittee?.myTotalKametis)).toLocaleString(),
                          },
                          {
                            image: k10,
                            title: "Kameties Payable",

                            value:
                              selectedCommittee?.kametiType === "daily"
                                ? parseInt(selectedCommittee?.totalMonths) *
                                  30 *
                                  parseInt(selectedCommittee?.myTotalKametis)
                                : parseInt(selectedCommittee?.totalMonths) *
                                  parseInt(selectedCommittee?.myTotalKametis),
                          },
                          {
                            image: k11,
                            title: "Remaining Kameties",
                            value:
                              selectedCommittee?.kametiType === "daily"
                                ? parseInt(selectedCommittee?.totalMonths) *
                                    30 *
                                    parseInt(
                                      selectedCommittee?.myTotalKametis
                                    ) -
                                  parseInt(
                                    selectedCommittee?.noOfPaidKameties
                                  ) *
                                    parseInt(selectedCommittee?.myTotalKametis)
                                : parseInt(selectedCommittee?.totalMonths) *
                                    parseInt(
                                      selectedCommittee?.myTotalKametis
                                    ) -
                                  parseInt(
                                    selectedCommittee?.noOfPaidKameties
                                  ) *
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
                        // {selectedCommittee : ()}
                        <div
                          key={sectionIndex}
                          className="mt-6 mb-1 bg-[#2B2B2B] rounded-[8px] py-[25px]" // Add bottom margin here
                        >
                          {/* Section Header */}
                          <h3 className="font-medium text-lg pl-6 sm:pl-6 text-sm sm:text-lg md:text-xl lg:text-2xl pb-3">
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
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 p-2 font-medium text-lg ">
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
                                                className="dropdown-item flex items-center mb-5 justify-between"
                                              >
                                                {/* Index and Amount */}
                                                <div className="flex items-center  w-[70%]">
                                                  <span className="rounded-[100px] bg-[#A87F0B]  text-center w-[30px]">
                                                    {index + 1}
                                                  </span>
                                                  <strong className="ml-3  text-right">
                                                    Rs.
                                                    {parseInt(
                                                      selectedCommittee?.totalPrice
                                                    ) /
                                                      parseInt(
                                                        selectedCommittee?.myTotalKametis
                                                      )}
                                                  </strong>
                                                </div>
                                                {/* Date */}
                                                <span className="text-right w-[40%]">
                                                  {date == null
                                                    ? "N/A"
                                                    : formatDate(date)}
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
                                      {/* <p className="text-sm sm:text-lg text-[#FFFFFF] sm:leading-[1.2]">
  {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(Number(item.value) || 0)}
</p> */}

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
                    <div className="text-white p-6 text-center space-y-4 rounded-lg">
                      <p className="text-sm sm:text-lg">
                        Want to share history with others? Tap Below
                      </p>
                      <div className="flex justify-center items-center space-x-2 text-[#CACACA]">
                        <a
                          href={`https://app.Kameti.pk/detail/${
                            selectedCommittee?.kametiType === "daily"
                              ? selectedCommittee?.id
                              : selectedCommittee?.id
                          }`}
                          className="underline text-[15px]"
                        >
                          {selectedCommittee?.kametiType === "daily"
                            ? `https://app.kameti.pk/detail/${selectedCommittee?.id}`
                            : `https://app.Kameti.pk/detail/${selectedCommittee?.id}`}
                        </a>
                        <div className="flex space-x-2">
                          <span
                            className="cursor-pointer"
                            onClick={handleShareLink}
                            title="Share Link"
                          >
                            <IoShareSocial size={23} />
                          </span>
                          <span className="cursor-pointer" title="Translate">
                            <GrLanguage size={23} onClick={handleOpenWeb} />
                          </span>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <span
                              className="cursor-pointer"
                              onClick={handleCopyLink}
                              title="Copy Link"
                            >
                              {isCopied ? (
                                <LuCopyCheck size={23} /> // Show check icon after copy
                              ) : (
                                <MdContentCopy size={23} /> // Show copy icon initially
                              )}
                            </span>

                            {isCopied && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  backgroundColor: "gray",
                                  color: "white",
                                  padding: "5px 10px",
                                  borderRadius: "4px",
                                  marginTop: "5px",
                                  fontSize: "12px",
                                }}
                              >
                                Copied!
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm sm:text-lg">Want to pay Kameti? Tap Below</p>
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
                            if (
                              selectedCommittee?.kametiType == "daily" &&
                              date.getDate() === 31
                            ) {
                              return true;
                            }
                            console.log(date, view);
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
              ) : (
                <p className="text-[#ffffff] text-center pt-24 text-2xl">
                  No Kameti Found
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {showConfirmAlert && (
        <Alert
          btnloader={btnloader}
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
        autoClose={2000}
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
