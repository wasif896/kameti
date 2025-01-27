import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import profile1 from '../../images/salman.png'
import editimg from '../../images/paymentImage/Edit.png'
import remove from '../../images/paymentImage/Remove.png'
import delete1 from '../../images/paymentImage/Folder (1).png'
import folder from '../../images/paymentImage/Medical record.png'
import support from '../../images/Support.png'
import star from '../../images/Star.png'
import avatar from '../../images/Group 661 (2).png'

import share from '../../images/Sharing.png'
import delUser from '../../images/delete-user.png'
import protection from '../../images/Protection.png'
import power from '../../images/log.png'
import noti from '../../images/Notification.png'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import Toggle from '../../components/Toggle.jsx/Toggle'
import { FaImage } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Cropper from '../../components/Cropper/Cropper'
import axios from 'axios'
import { ClipLoader, FadeLoader } from 'react-spinners'
import Share from '../ShareSocial/Share'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosInformationCircleOutline } from 'react-icons/io'
import InfoModal from '../../components/InfoModal/InfoModal'
import PhoneInput from 'react-phone-input-2';
import { TbMenu2 } from 'react-icons/tb'
import MobileSidebar from '../../components/MobileSidebar/MobileSidebar';


export default function More() {

  const [btnloader, setBTnloader] = useState(false)
  let [cropModal, setcropModal] = useState(false);
  const [profile, setProfile] = useState('');
  const [profileImage, setProfileImage] = useState('');
  let [myprflimg, setmyprflimg] = useState(null);
  const [allKametiCounts, setAllKametiCounts] = useState(0);
  const [key, setKey] = useState('');
  let [cropPrfl, setCropPrfl] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  const handleclosecropper = () => {

    setcropModal(false)
  }

  let [tempimg, settempimg] = useState(null)
  const [loading, setLoading] = useState(false);

  const getPayments = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}payment`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response);
      var dailyCommCounts = response?.data?.data?.daily_committees?.length ?? 0;
      var monthlyCommCounts = response?.data?.data?.monthly_committees?.length ?? 0;
      setAllKametiCounts(dailyCommCounts + monthlyCommCounts);
    } catch (error) {
      // console.error('Error fetching payments:', error);


    }
  };
  useEffect(() => {
    getPayments(); // Fetch payments when the component mounts
  }, []);

  let handleImageChange = (event) => {
    // profileImage
    setProfile("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setProfile(reader.result);
        setKey(key + 1)
        setcropModal(true);
      });
    } else {
      // If no file selected (e.g., user canceled cropping), clear the input field
      event.target.value = null;
    }
  };


  const navigate = useNavigate();
  let handleLogoutout = () => {
    console.log("logout")
    localStorage.removeItem("id")
    navigate("/signin")
  }
  const [logoutAlert, setLogoutAlert] = useState(false);
  const handleLogoutAlert = () => {
    setLogoutAlert(!logoutAlert)
  }
  const [edit, setEdit] = useState(false);
  const handleedit = () => {
    setEdit(!edit)
  }

  const [delAccountAlert, setDelAccountAlert] = useState(false);
  const handleDelAccountAlert = () => {
    setDelAccountAlert(!delAccountAlert)
  }
  const handleDeleteAccount = async () => {

    try {
      const response = await axios.get(
        `${apiBaseUrl}user/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      localStorage.removeItem("id")
      navigate("/signin")
    } catch (error) {
      console.error('Error deleting record:', error);
    }

  }

  

  let handleHistorydelete = () => {
    navigate("/delete")
  }
  let handleallrecords = () => {
    navigate("/allrecords")
  }
  let [name, setName] = useState("")
  let [username, setUsername] = useState("")
  let [address, setAddress] = useState("")
  let [phone, setPhone] = useState("")
  let [email, setEmail] = useState("")
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem('token');

  // console.log(tempimg)

  const base64ToFile = async (base64String, fileName) => {
    const res = await fetch(base64String);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const handleProfileUpdate = async () => {
    setBTnloader(true)
    try {
      let file;
      if (tempimg.startsWith('data:image')) {
        file = await base64ToFile(tempimg, 'profileImage.jpg');
      } else {
        file = userData?.profileUrl;
      }

      const formData = new FormData();
      formData.append('fullName', name);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('address', address);
      if (typeof file === 'string') {
        formData.append('profileUrl', file); // existing URL
      } else {
        formData.append('profileUrl', file); // new file
      }
      formData.append('phoneNumber', phone);

      // Log the FormData entries for debugging
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      const response = await axios.post(`${apiBaseUrl}users/edit-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle the response
      if (response?.data?.message) {
        toast.success(response.data.message);
        setBTnloader(false)
      } else {
        toast.success('User data updated successfully');
        setBTnloader(false)
      }
      handleedit();
      fetchUserData();
    } catch (error) {
      // Handle errors
      setBTnloader(false)
      console.error('Error details:', error);
      const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again later.';
      // alert(errorMessage);
      toast.error(errorMessage);
    }
  };






  const [userData, setUserData] = useState(null);
  // console.log(userData)
  const fetchUserData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiBaseUrl}getUser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response?.data?.data);
      settempimg(response?.data?.data.profileUrl)
      setPhone(response?.data?.data.phoneNumber)
      setEmail(response?.data?.data.email)
      setAddress(response?.data?.data.address)
      setName(response?.data?.data.fullName)
      setUsername(response?.data?.data.username)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  let [isModalOpen, setisModalOpen] = useState(false)
  let [info, setInfo] = useState(false)
  let [shareinfo, setShare] = useState(false)
  let [recordinfo, setRecordinfo] = useState(false)
  let [deleteinfo, setDeleteInfo] = useState(false)


  let handleinfoRecord = () => {
    setRecordinfo(true)
  }
  let handleinfoDelete = () => {
    setDeleteInfo(true)
  }
  let handleinfoShare = () => {
    setShare(true)
  }

  let handleopenshare = () => {
    setisModalOpen(true)
  }
  let handleopenInfo = () => {
    setInfo(true)
  }

  let handleCloseshare = () => {
    setisModalOpen(false)
    setInfo(false)
    setShare(false)
    setDeleteInfo(false)
    setRecordinfo(false)
  }
  const [delKametiCounts, setDelKametiCounts] = useState(0);
  const fetchKametees = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiBaseUrl}deletedRecords`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      var dailyCommCounts = response?.data?.data?.daily_committees?.length ?? 0;
      var monthlyCommCounts = response?.data?.data?.monthly_committees?.length ?? 0;
      setDelKametiCounts(dailyCommCounts + monthlyCommCounts);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchKametees();
  }, []);

  let screenwidth =window.innerWidth
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Cropper
        cropModal={cropModal}
        handleclosecropper={handleclosecropper}
        theimg={profile}
        myimg={myprflimg}
        setmyimg={setmyprflimg}
        setcrop={setCropPrfl}
        crop={cropPrfl}
        aspect={1 / 1}
        setReduxState={settempimg}
        isCircle={true}
      />
      <div className='w-[100%] h-[100vh] flex justify-center items-center bg-black'>
        <div className='w-[100%] rounded-[40px] h-[100vh] flex  '>
        {screenwidth> 430 && <Sidebar /> }
          {loading ? (
            <div  className="loading-screen flex justify-center items-center sm:w-[75%] w-[100%] h-[100vh] bg-[black]">
              <FadeLoader color="#A87F0B" />
            </div>
          ) : (
            <div className='sm:w-[80%] w-[100%] h-[100vh] sm:pb-3  bg-maincolor ml-[2px] sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px]'>
              <div className='w-[100%] flex justify-between items-center sm:p-0 p-3 sm:h-max h-[80px] sm:mt-6 border-b-[2px] border-[black] '>
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
                <h1 className='text-[#A87F0B] sm:text-[25px] text-[20px] ml-3 font-bold sm:ml-10 sm:mb-6'>More</h1></span>
              </div>
              <div className='w-[100%] p-1 flex justify-center items-center flex-col'>
                <div className='w-[98%] rounded-[20px] h-[120px] bg-[#343434] mt-2 flex justify-between items-center'>
                  <div className='flex justify-center items-center ml-5'>
                    <img className='sm:w-[100px] sm:h-[100px] w-[80px] h-[80px] rounded-full' src={userData?.profileUrl ? userData?.profileUrl : avatar} />
                    <div className='flex justify-center items-start flex-col sm:ml-5 ml-3'>
                      <h1 className='text-white font-bold text-[16px]'>{userData?.fullName}</h1>
                      <p className='text-[white] mt-1 mb-1 text-[12px]'>{userData?.phoneNumber}</p>
                      {userData?.email &&
                        <p className='text-[white] text-[12px]'>{userData?.email}</p>}
                      <p className='text-[white] text-[12px]'>{userData?.address}</p>

                    </div>
                  </div>
                  <div className='flex'>
                    <button onClick={handleedit} className='flex mr-5 justify-center items-center sm:w-[120px] w-[100px] h-[29px] rounded-[30px]  text-white text-[12px] bg-paytxt1'>Edit Profile {'\u00A0'}<img className='w-[15px]' src={editimg} /></button>
                    {/* <button onClick={handleDelAccountAlert} className='flex mr-5 justify-center items-center w-[120px] h-[29px] rounded-[30px]  text-white text-[12px] bg-paytxt1'>Delete Account {'\u00A0'}<img className='w-[15px]' src={remove} /></button> */}
                  </div>
                </div>
                <div className='w-[98%] rounded-[20px] sm:h-[400px] flex justify-center items-center bg-[#343434] mt-2'>
                  <div className='flex  justify-center items-center w-[100%] flex-wrap '>
                    <div className='sm:sm:w-[20%]  w-[40%] m-3 relative h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <IoIosInformationCircleOutline onClick={handleinfoRecord} className='text-[white] absolute right-2 top-2 text-[25px]' />
                      <img className='w-[30px]' onClick={handleallrecords} src={folder} />
                      <h2 className='text-white sm:text-[13px] text-[12px] mt-1' onClick={handleallrecords}>All Records ({allKametiCounts})</h2>
                    </div>
                    <div className='sm:w-[20%] w-[40%] m-3 relative  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <IoIosInformationCircleOutline onClick={handleinfoDelete} className='text-[white] absolute right-2 top-2 text-[25px]' />
                      <img className='w-[30px]' onClick={handleHistorydelete} src={delete1} />
                      <h2 className='text-white sm:text-[13px] text-[12px] mt-1' onClick={handleHistorydelete}>Deleted Records ({delKametiCounts})</h2>
                    </div>
                    <div className='sm:w-[20%] w-[40%] m-3  h-[110px] relative cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <IoIosInformationCircleOutline onClick={handleopenInfo} className='text-[white] absolute right-2 top-2 text-[25px]' />

                      <img className='w-[30px]' src={noti} />
                      <div className='flex justify-center items-center'>
                        <h2 className='text-white sm:text-[13px] text-[12px] mt-1 mr-2'>Notification</h2>
                        <Toggle />
                      </div>
                    </div>
                    <div className='sm:w-[20%] w-[40%] m-3 relative h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <IoIosInformationCircleOutline onClick={handleinfoShare} className='text-[white] absolute right-2 top-2 text-[25px]' />
                      <img className='w-[30px]' onClick={handleopenshare} src={share} />
                      <h2 className='text-white sm:text-[13px] text-[12px] mt-1' onClick={handleopenshare} >Share</h2>
                    </div>
                    <div className='sm:w-[20%] w-[40%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={protection} />
                      <h2 className='text-white sm:text-[13px] text-[12px] mt-1 '>Privacy Police</h2>
                    </div>
                    <div className='sm:w-[20%] w-[40%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={support} />
                      <h2 className='text-white sm:text-[13px] text-[12px] mt-1 '>Support</h2>
                    </div>
                    <div className='sm:w-[20%] w-[40%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={star} />
                      <h2 className='text-white sm:text-[13px] text-[12px] mt-1'>Rate us</h2>
                    </div>
                    <div onClick={handleDelAccountAlert} className='sm:w-[20%] w-[40%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <img className='w-[40px]' src={delUser} />
                      <h2 className='text-white sm:text-[13px] text-[12px] mt-1 '>Delete Account</h2>
                    </div>
                    <div onClick={handleLogoutAlert} className='sm:w-[20%] w-[40%] m-3  h-[110px] cursor-pointer rounded-[20px]  bg-[#444343] flex justify-center items-center flex-col'>
                      <img className='w-[30px]' src={power} />
                      <h2 className='text-white sm:text-[13px] text-[12px] mt-1 '>Logout</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal open={logoutAlert} onClose={handleLogoutAlert}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
           maxWidth:"430px",
            width: "90%",
            bgcolor: '#373737',
            color: "white",
            outline: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h7" component="h2" >
            Are you sure you want to logout this account?
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <button className='bg-[#4B5563] text-white mr-5 h-[35px] rounded-md w-[100px]' onClick={handleLogoutAlert}>
              No
            </button>
            <button className='bg-[#A87F0B] h-[35px] rounded-md w-[100px]' onClick={() => { return handleLogoutout() }} >
              Yes
            </button>
          </Box>
        </Box>
      </Modal>

      <Modal open={delAccountAlert} onClose={handleDelAccountAlert}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth:"430px",
            width: "90%",
            bgcolor: '#373737',
            color: "white",
            outline: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h7" component="h2" >
            Are you sure you want to parmanently delete this account?
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <button className='bg-[#4B5563] text-white mr-5 h-[35px] rounded-md w-[100px]' onClick={handleDelAccountAlert}>
              No
            </button>
            <button className='bg-[#A87F0B] h-[35px] rounded-md w-[100px]' onClick={() => { return handleDeleteAccount() }} >
              Yes
            </button>
          </Box>
        </Box>
      </Modal>

      


      <Modal open={edit} onClose={handleedit}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth:"430px",
            width: "90%",
            bgcolor: '#373737',
            color: "white",
            outline: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className='flex justify-center flex-col items-center w-[100%]'>
            <div className='flex w-[100%]'>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-[#A87F0B] font-[600]'>Edit Profile</p>
                <div onClick={handleedit} className='flex justify-center items-center w-[25px] h-[25px] rounded-full bg-[#747474]'>
                  <IoClose />
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center flex-col mt-5 w-[100%]'>
              <div className='h-[120px] w-[120px] border rounded-full absolute  top-[50px] '>

                <label htmlFor="img" className='w-[0px] h-[0px] absolute top-[95px] left-[86px]'>
                  <div className=' border rounded-full w-[20px] h-[20px] flex justify-center items-center text-sm font-[1500] text-white bg-blue-400' >+</div>
                  <input key={key} type="file" name="img" id='img' className='opacity-0 w-[0px] h-[0px]' onChange={handleImageChange} />

                </label>
                <img src={tempimg ? tempimg : avatar} className='rounded-full w-[120px] h-[120px]' />
              </div>
              <div className='flex justify-center flex-col mt-[90px] items-center w-[100%]'>
                <input type='text' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#191717] text-[#FFFFFF]' />
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#191717] text-[#FFFFFF]' />
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#191717] text-[#FFFFFF]' />
                
                {/* <input type='text' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#333333] text-[#FFFFFF]' /> */}
                
                <div className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#191717] text-[#FFFFFF] flex items-center'>
  <PhoneInput
    country={'us'}
    value={phone}
    onChange={setPhone}
    inputStyle={{
      background: '#191717',
      color: '#FFFFFF',
      border: 'none',
      width: '100%',
      height: '100%'
    }}
    buttonStyle={{
      background: '#191717',
      border: 'none'
    }}
    containerStyle={{
      width: '100%'
    }}
    dropdownStyle={{
      background: '#191717',
      color: '#FFFFFF'
    }}
  />
</div>


                <input type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#191717] text-[#FFFFFF]' />
                <div className='flex justify-center mt-5 items-center w-[100%]'>
                  <button
                    onClick={handleedit}
                    className="bg-[#4B5563] text-white py-2 px-4 w-[120px] h-[35px] flex justify-center items-center rounded-3xl mr-2  transition duration-200"
                  >
                    Cancel
                  </button>
                  <button onClick={handleProfileUpdate}
                    className="bg-[#A87F0B] text-white py-2 px-4 w-[120px] h-[35px] flex justify-center items-center rounded-3xl  transition duration-200"
                  >
                    {btnloader ? <div cla><ClipLoader size={20} color="#181818" className='mt-2' /></div> : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={isModalOpen}
        onClose={handleCloseshare}
        aria-labelledby="image-modal"
        aria-describedby="image-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth:"430px",
            width: "90%",
            bgcolor: '#373737',
            borderRadius: '10px',
          
            outline: 'none',
            boxShadow: 24,
            maxHeight: "600px",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <div className='flex justify-end w-[90%] mt-3'>
            <div onClick={handleCloseshare} className='flex justify-center items-center border border-[#E5D6C5] w-[25px] h-[25px] rounded-[50%]'>
              <IoClose className='text-[white]' />
            </div>
          </div>
          <div className="flex justify-center items-center mt-2 w-[100%]">
            <Share />

          </div>
          <br></br>
        </Box>
      </Modal>
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


      <InfoModal info={info} handleCloseshare={handleCloseshare} message="Trigger a reminder when it's your scheduled date to pay the kameti." />
      <InfoModal info={shareinfo} handleCloseshare={handleCloseshare} message="Share this kameti app with your friends to benefit from its features." />
      <InfoModal info={deleteinfo} handleCloseshare={handleCloseshare} message="Delete all historical kameti records." />
      <InfoModal info={recordinfo} handleCloseshare={handleCloseshare} message="Complete records of your kameti." />

    </>
  )
}
