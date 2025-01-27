import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import profile1 from "../../images/salman.png";
import editimg from "../../images/paymentImage/editProfile.png";
import remove from "../../images/paymentImage/Remove.png";
import delete1 from "../../images/paymentImage/deleteRecord.png";
import folder from "../../images/paymentImage/allRecord.png";
import PrivacyPolicy from "../../images/privacyPolicy.png";
import needHelp from "../../images/needHelp.png";
import rateUs from "../../images/rateUs.png";
import shareLink from "../../images/shareLink.png";
import logout from "../../images/logout.png";

import support from "../../images/Support.png";
import star from "../../images/Star.png";
import avatar from "../../images/Group 661 (2).png";

import share from "../../images/Sharing.png";
import delUser from "../../images/delete-user.png";
import protection from "../../images/Protection.png";
import power from "../../images/log.png";
import noti from "../../images/Notification.png";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import Toggle from "../../components/Toggle.jsx/Toggle";
import { FaImage } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Cropper from "../../components/Cropper/Cropper";
import axios from "axios";
import { ClipLoader, FadeLoader } from "react-spinners";
import Share from "../ShareSocial/Share";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import InfoModal from "../../components/InfoModal/InfoModal";
import PhoneInput from "react-phone-input-2";
import { TbMenu2 } from "react-icons/tb";
import more from "../../images/more2.png";

import { MdModeEditOutline } from "react-icons/md";

import MobileSidebar from "../../components/MobileSidebar/MobileSidebar";

