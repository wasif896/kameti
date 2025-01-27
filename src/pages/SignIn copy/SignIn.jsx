import React,{useState} from 'react'
import sigin from '../../images/login.png'
import logo from '../../images/Kameti (1).png'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(true);
  const [emailSelected, setEmailSelected] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setresponseMessage] = useState('');
  let nevigate =useNavigate()
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  // console.log(apiBaseUrl);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d+$/; // Check for digits only
    return re.test(phone);
  };
  const handleSignIn = async () => {
    if (!phoneNumber) {
      toast.error(emailSelected ? "Email is required." : "Phone number is required.");
      return;
    }
    if (emailSelected && !validateEmail(phoneNumber)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!emailSelected && !validatePhone(phoneNumber)) {
      toast.error("Invalid phone number format.");
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }
    try {
      const response = await axios.post(`${apiBaseUrl}login`, {
        phoneNumber: phoneNumber, // Send the user's input (email or phone number) as the "phoneNumber" key
        password: password, // Make sure to capture the password as well
        loginWith: "signup",
        fcmtoken: "empty"
        
      });
      toast.success("Sign in  successfuly!");
      // console.error('Sign-in success:', response);
      // console.error('Sign-in token:', response?.data?.data?.token);
      localStorage.setItem('id',response?.data?.data?.id ? response?.data?.data?.id : 0);
      localStorage.setItem('token',response?.data?.data?.token);
      setTimeout(function() {
        nevigate("/create");
      }, 2000);
    } catch (error) {
      // Handle sign-in error (e.g., display error message to the user)
      toast.error(error?.response?.data?.message);
      // console.error('Sign-in error:', error);
    }
  };
  let screenwidth =window.innerWidth
  return (
   <>
   <div className='w-[100%] flex bg-black h-[100vh] justify-center items-center'>
   {screenwidth> 430 &&
   <div className='w-[50%] bg-customBlack h-[90vh] rounded-[20px] flex justify-center items-center'>
   <img className='w-[60%]' src={sigin}/>
   </div>
   }
   <div className='sm:w-[45%] w-[90%]  h-[90vh] rounded-[20px] flex justify-center flex-col items-center'>
   <img className='w-[30%] mb-10' src={logo}/>
   {/* <div className='flex w-2/5 items-center relative'>
    <div className='bg-black border text-white outline-none border-[#A87F0B] rounded-[30px] h-[45px] w-[100%] pl-[165px]'>
      <button className=' absolute left-0 rounded-[30px] h-[45px] text-[20px] w-[53%]' onClick={()=>setEmailSelected(false)} style={!emailSelected?{backgroundColor:"#A87F0B",color:'black'}:null}>Phone</button>
      <button className=' text-white absolute right-0 rounded-[30px] h-[45px] text-[20px] w-[53%]' onClick={()=>setEmailSelected(true)} style={emailSelected?{backgroundColor:"#A87F0B",color:'black'}:null}>Email</button>
    </div>
  </div> */}
  {responseMessage && <p className="text-white mt-3 w-[58%]">{responseMessage}</p>}

{emailSelected ?(
  <input className=' border text-white outline-none	 bg-transparent border-gray-400 rounded-[30px] h-[50px] sm:w-[60%] w-[100%] p-5 mt-5 ' type='email' placeholder='Email' onChange={(e) => setPhoneNumber(e.target.value)} />
):(
   <input className=' border text-white outline-none	 bg-transparent border-gray-400 rounded-[30px] h-[50px] sm:w-[60%] w-[100%] p-5 mt-5 ' type='text' placeholder='PhoneNumber/AnyNumber' onChange={(e) => setPhoneNumber(e.target.value)} />
  )}
   <div className='bg-transparent flex items-center border border-gray-400 rounded-[30px] h-[50px] sm:w-[60%] w-[100%] p-5 mt-5 mb-3'>
   <input  className=' bg-transparent w-[100%] h-[20px] outline-none	 text-white' type={showPassword ? 'password' : 'text'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
   {showPassword ? (
    <FaRegEyeSlash className='text-white ml-2 text-[22px]' onClick={() => setShowPassword(false)} />
  ) : (
    <MdOutlineRemoveRedEye className='text-white ml-2 text-[22px]' onClick={() => setShowPassword(true)} />
  )}</div>
  <div className='sm:w-[55%] w-[85%]'>
  <Link to='/forgot' className='text-[#A87F0B] text-[15px] flex justify-end mb-3 '>Forgot Password?</Link>
  </div>
   <button className='bg-[#A87F0B] rounded-[30px] h-[50px] text-[20px] w-[60%] flex justify-center items-center mt-5 sm:mt-0' onClick={handleSignIn}>Sign In</button>
   <p className='text-[white] sm:mt-10 mt-5'>Don’t have an account?<Link to='/signup' className='text-[#A87F0B] ml-1'>Sign Up</Link></p>
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
