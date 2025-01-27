import React, { useEffect, useState } from 'react';
import profile from '../../images/profile 1.png';
import money from '../../images/money (1) 1.png';
import total from '../../images/money 1.png';
import calender from '../../images/appointment 1.png';
import custumer from '../../images/customer 1.png';
import date from '../../images/start-date 1.png';
import axios from 'axios';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineRestartAlt } from "react-icons/md";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import WithdrawDates from '../../components/WithdrawDates/WithdrawDates';
import { TbMenu2 } from 'react-icons/tb';
import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';
import { IconButton } from '@mui/material';

export default function Create() {
  const [btnloader,setBTnloader]=useState(false)
  const [kametiHolderName, setKametiHolderName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [pricePerKameti, setPricePerKameti] = useState('');
  const [pricePerDayKameti, setPricePerDayKameti] = useState('');
  const [totalMonths, setTotalMonths] = useState('');
  const [myTotalKameties, setMyTotalKameties] = useState('');
  const [payablePerMonth, setPayablePerMonth] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [kametiType, setKametiType] = useState('monthly');
  const [withdrawDates, setWithdrawDates] = useState([]);
  const [showWithdrawDates, setShowWithdrawDates] = useState(false);

  let navigate = useNavigate();

  const handleReset = () => {
    setKametiHolderName('');
    setTotalPrice('');
    setPricePerKameti('');
    setPricePerDayKameti('');
    setTotalMonths('');
    setMyTotalKameties('');
    setPayablePerMonth('');
    setStartingDate('');
    setEndingDate('');
  };

  const fillValues = (data) => {
    console.log(data)
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const dateToTimestamp = (date) => {
    const timestamp = new Date(date).getTime();
    return timestamp;
  };

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem('token');
  const { id } = useParams();

  useEffect(() => {
    // Calculate ending date when starting date or total months change
    if (startingDate && totalMonths) {
      const startDate = new Date(startingDate);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + parseInt(totalMonths));
      setEndingDate(endDate.toISOString().split('T')[0]);
    }
  }, [startingDate, totalMonths]);

  useEffect(() => {
    // Calculate total price when price per kameti or total months changes
    if (totalPrice && totalMonths) {
      setPricePerKameti(totalPrice / totalMonths);
    } else {
      setPricePerKameti('');
    }
  }, [totalPrice, totalMonths]);

  const handleCreateCommittee = async () => {
    setBTnloader(true)
    if (parseInt(myTotalKameties) > parseInt(totalMonths)) {
      toast.error('Total kameties cannot exceed total months.');
      setBTnloader(false)
      return; // Prevent further execution
    }
    try {
      const response = await axios.post(`${apiBaseUrl}committee`, {
        kametiName: kametiHolderName,
        pricePerMonthKameti: pricePerKameti,
        pricePerDayKameti: pricePerDayKameti,
        totalPrice: totalPrice,
        myTotalKametis: myTotalKameties,
        totalMonths: totalMonths,
        startingMonth: dateToTimestamp(startingDate),
        endingMonth: dateToTimestamp(endingDate),
        kametiType: kametiType,
        myKametiWithdrawDate: withdrawDates
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response?.data);
      toast.success(response?.data?.message);
      handleReset();
      setBTnloader(false)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setBTnloader(false)
    }
  };

  const handleUpdateCommittee = async () => {
    
    try {
      const response = await axios.post(`${apiBaseUrl}committee/update`, {
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
        myKametiWithdrawDate: withdrawDates
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response?.data)
      toast.success(response?.data?.message);
      setTimeout(() => {
        navigate("/history");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      
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
        const response = await axios.post(`${apiBaseUrl}singleComm/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fillValues(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching committee:', error);
    }
  };
  const openWithdrawDatesModal = () => {
    if (myTotalKameties) {
      setShowWithdrawDates(true);
    } else {
      toast.error('Select total kameties first.');
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
    var totalMonthEntered = totalMonths!="" ? totalMonths : 0;
    setPricePerKameti(perMonthPrice / totalMonthEntered);
  };
  
  let screenwidth =window.innerWidth
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
        <div className='w-[97%] rounded-[40px] h-[95vh] flex'>
        {screenwidth> 430 && <Sidebar /> }
          <div className='sm:w-[75%] w-[100%] h-[95vh] overflow-y-scroll  pb-3 bg-maincolor sm:ml-[2px] sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px]'>
            <div className='w-[100%] flex justify-between items-center sm:h-max h-[80px] sm:p-0 p-3 sm:mt-6 border-b-[2px] border-[black]'>
            <span className='flex justify-center items-center'>
            {screenwidth < 430 && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
              >
                <TbMenu2 className='text-white text-[35px]' />
              </IconButton>
            )}
            <MobileSidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
            
              <h1 className='text-[#A87F0B]  sm:text-[25px] text-[20px] font-bold ml-3 sm:ml-10 sm:mb-6'>{id ? "Update Kameti" : "Create Kameti"}</h1></span>
              {/* <div className="mb-6 ml-[130px]">
                <label className='text-[#A87F0B] text-[19px] font-bold mr-2  '>Select Kameti Type :</label>
                <select value={kametiType} className='bg-colorinput text-[white] text-[15px] h-[40px] w-[200px] pl-2 outline-none  rounded-3xl' onChange={handleKametiTypeChange}>
                  <option value="daily">Daily Basis Kameti</option>
                  <option value="monthly">Monthly Basis Kameti</option>
                </select>
              </div> */}
              <button className='flex justify-center items-center w-[100px] h-[40px] rounded-[30px] bg-colorinput text-[white] sm:mb-6 sm:mr-10' onClick={handleReset}>
                <MdOutlineRestartAlt className='text-[white] text-[20px]' />Reset
              </button>
            </div>
            {responseMessage && <p className="text-white mt-3 w-[90%] ml-10">{responseMessage}</p>}
            <div className='w-[100%] flex items-center justify-center flex-col'>
              <div className='flex w-[91%] justify-center sm:flex-row flex-col items-center'>
                <div className='sm:w-[90%] w-[100%] flex items-center flex-col'>
                  <div className='w-[90%] sm:mt-2 mt-5 mb-2'>
                    <label className='text-[white]'>Kameti Name</label>
                  </div>
                  <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] sm:mb-5 flex items-center'>
                    <div className='w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={profile} />
                      <input type='text' placeholder='e.g. John (must be unique)' value={kametiHolderName} onChange={(e) => setKametiHolderName(e.target.value)} className='outline-none border-none text-[white] placeholder-[#CACACA] bg-colorinput w-[100%] h-[40px] pl-3' />
                    </div>
                  </div>
                </div>
         
                <div className='sm:w-[90%] w-[100%] sm:ml-10 mt-5 flex items-center flex-col'>
                  <div className='w-[90%] mt-1 mb-2'>
               
                    <label className='text-[white]'> Total Price of Kameti </label>
                  </div>
                  <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] mb-5 flex items-center'>
                    <div className='w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={total} />
                      <input type='text' placeholder='e.g 24000' value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] placeholder-[#CACACA] pl-3' />
                    </div>
                  </div>
                </div>
                
              </div>
              <div className='flex w-[100%] justify-center sm:flex-row flex-col items-center'>
              <div className='sm:w-[30%] w-[90%] flex items-center flex-col'>
              <div className='w-[84%] mt-1 mb-2'>
                <label className='text-[white]'> Total Months</label>
              </div>
              <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] sm:mb-5 flex items-center'>
                <div className='w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                  <img className='h-[25px]' src={calender} />
                  <input type='text' placeholder='e.g 12' value={totalMonths} onChange={(e) => setTotalMonths(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] pl-3 placeholder-[#CACACA]' />
                </div>
              </div>
            </div>
            
          {'\u00A0'}{'\u00A0'}
            <div className='sm:w-[30%] w-[90%] flex items-center flex-col'>
              <div className='w-[84%] sm:mt-2 mb-2'>
                <label className='text-[white]'>Price Per Month of Kameti</label>
              </div>
              <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] sm:mb-5 flex items-center'>
                <div className='w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                  <img className='h-[25px]' src={money} />
                  <input type='text'
                   readOnly 
                   placeholder='e.g 24000' 
                   value={pricePerKameti} 
                  //  onChange={(e) => setPricePerKameti(e.target.value)} 
                   className='outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-3 placeholder-[#CACACA]' 
                   />
                </div>
              </div>
            </div>
           
                {'\u00A0'}{'\u00A0'}
                <div className='sm:w-[30%] w-[90%] flex items-center flex-col'>
                  <div className='w-[84%] sm:mt-1 mb-2'>
                    <label className='text-[white]'>My Total Kameties</label>
                  </div>
                  <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] mb-5 flex items-center'>
                    <div className='w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={custumer} />
                      <input type='text' placeholder='e.g 1,2' value={myTotalKameties} onChange={(e) => setMyTotalKameties(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[90%] h-[40px] pl-3 placeholder-[#CACACA]' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex sm:w-[91%] w-[90%] justify-center sm:flex-row flex-col items-center'>
                <div className='w-[90%]  flex items-center flex-col'>
                  <div className='w-[90%] mt-2 mb-2'>
                    <label className='text-[white]'>Kameti Type</label>
                  </div>
                  <div className='rounded-[30px] h-[50px] w-[100%] mb-5 flex items-center justify-around'>
                    <div className='flex items-center'>
                      <input type='radio' value='monthly' 
                        checked={kametiType === 'monthly'}
                        onChange={handleKametiTypeChange}
                        className='outline-none border-none text-[white] placeholder-[#CACACA] bg-colorinput h-[20px] w-[20px]' 
                      />
                      <label htmlFor='monthly' className='ml-2 text-[white]'>Monthly</label>
                    </div>
                    
                    <div className='flex items-center'>
                      <input type='radio' value='daily' 
                        checked={kametiType === 'daily'}
                        onChange={handleKametiTypeChange}
                        className='outline-none border-none text-[white] placeholder-[#CACACA] bg-colorinput h-[20px] w-[20px]' 
                      />
                      <label htmlFor='daily' className='ml-2 text-[white]'>Daily</label>
                    </div>
                    
                  </div>
                </div>
                {screenwidth> 430 &&
                  <>
                {kametiType === 'daily' ?
                <div className={`sm:w-[90%] w-[100%] flex items-center flex-col ${kametiType === 'daily' ? 'opacity-1' : 'opacity-0'}  `}>
                  <div className='w-[90%] mt-1 mb-2'>
                    <label className='text-[white]'>Price Per Day of Kameti</label>
                  </div>
                  <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] sm:mb-5 flex items-center'>
                    <div className='w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={money} alt='Money Icon' />
                      <input 
                      type='text' 
                      placeholder='e.g 200' 
                      value={pricePerDayKameti} 
                      onChange={(e) => setPricePerDayKameti(e.target.value)}
                      className='outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-3 placeholder-[#CACACA]' />
                    </div>
                  </div>
                </div>
                :
                <div className={`sm:w-[90%] w-[100%] flex items-center flex-col ${kametiType === 'dsf' ? 'opacity-1' : 'opacity-0'}  `}>
                  <div className='w-[90%] mt-1 mb-2'>
                    <label className='text-[white]'>Price Per Day of Kameti</label>
                  </div>
                  <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] sm:mb-5 flex items-center'>
                    <div className='w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={money} alt='Money Icon' />
                      <input 
                      type='text' 
                      placeholder='e.g 200' 
                      value={pricePerDayKameti} 
                      onChange={(e) => setPricePerDayKameti(e.target.value)}
                      className='outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-3 placeholder-[#CACACA]' />
                    </div>
                  </div>
                </div> 
              
              }
              </>
            }
                {screenwidth< 431 &&
                <>
                 {kametiType === 'daily' &&
                <div className={`sm:w-[90%] w-[100%] flex items-center flex-col ${kametiType === 'daily' ? 'opacity-1' : 'opacity-0'}  `}>
                  <div className='w-[90%] mt-1 mb-2'>
                    <label className='text-[white]'>Price Per Day of Kameti</label>
                  </div>
                  <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] sm:mb-5 flex items-center'>
                    <div className='w-[90%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={money} alt='Money Icon' />
                      <input 
                      type='text' 
                      placeholder='e.g 200' 
                      value={pricePerDayKameti} 
                      onChange={(e) => setPricePerDayKameti(e.target.value)}
                      className='outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-3 placeholder-[#CACACA]' />
                    </div>
                  </div>
                </div>
            }
                </>
            }
              </div>
              
              <div className='flex w-[100%] justify-center sm:flex-row flex-col items-center'>
                <div className='sm:w-[30%] w-[90%] flex items-center flex-col'>
                  <div className='w-[84%] mt-1 mb-2'>
                    <label className='text-[white]'> Withdraw Dates</label>
                  </div>
                <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] sm:mb-5 flex items-center'>
                    <div className='w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={date} />
                      <button 
                        className='text-[white] outline-none border-none text-left bg-colorinput w-[100%] h-[50px] pl-2 overflow-scroll' 
                        onClick={openWithdrawDatesModal}
                      >
                        {withdrawDates.length === 0 ? "Set Withdraw Dates" : withdrawDates.filter(date => !isNaN(new Date(date).getTime())).map(date => new Date(date).toLocaleDateString()).join(', ')}
                      </button>
                  
                  {showWithdrawDates && (
                   
                    <WithdrawDates
                      counts={myTotalKameties} // Example value, replace with actual data
                      dates={withdrawDates} // Initial empty dates array
                      isCreating = {true}
                      onClose={() => setShowWithdrawDates(false)}
                      onCreate={handleSaveWithdrawDates}
                    /> 
                  )}
                  </div>
                  </div>
                </div>
                {'\u00A0'}{'\u00A0'}
                <div className='sm:w-[30%] w-[90%] flex items-center flex-col'>
                  <div className='w-[84%] sm:mt-1 mb-2'>
                    <label className='text-[white]'> Starting Date</label>
                  </div>
                  <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] sm:mb-5 flex items-center'>
                    <div className='w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={date} />
                      <input     onFocus={(e) => e.target.type = 'date'}
                      onBlur={(e) => e.target.type = 'text'} placeholder='Starting Date' value={startingDate} onChange={(e) => setStartingDate(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-2' />
                    </div>
                  </div>
                </div>
                {'\u00A0'}{'\u00A0'}
                <div className='sm:w-[30%] w-[90%] flex items-center flex-col'>
                  <div className='w-[84%] sm:mt-1 mb-2'>
                    <label className='text-[white]'>Ending Date</label>
                  </div>
                  <div className='bg-colorinput rounded-[30px] h-[50px] w-[100%] mb-5 flex items-center'>
                    <div className='w-[80%] ml-[20px] h-[45px] outline-none border-none justify-center flex items-center'>
                      <img className='h-[25px]' src={date} />
                      <input     onFocus={(e) => e.target.type = 'date'}
                      onBlur={(e) => e.target.type = 'text'} placeholder='Ending Date' value={endingDate} onChange={(e) => setEndingDate(e.target.value)} className='outline-none border-none text-[white] bg-colorinput w-[100%] h-[40px] pl-2' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[90%] mt-5 flex justify-end'>
                <button className='w-[180px] h-[50px] rounded-[30px] bg-colorinput font-bold text-[white]'>Cancel</button>
                <button className='w-[180px] h-[50px] rounded-[30px] bg-[#A87F0B] font-bold text-[black] ml-5' onClick={id ? handleUpdateCommittee : handleCreateCommittee}> {id ? (btnloader ? <ClipLoader size={20} color="#ffffff" className='mt-2' /> : "Update Kameti") :  (btnloader ? <ClipLoader size={20} color="#ffffff" className='mt-2' /> : "Create Kameti")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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