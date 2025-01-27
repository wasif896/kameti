import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import money from '../../images/Moneypay.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../PaymentPage/Payment.css';
import calander from '../../images/appointment 1.png'
import check from '../../images/Checkmark.png'
import bank from '../../images/paymentImage/banknotes 2.png'
import lastdate from '../../images/paymentImage/calendar 2.png'
import cash from '../../images/paymentImage/cash-payment 1.png'
import startdate from '../../images/paymentImage/january 1.png'
import box from '../../images/paymentImage/safe-box 2.png'
import payday1 from '../../images/paymentImage/Payday.png'
import thirty from '../../images/paymentImage/thirty-one 1.png'
import calender2 from '../../images/paymentImage/payday 1.png'
import money1 from '../../images/paymentImage/money (1) 2.png'
import money2 from '../../images/paymentImage/money 2.png'
import Alert from '../../components/Alert/Alert';
import { MdOutlineRestartAlt } from "react-icons/md";

import axios from 'axios';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { FadeLoader, HashLoader } from 'react-spinners';
import { IconButton } from '@mui/material';
import { TbMenu2 } from 'react-icons/tb';

import WithdrawDates from '../../components/WithdrawDates/WithdrawDates';



export default function Payment() {
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem('token');
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [kametiType, setKametiType] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawModalProps, setWithdrawModalProps] = useState({ counts: 0, dates: [] });
  // const kametiId = 27185;
  const { kametiId } = useParams();

  const openWithdrawModal = (counts, dates) => {
    setWithdrawModalProps({ counts, dates });
    setShowWithdrawModal(true);
  };

  // console.log(filteredPayments)
  const fetchKametis = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}singleComm/${kametiId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      let kametees;
      setSelectedCommittee(response?.data?.data);
      kametees = response?.data?.data;
      // setFilteredPayments(kametees?.payments);


      if (kametees?.kametiType === 'daily') {
        console.log(kametees?.payments?.paidKametiResponse);
        const allPaidKametis = kametees?.payments?.paidKametiResponse?.flatMap(item => item.paidkametis) ?? [];
        // console.log(allPaidKametis);
        // Update the filteredPayments state
        setFilteredPayments(allPaidKametis);


      }
      else {
        console.log(kametees?.payments?.paidKametiResponse);
        console.log(kametees?.payments?.paidKametiResponse[0]?.paidkametis ?? []);

        var paidKametiResp = kametees?.payments?.paidKametiResponse;
        paidKametiResp.length == 0 ?
          setFilteredPayments([]) :
          setFilteredPayments(kametees?.payments?.paidKametiResponse[0]?.paidkametis ?? []);


      }


      setLoading(false);
    } catch (error) {
      if(error?.response?.status == 404)
      {
        setSelectedCommittee([]);
      }
      setLoading(false);
      // console.error('Error fetching data:', error?.response?.status);
    }
  };
  // const fetchPayments = async (kametiId, type) => {
  //   try {
  //     const response = await axios.get(`${apiBaseUrl}paymentsByKametiId/${kametiId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     console.log(type);
  //     if (type === 'daily') {
  //       console.log(response?.data?.data?.paidKametiResponse);
  //       const allPaidKametis = response?.data?.data?.paidKametiResponse?.flatMap(item => item.paidkametis) ?? [];
  //       // console.log(allPaidKametis);
  //       // Update the filteredPayments state
  //       setFilteredPayments(allPaidKametis);


  //     }
  //     else {
  //       console.log(response?.data?.data);
  //       console.log(response?.data?.data?.paidKametiResponse[0]?.paidkametis ?? []);

  //       var paidKametiResp = response?.data?.data?.paidKametiResponse;
  //       paidKametiResp.length == 0 ?
  //         setFilteredPayments([]) :
  //         setFilteredPayments(response?.data?.data?.paidKametiResponse[0]?.paidkametis ?? []);


  //     }

  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // const handlePayCommittee = async (status) => {
  //   if (status === "pay" && selectedRow.date == null) {
  //     toast.error("date not selected");
  //   }
  //   else {
  //     try {
  //       console.log(selectedRow);
  //       console.log(selectedCommittee?.id);
  //       console.log(status);
  //       const response = await axios.post(`${apiBaseUrl}payCommittee`, {
  //         committeeID: selectedCommittee?.id,
  //         status: status === "pay" ? "paid" : "Unpaid",
  //         price: selectedRow.amount,
  //         date: dateToTimestamp(selectedRow.date),
  //         payment_id: status === "unpay" ? selectedRow.paymentId : null

  //       }, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }).then((response) => {
  //         console.log(response);
  //         setSelectedCommittee(prevCommittee => ({
  //           ...prevCommittee,
  //           paidAmount: prevCommittee.paidAmount + selectedRow.amount,
  //           remainingAmount: prevCommittee.remainingAmount - selectedRow.amount
  //         }));
  //         fetchKametis(selectedCommittee?.kametiType);
  //       });
  //     } catch (error) {
  //       toast.error(error?.response?.data?.message);
  //     }
  //   }
  //   setShowConfirmAlert(false);
  // }
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  const dateToTimestamp = (date) => {
    const timestamp = new Date(date).getTime();
    return timestamp;
  };

  // const handleAlertCancel = () => {
  //   setShowConfirmAlert(false); // Hide the confirm alert
  // };
  useEffect(() => {
    fetchKametis(kametiType);
  }, [kametiType]);

  // useEffect(() => {
  //   if (selectedCommittee) {

  //     // const filtered = selectedCommittee?.payments?.filter(payment => {
  //     //   // Convert ase kall properties to lowercase for case-insensitive search
  //     //   const paymentValues = Object.values(payment).map(value => value.toString().toLowerCase());
  //     //   // Check if any property includes the search query
  //     //   return paymentValues.some(value => value.includes(searchQuery.toLowerCase()));
  //     // });
  //     setFilteredPayments(selectedCommittee?.payments);
  //   }
  // }, [selectedCommittee]);

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




  const [date, setDate] = useState(new Date());
  const [highlightedDatesMap, setHighlightedDatesMap] = useState({});
  const [highlightedDates, setHighlightedDates] = useState({ dates: [], committeeId: null });
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
      const newMonths = getMonthsInRange(selectedCommittee?.startingMonth, selectedCommittee?.endingMonth);
      setMonths(newMonths);

      // Reset calendar to the starting month of the selected committee
      setDate(new Date(selectedCommittee?.startingMonth));

      // Force calendar to re-render by changing key
      setCalendarKey(prevKey => prevKey + 1);
    }
  }, [selectedCommittee?.id]);

  useEffect(() => {
    if (selectedCommittee?.id) {
      if (filteredPayments?.length > 0) {
        const paymentDates = filteredPayments.map(payment => new Date(payment.date));

        setHighlightedDatesMap(prevMap => ({
          ...prevMap,
          [selectedCommittee.id]: paymentDates,
        }));

        setHighlightedDates({
          dates: paymentDates,
          committeeId: selectedCommittee.id
        });
      } else {
        setHighlightedDatesMap(prevMap => ({
          ...prevMap,
          [selectedCommittee.id]: [],
        }));

        setHighlightedDates({
          dates: [],
          committeeId: selectedCommittee.id
        });
      }
    }
  }, [filteredPayments, selectedCommittee]);

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
        committeeId: selectedCommittee?.id
      });
    } else {
      setHighlightedDates({ dates: [], committeeId: selectedCommittee?.id });
    }
  }, [selectedCommittee, highlightedDatesMap]);

  const minDate = new Date(Math.min(...months));
  const maxDate = new Date(Math.max(...months));

  const handleDateClick = (value) => {
    console.log(value);
    const clickedDate = value.toDateString();
    const clickedMonth = value.getMonth();
    const clickedYear = value.getFullYear();

    const payment = filteredPayments.find(p => {
      const paymentDate = new Date(p.date);
      return paymentDate.toDateString() === clickedDate;
    });

    if (payment) {
      // Show payment details
      if (selectedCommittee?.kametiType == "daily") {
        var price = selectedCommittee?.pricePerDayKameti * selectedCommittee?.myTotalKametis;
      }
      else {
        var price = selectedCommittee?.pricePerMonthKameti * selectedCommittee?.myTotalKametis;
      }
      setPaymentDetails({
        date: payment.date,
        price: price,
      });
      setModalVisible(true);
    } 
  };


  const [rows, setRows] = useState([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  return (
    <>
      <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
        <div className='w-[97%] rounded-[40px] h-[95vh] flex  '>
        {/* {screenwidth> 430 && <Sidebar /> } */}
          {loading ? (
            <div className="loading-screen flex justify-center items-center sm:w-[100%] w-[100%] h-[100vh] bg-[black]">
              <FadeLoader color="#A87F0B" />
            </div>
          ) : (
            <div className='sm:w-[100%] w-[100%] h-[95vh] overflow-y-scroll sm:pb-3 bg-maincolor ml-[2px]  sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px] '>
              <div className='w-[100%] flex justify-between items-center h-[80px] sm:p-0 p-3 sm:mt-6 border-b-[2px] border-[black] '>
              <span className='flex justify-center items-center'>
             <h1 className='text-[#A87F0B] sm:text-[25px] text-[20px] font-bold sm:ml-10 ml-3 sm:mb-6'>Kameti Details</h1> </span>

              </div>
              {selectedCommittee?.length === 0 ? (
                          <div className='w-[100%] flex text-white justify-center items-center'>No kameti Found</div>)
                        :
             ( <div className='w-[100%] flex  flex-col sm:flex-row justify-center items-center'>
                <div className=' order-2 lg:order-1 sm:w-[75%] w-[100%] pl-1 pr-1 flex justify-center items-center flex-col'>
                  <div className='w-[98%]  mt-2  rounded-[20px] items-center hidden sm:flex justify-between  h-[100px] bg-sidebar '>
                    <div className='w-[50%] ml-5 flex justify-start  flex-col'>
                      <p className='text-gray-200 font-bold'>{selectedCommittee?.kametiName}</p>
                      <h1 className='text-yellow-600 font-bold text-[30px]' >Rs.  {Number(selectedCommittee?.totalPrice).toLocaleString()}</h1>
                      <p className='text-gray-200 text-[12px]'></p>
                    </div>

                  </div>
                 
                  <div className='w-[98%] h-[350px] overflow-y-scroll mt-2 rounded-[20px] items-center  flex flex-col  bg-sidebar'>


                    <div className='w-[100%] flex flex-col items-center'>
                      <div className='w-[98%] h-[350px] overflow-y-scroll mt-2 rounded-[20px] bg-sidebar'>
                        <Calendar
                          key={calendarKey}
                          ref={calendarRef}
                          onChange={setDate}
                          value={date}
                          tileClassName={({ date }) => {
                            if (highlightedDates.committeeId === selectedCommittee?.id && highlightedDates.dates.some(d => d.toDateString() === date.toDateString())) {
                              return 'highlighted'; // Return a custom class name
                            }
                            return null;
                          }}

                          onClickDay={handleDateClick}
                          minDate={minDate}
                          maxDate={maxDate}
                          view='month'
                        />
                      </div>
                    </div>

                    {modalVisible && paymentDetails && (
                      <div className="fixed inset-0 bg-[#373737] bg-opacity-50  flex justify-center items-center text-white">
                        <div className="bg-[#373737] p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">

                          <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                          <p className="mb-2">Kameti Date: {new Date(paymentDetails.date).toLocaleDateString()}</p>
                          <p className="mb-4">Kameti Price: {paymentDetails.price}</p>
                          <p className="mb-4">Kameti Status: Paid</p>
                          <button
                            onClick={() => setModalVisible(false)}
                            className=" right-4 bg-[#a87f0b] text-black py-1 px-5 rounded-[30px]"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    <br></br>
                  </div>
                </div>
                <div className='sm:w-[30%] order-1 lg:order-2 w-[96%] sm:mr-2 sm:h-[457px] flex flex-col items-center m-0 mt-2 bg-sidebar rounded-[20px]'>
                <div className='w-[98%]  mt-2  rounded-[20px] items-center lg:hidden flex justify-between  h-[100px] bg-sidebar '>
                    <div className='w-[50%] ml-5 flex justify-start  flex-col'>
                      <p className='text-gray-200 font-bold'>{selectedCommittee?.kametiName}</p>
                      <h1 className='text-yellow-600 font-bold text-[30px]' >Rs.  {Number(selectedCommittee?.totalPrice).toLocaleString()}</h1>
                      <p className='text-gray-200 text-[12px]'></p>
                    </div>

                  </div>
                  <div className='w-[95%] flex justify-evenly overflow-y-auto  mt-2  flex-wrap '>
                    <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[50px]' src={bank} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Price Per Month</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.pricePerMonthKameti).toLocaleString()}</h1>
                    </div>
                    {
                      selectedCommittee?.kametiType == "daily" && (
                        <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                          <img className='w-[50px]' src={bank} />
                          <h2 className='text-paytxt text-[10px] mt-1'>Price Per Day</h2>
                          <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.pricePerDayKameti).toLocaleString()}</h1>
                        </div>
                      )}
                    <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[50px]' src={money2} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Total Price(All)</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.totalPrice).toLocaleString()}</h1>
                    </div>
                    <div className='w-[43%] h-[100px]  rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[50px]' src={box} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Your kameti</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.myTotalKametis}</h1>
                    </div>
                    <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[40px]' src={lastdate} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Total Month</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{selectedCommittee?.totalMonths}</h1>
                    </div>
                    <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[40px]' src={payday1} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Payable per Month</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.pricePerMonthKameti * selectedCommittee?.myTotalKametis).toLocaleString()}</h1>
                    </div>
                    <div className='w-[43%] h-[100px]  rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[40px]' src={money1} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Paid Amount</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.paidAmount).toLocaleString()}</h1>
                    </div>
                    <div className='w-[43%] h-[100px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[40px]' src={cash} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Remaining Amount</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{Number(selectedCommittee?.remainingAmount).toLocaleString()}</h1>
                    </div>
                    <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[40px]' src={startdate} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Starting Date</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{formatDate(selectedCommittee?.startingMonth)}</h1>
                    </div>
                    <div className='w-[43%] h-[100px] rounded-[20px] mb-2 bg-colorinput flex justify-center items-center flex-col'>
                      <img className='w-[40px]' src={startdate} />
                      <h2 className='text-paytxt text-[10px] mt-1'>Ending Date</h2>
                      <h1 className='text-paytxt text-[16px] font-bold'>{formatDate(selectedCommittee?.endingMonth)}</h1>
                    </div>
                    <div className='m-1 h-[90px] rounded-[20px] bg-colorinput flex justify-center items-center flex-col w-[100%]'>
                      <div className='flex cursor-pointer items-center justify-center flex-col '>
                        <img className='w-[30px] ' src={calander} />
                        <h2 className='text-paytxt text-[12px] mt-1 '>Withdraw Date </h2>
                      </div>
                    
                        <button onClick={() => {

                          openWithdrawModal(selectedCommittee?.myTotalKametis, selectedCommittee?.withdraw);
                        }} className='w-[70px] h-[22px] rounded-[20px] text-paytxt text-[11px]  bg-maincolor ' >View Date</button>
                    </div>
                  </div>
                </div>

              </div>)
              
            }
            </div>
            
            )}
        </div>
      </div>
      {showWithdrawModal && (
          <WithdrawDates
            counts={withdrawModalProps.counts}
            dates={withdrawModalProps.dates}
            committeeId={kametiId}
            onClose={() => setShowWithdrawModal(false)}
            getPayments={[]}
            accessFrom = "live"
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



  )
}