export default function More() {
  const [btnloader, setBTnloader] = useState(false);
  let [cropModal, setcropModal] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileImage, setProfileImage] = useState("");
  let [myprflimg, setmyprflimg] = useState(null);
  const [allKametiCounts, setAllKametiCounts] = useState(0);
  const [key, setKey] = useState("");
  let [cropPrfl, setCropPrfl] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  const handleclosecropper = () => {
    setcropModal(false);
  };

  let [tempimg, settempimg] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPayments = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}payment`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      var dailyCommCounts = response?.data?.data?.daily_committees?.length ?? 0;
      var monthlyCommCounts =
        response?.data?.data?.monthly_committees?.length ?? 0;
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
        setKey(key + 1);
        setcropModal(true);
      });
    } else {
      // If no file selected (e.g., user canceled cropping), clear the input field
      event.target.value = null;
    }
  };

  const navigate = useNavigate();
  let handleLogoutout = () => {
    console.log("logout");
    localStorage.removeItem("id");
    navigate("/signin");
  };
  const [logoutAlert, setLogoutAlert] = useState(false);
  const handleLogoutAlert = () => {
    setLogoutAlert(!logoutAlert);
  };
  const [edit, setEdit] = useState(false);
  const handleedit = () => {
    setEdit(!edit);
  };

  const [delAccountAlert, setDelAccountAlert] = useState(false);
  const handleDelAccountAlert = () => {
    setDelAccountAlert(!delAccountAlert);
  };
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}user/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("id");
      navigate("/signin");
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  let handleHistorydelete = () => {
    navigate("/delete");
  };
  let handleallrecords = () => {
    navigate("/allrecords");
  };
  let privacyPolicy = () => {
    // Opening the external link in a new tab
    window.open(
      "https://avicennaenterpse.blogspot.com/2020/09/kameti.html?m=1",
      "_blank"
    );
  };

  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [tempUsername, setTempUsername] = useState("");
  let [tempPhone, setTempPhone] = useState("");

  setTempPhone;
  let [address, setAddress] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("token");

  // console.log(tempimg)

  const base64ToFile = async (base64String, fileName) => {
    const res = await fetch(base64String);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const [isToggled, setIsToggled] = useState(false); // Track toggle state

  const handleProfileUpdate = async (newValue,isToggleAction = false) => {
    const successToastId = "profileUpdateSuccessToast"; // Unique ID for success toast
    const errorToastId = "profileUpdateErrorToast"; // Unique ID for error toast
  
    try {
      let file;
      if (tempimg.startsWith("data:image")) {
        file = await base64ToFile(tempimg, "profileImage.jpg");
      } else {
        file = userData?.profileUrl;
      }
  
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("id", userData.id);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("phoneNumber", phone);
  
      // Conditionally add or remove the fcmtoken
      if (newValue) {
        console.log(newValue)
        formData.append("fcmtoken", 'abcd'); // Add fcmtoken if toggle is on
      } else {
        formData.append("fcmtoken", ''); // Optionally send a flag to remove the token
      }
  
      if (typeof file === "string") {
        formData.append("profileUrl", file); // existing URL
      } else {
        formData.append("profileUrl", file); // new file
      }
  
      const response = await axios.post(
        `${apiBaseUrl}users/edit-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (!isToggleAction) { 
        if (!toast.isActive(successToastId)) {
          const successMessage =
            response?.data?.message || "User data updated successfully";
          toast.success(successMessage, { toastId: successToastId });
        }
      }
      
      
  
      fetchUserData(); // Refresh user data after update
    } catch (error) {
      console.error("Error details:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred. Please try again later.";
  
      if (!toast.isActive(errorToastId)) {
        toast.error(errorMessage, { toastId: errorToastId });
      }
    } finally {
      setBTnloader(false);
    }
  };

  const [userData, setUserData] = useState(null);
  // console.log(userData)
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setUserData(response?.data?.data);
      settempimg(response?.data?.data.profileUrl);
      setPhone(response?.data?.data.phoneNumber);
      setTempPhone(response?.data?.data.username);
      setEmail(response?.data?.data.email);
      setAddress(response?.data?.data.address);
      setName(response?.data?.data.fullName);
      setUsername(response?.data?.data.username);
      setTempUsername(response?.data?.data.username);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  let [isModalOpen, setisModalOpen] = useState(false);
  let [info, setInfo] = useState(false);
  let [shareinfo, setShare] = useState(false);
  let [recordinfo, setRecordinfo] = useState(false);
  let [deleteinfo, setDeleteInfo] = useState(false);

  let handleinfoRecord = () => {
    setRecordinfo(true);
  };
  let handleinfoDelete = () => {
    setDeleteInfo(true);
  };
  let handleinfoShare = () => {
    setShare(true);
  };

  let handleopenshare = () => {
    setisModalOpen(true);
  };
  let handleopenInfo = () => {
    setInfo(true);
  };

  let handleCloseshare = () => {
    setisModalOpen(false);
    setInfo(false);
    setShare(false);
    setDeleteInfo(false);
    setRecordinfo(false);
  };
  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        // Get the current base URL
        const baseUrl = window.location.origin;

        await navigator.share({
          title: "Share Kameti Link",
          text: "Check out this Kameti link:",
          url: baseUrl, // Use the current base URL
        });

        console.log("Link shared successfully!");
      } catch (error) {
        console.error("Error sharing link:", error);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  const [delKametiCounts, setDelKametiCounts] = useState(0);
  const fetchKametees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}deletedRecords`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      var dailyCommCounts = response?.data?.data?.daily_committees?.length ?? 0;
      var monthlyCommCounts =
        response?.data?.data?.monthly_committees?.length ?? 0;
      setDelKametiCounts(dailyCommCounts + monthlyCommCounts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchKametees();
  }, []);

  let screenwidth = window.innerWidth;
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
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-black">
        <div className="w-[100%] rounded-[40px] h-[100vh] flex  ">
          {screenwidth > 430 && <Sidebar />}
          {loading ? (
            <div className="loading-screen flex justify-center items-center sm:w-[75%] w-[100%] h-[100vh] bg-[black]">
              <FadeLoader color="#A87F0B" />
            </div>
          ) : (
            <div className="sm:w-[80%] w-[100%] h-[100vh] sm:pb-3 ml-[2px] sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px]">
             <div className="w-[100%] flex justify-between items-center sm:p-0 p-3 sm:h-max h-[80px] sm:mt-6 border-b-[1px] border-[#535353]">
  <span className="flex justify-center items-center w-full">
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
    
    {/* Centered h1 in small screens */}
    <h1 className="text-white sm:text-[25px] text-[20px] font-bold flex items-center justify-center sm:ml-5 sm:mb-6 w-full">
      <img
        className="hidden sm:block w-[40px] mr-3"
        src={more}
        alt="More Icon"
      />
      Setting
    </h1>
  </span>
</div>

              <div className="w-[100%] p-1 flex justify-center items-center flex-col">
                <div className="w-[100%] sm:w-[90%] rounded-[10px] sm:rounded-[35px] h-[120px] bg-[#343434] mt-6 flex justify-between items-center">
                  <div className="flex justify-center items-center ml-5">
                    <img
                      className="sm:w-[90px] sm:h-[90px] w-[80px] h-[80px] rounded-full"
                      src={userData?.profileUrl ? userData?.profileUrl : avatar}
                    />
                    <div className="flex justify-center items-start flex-col sm:ml-5 ml-3">
                      <h1 className="text-white font-bold text-[16px]">
                        {userData?.fullName}
                      </h1>
                      <p className="text-[white] mt-1 mb-1 text-[12px]">
                        {userData?.phoneNumber}
                      </p>
                      {userData?.email && (
                        <p className="text-[white] text-[12px]">
                          {userData?.email}
                        </p>
                      )}
                      <p className="text-[white] text-[12px]">
                        {userData?.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {/* Button visible only on screens larger than mobile */}
                    <button
                      onClick={handleedit}
                      style={{
                        boxShadow: "-4.2px 5.88px 7.22px 0px #00000038 inset",
                      }}
                      className="hidden sm:flex mr-5 justify-center items-center sm:w-[130px] w-[100px] h-[38px] rounded-[30px] hover:bg-gray-700  text-white text-[13px] bg-[#626262] shadow-custom-inset"
                    >
                      <img className="w-[15px]" src={editimg} />
                      {"\u00A0"}Edit Profile
                    </button>

                    {/* Image visible only on mobile */}
                    <img
                      className="block sm:hidden w-[20px] mr-[25px] sm:w-[35px]"
                      src={editimg}
                      alt="Edit Icon"
                      onClick={handleedit}
                    />
                  </div>
                </div>
                <div className="w-[100%] sm:w-[90%] rounded-[10px] sm:rounded-[35px] sm:h-[370px] flex justify-center items-center bg-[#343434] mt-4">
                  <div className="flex  items-center w-[100%] flex-wrap pl-[6px] sm:pl-[30px]">
                    <div
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      onClick={handleallrecords}
                      className="sm:sm:w-[17%] w-[42%] m-3 relative h-[130px] sm:h-[150px] cursor-pointer rounded-[18px] bg-[#444343] flex justify-center items-center flex-col"
                    >
                      <IoIosInformationCircleOutline
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click event from propagating to the parent
                          handleinfoRecord(); // Call the handler for the icon click
                        }}
                        className="text-[white] absolute right-2 top-2 text-[25px]"
                      />
                      <img className="w-[40px] sm:w-[45px]" src={folder} />
                      <h2 className="text-white sm:text-[13px] text-[12px] mt-1">
                        All Records ({allKametiCounts})
                      </h2>
                    </div>

                    <div
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      onClick={handleHistorydelete}
                      className="sm:sm:w-[17%] w-[42%] m-3 relative h-[130px] sm:h-[150px] cursor-pointer rounded-[18px] bg-[#444343] flex justify-center items-center flex-col"
                    >
                      <IoIosInformationCircleOutline
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click event from propagating to the parent
                          handleinfoDelete(); // Handle the icon click
                        }}
                        className="text-[white] absolute right-2 top-2 text-[25px]"
                      />

                      <img className="w-[40px] sm:w-[45px]" src={delete1} />
                      <h2 className="text-white sm:text-[13px] text-[12px] mt-1">
                        Deleted Records ({delKametiCounts})
                      </h2>
                    </div>

                    {/* <div
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      className="sm:sm:w-[17%]  w-[40%] m-3 relative  h-[130px] sm:h-[150px] cursor-pointer rounded-[18px]  bg-[#444343] flex justify-center items-center flex-col"
                    >
                      <img
                        className="w-[45px]"
                        onClick={handleallrecords}
                        src={folder}
                      />
                      <h2
                        className="text-white sm:text-[13px] text-[12px] mt-1"
                        onClick={handleallrecords}
                      >
                        Change Password{" "}
                      </h2>
                    </div> */}
                    <div
                      onClick={privacyPolicy}
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      className="sm:sm:w-[17%]  w-[42%] m-3 relative  h-[130px] sm:h-[150px] cursor-pointer rounded-[18px]  bg-[#444343] flex justify-center items-center flex-col"
                    >
                      <img
                        className="w-[25px] sm:w-[30px]"
                        src={PrivacyPolicy}
                      />
                      <h2 className="text-white sm:text-[13px] text-[12px] mt-1 ">
                        Privacy Police
                      </h2>
                    </div>

                    <div
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      className="sm:sm:w-[17%]  w-[42%] m-3 relative  h-[130px] sm:h-[150px] cursor-pointer rounded-[18px]  bg-[#444343] flex justify-center items-center flex-col"
                    >
                      <img className="w-[38px] sm:w-[43px]" src={needHelp} />

                      <h2 className="text-white sm:text-[13px] text-[12px] mt-1">
                        Need help ?
                      </h2>
                    </div>
                    <div
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      className="sm:sm:w-[17%]  w-[42%] m-3 relative  h-[130px] sm:h-[150px] cursor-pointer rounded-[18px]  bg-[#444343] flex justify-center items-center flex-col"
                    >
                      <img className="w-[35px] sm:w-[40px]" src={rateUs} />

                      <h2 className="text-white sm:text-[13px] text-[12px] mt-1">
                        Rate Us
                      </h2>
                    </div>
                    <div
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      onClick={handleShareLink}
                      className="sm:sm:w-[17%]  w-[42%] m-3 relative  h-[130px] sm:h-[150px] cursor-pointer rounded-[18px]  bg-[#444343] flex justify-center items-center flex-col"
                    >
                      <IoIosInformationCircleOutline
                        onClick={handleinfoShare}
                        className="text-[white] absolute right-2 top-2 text-[25px]"
                      />
                      <img className="w-[25px] sm:w-[30px]" src={shareLink} />
                      <h2 className="text-white sm:text-[13px] text-[12px] mt-1">
                        Share App Link
                      </h2>
                    </div>
                    <div
                      onClick={handleDelAccountAlert}
                      v
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      className="sm:sm:w-[17%]  w-[42%] m-3 relative  h-[130px] sm:h-[150px] cursor-pointer rounded-[18px]  bg-[#444343] flex justify-center items-center flex-col"
                    >
                      <img className="w-[40px] sm:w-[45px]" src={delete1} />

                      <h2 className="text-white sm:text-[13px] text-[12px] mt-1 ">
                        Delete Account
                      </h2>
                    </div>
                    {/* <div className="sm:sm:w-[17%]  w-[40%] m-3 relative  h-[130px] sm:h-[150px] cursor-pointer rounded-[18px] flex justify-center items-center flex-col">
                      <div className=" justify-center items-center">
                        <Toggle />

                        <h2 className="text-white sm:text-[13px] text-[12px] mt-1 mr-2">
                          Remove Ads
                        </h2>
                        <p className="text-[8px] text-[#FFFFFF66]">
                          Help cover the server and maintenance cost associate
                          with your account by having ads
                        </p>
                      </div>
                    </div> */}
                    <div className="sm:sm:w-[17%]  w-[40%] m-3 relative  h-[130px] sm:h-[150px] cursor-pointer rounded-[18px] flex justify-center items-center flex-col">
                      <div className="justify-center items-center">
                        <button
                          onClick={async () => {
                            const newValue = !isToggled;
                            setIsToggled(newValue); 
                            await handleProfileUpdate(newValue , true); // Pass the new value to the update function
                          }}
                          className={`${
                            isToggled ? "bg-white" : "bg-white"
                          } w-12 h-6 rounded-full flex items-center justify-${
                            isToggled ? "end" : "start"
                          } px-1 transition-colors`}
                        >
                          <div className="w-4 h-4 bg-[#A87F0B] rounded-full"></div>
                        </button>

                        <h2 className="text-white sm:text-[13px] text-[12px] mt-1 mr-2">
                          Notifications
                        </h2>
                        <p className="text-[8px] text-[#FFFFFF66]">
                          Help support server and maintenance costs by enabling
                          notifications with ads.
                        </p>
                      </div>
                    </div>

                    {/* <div
                      style={{ boxShadow: "0px 0px 20px 0px #00000040" }}
                      className="sm:sm:w-[17%]  w-[40%] m-3 relative h-[150px] cursor-pointer rounded-[18px]  bg-[#444343] flex justify-center items-center flex-col"
                    >
                        <img className="w-[45px]" src={logout} />
                    
                      <h2 className="text-white sm:text-[13px] text-[12px] mt-1 ">
                        Logout
                      </h2>
                    </div> */}
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
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "430px",
            width: "90%",
            bgcolor: "#373737",
            color: "white",
            outline: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h7" component="h2">
            Are you sure you want to logout this account?
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <button
              className="bg-[#4B5563] text-white mr-5 h-[35px] rounded-md w-[100px]"
              onClick={handleLogoutAlert}
            >
              No
            </button>
            <button
              className="bg-[#A87F0B] h-[35px] rounded-md w-[100px]"
              onClick={() => {
                return handleLogoutout();
              }}
            >
              Yes
            </button>
          </Box>
        </Box>
      </Modal>

      <Modal open={delAccountAlert} onClose={handleDelAccountAlert}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "430px",
            width: "90%",
            bgcolor: "#373737",
            color: "white",
            outline: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h7" component="h2">
            Are you sure you want to parmanently delete this account?
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <button
              className="bg-[#4B5563] text-white mr-5 h-[35px] rounded-md w-[100px]"
              onClick={handleDelAccountAlert}
            >
              No
            </button>
            <button
              className="bg-[#A87F0B] h-[35px] rounded-md w-[100px]"
              onClick={() => {
                return handleDeleteAccount();
              }}
            >
              Yes
            </button>
          </Box>
        </Box>
      </Modal>

      <Modal open={edit} onClose={handleedit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "430px",
            width: "90%",
            bgcolor: "rgb(52 52 52)",
            color: "white",
            outline: "none",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="flex justify-center flex-col items-center w-[100%]">
            <div className="flex w-[100%]">
              <div className="flex justify-between items-center w-[100%]">
                <p className="text-[#A87F0B] font-[700]">Edit Profile</p>
                <div
                  onClick={handleedit}
                  className="flex justify-center items-center w-[25px] h-[25px] rounded-full bg-[#747474]"
                >
                  <IoClose />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5 w-[100%]">
              <div className="h-[120px] w-[120px] border rounded-full absolute  top-[50px] ">
                <label
                  htmlFor="img"
                  className="w-[0px] h-[0px] absolute top-[93px] left-[86px]"
                >
                  <div className=" border rounded-full w-[22px] h-[22px] flex justify-center items-center text-sm font-[1500] text-white bg-[#747474]">
                    <MdModeEditOutline className="text-md" />
                  </div>
                  <input
                    key={key}
                    type="file"
                    name="img"
                    id="img"
                    className="opacity-0 w-[0px] h-[0px]"
                    onChange={handleImageChange}
                  />
                </label>
                <img
                  src={tempimg ? tempimg : avatar}
                  className="rounded-full w-[120px] h-[120px]"
                />
              </div>
              <div className="flex justify-center flex-col mt-[100px] items-center w-[100%]">
                <div className="bg-[#FFFFFF2B] w-[100%] mt-5 rounded-[10px]">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[100%] outline-none rounded-[60px] h-[40px] pl-3 pr-6 bg-[#191717] text-[#FFFFFF]"
                  />
                </div>
                <div className="bg-[#FFFFFF2B] w-[100%] mt-5 rounded-[10px]">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={tempUsername !== ""}
                    className={`w-[100%] outline-none rounded-[60px] h-[40px] pl-3 pr-6 ${
                      tempUsername !== ""
                        ? " text-gray-700 cursor-not-allowed"
                        : "bg-[#191717] text-[#FFFFFF]"
                    }`}
                  />
                </div>

                <div className="bg-[#FFFFFF2B] w-[100%] mt-5 rounded-[10px]">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    className="w-[100%] outline-none rounded-[60px] h-[40px] pl-3 pr-6 bg-gray-400 text-gray-700 cursor-not-allowed"
                  />
                </div>

                <div className="bg-[#FFFFFF2B] w-[100%] mt-5 rounded-[10px]">
                  <input
                    type="number"
                    placeholder="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={tempPhone != ""} // Example limit for the number of digits
                    className="w-[100%] outline-none rounded-[60px] h-[40px] pl-3 pr-6 bg-[#191717] text-[#FFFFFF]"
                  />
                </div>

                {/* <input type='text' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-[100%] outline-none rounded-[60px] h-[40px] pl-6 pr-6 mt-5 bg-[#333333] text-[#FFFFFF]' /> */}
                {/* 
                <div className="w-[100%] outline-none h-[40px] pl-3 pr-6 mt-5 bg-[#FFFFFF2B] text-[#FFFFFF] flex items-center rounded-[10px]">
                  <PhoneInput
                    country={"us"}
                    value={phone}
                    onChange={setPhone}
                    inputStyle={{
                      background: "#191717",
                      color: "#FFFFFF",
                      border: "none",
                      width: "100%",
                      height: "100%",
                    }}
                    buttonStyle={{
                      background: "#191717",
                      border: "none",
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    dropdownStyle={{
                      background: "#191717",
                      color: "#FFFFFF",
                    }}
                  />
                </div> */}
                <div className="bg-[#FFFFFF2B] w-[100%] mt-5 rounded-[10px]">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-[100%] outline-none rounded-[60px] h-[40px] pl-3 pr-6  bg-[#191717] text-[#FFFFFF]"
                  />
                </div>
                <div className="flex justify-center mt-5 items-center w-[100%]">
                  <button
                    onClick={handleedit}
                    className="bg-[#4B5563] text-white py-2 px-4 w-[190px] h-[35px] flex justify-center items-center rounded-[10px] mr-2  transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileUpdate}
                    className="bg-[#A87F0B] text-white py-2 px-4 w-[190px] h-[35px] flex justify-center items-center rounded-[10px]  transition duration-200"
                  >
                    {btnloader ? (
                      <div cla>
                        <ClipLoader
                          size={20}
                          color="#181818"
                          className="mt-2"
                        />
                      </div>
                    ) : (
                      "Update"
                    )}
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
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "430px",
            width: "90%",
            bgcolor: "#373737",
            borderRadius: "10px",

            outline: "none",
            boxShadow: 24,
            maxHeight: "600px",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <div className="flex justify-end w-[90%] mt-3">
            <div
              onClick={handleCloseshare}
              className="flex justify-center items-center border border-[#E5D6C5] w-[25px] h-[25px] rounded-[50%]"
            >
              <IoClose className="text-[white]" />
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

      <InfoModal
        info={info}
        handleCloseshare={handleCloseshare}
        message="Trigger a reminder when it's your scheduled date to pay the kameti."
      />
      <InfoModal
        info={shareinfo}
        handleCloseshare={handleCloseshare}
        message="Share this kameti app with your friends to benefit from its features."
      />
      <InfoModal
        info={deleteinfo}
        handleCloseshare={handleCloseshare}
        message="Delete all historical kameti records."
      />
      <InfoModal
        info={recordinfo}
        handleCloseshare={handleCloseshare}
        message="Complete records of your kameti."
      />
    </>
  );
}
