import React, { useState } from 'react';
import signup from '../../images/signup.png';
import logo from '../../images/Kameti (1).png';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import axios from 'axios';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setresponseMessage] = useState('');
  const [userType, setUserType] = useState('user');

  let navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignup = async () => {
    if (!fullname) {
      toast.error("Fullname is required.");
      return;
    }
    if (!username) {
      toast.error("Username is required.");
      return;
    }
    if (!email) {
      toast.error("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!phone) {
      toast.error("Phone number is required.");
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}register`, {
        email: email,
        phoneNumber: phone,
        password: password,
        loginWith: "signup",
        fcmtoken: 'asdf',
        platform: 'web',
        userType: userType,
        username: username,
        fullName: fullname
      });
      toast.success("Account created successfully!");
      console.log(response?.data)
      localStorage.setItem('id', response?.data?.data?.id);
      localStorage.setItem('token', response?.data?.data?.token);
      setTimeout(function () {
        navigate("/create");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  let screenwidth =window.innerWidth
  return (
    <>
      <div className='w-[100%] flex bg-black h-[100vh] justify-center items-center'>
      {screenwidth> 430 &&
        <div className='w-[50%] bg-customBlack h-[90vh] rounded-[20px] flex justify-center items-center'>
          <img className='w-[60%]' src={signup} />
        </div>
      }
        <div className='sm:w-[45%] w-[90%] h-[90vh] rounded-[20px] flex justify-center flex-col items-center'>
          <img className='w-[30%] ' src={logo} />
          <div className='flex w-2/5 items-center relative'></div>
          {responseMessage && <p className="text-white sm:mt-3 mt-5 w-[58%]">{responseMessage}</p>}
          <input className='bg-black border text-white outline-none border-gray-400 rounded-[30px] h-[50px] sm:w-[60%] w-[100%] p-5 sm:mt-3 mt-5' type='text' placeholder='Full Name' onChange={(e) => setFullname(e.target.value)} />
          <input className='bg-black border text-white outline-none border-gray-400 rounded-[30px] h-[50px] sm:w-[60%] w-[100%] p-5 sm:mt-3 mt-5' type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
          <input className='bg-black border text-white outline-none border-gray-400 rounded-[30px] h-[50px] sm:w-[60%] w-[100%] p-5 sm:mt-3 mt-5' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          
          <div className='bg-black border text-white outline-none border-gray-400 rounded-[30px] h-[50px] sm:w-[60%] w-[100%] p-5 sm:mt-3 mt-5 flex items-center'>
  <PhoneInput
    country={'us'}
    value={phone}
    onChange={setPhone}
    inputStyle={{
      background: 'black',
      color: 'white',
      border: 'none',
      width: '100%',
      height: '100%'
    }}
    buttonStyle={{
      background: 'black',
      border: 'none'
    }}
    containerStyle={{
      width: '100%'
    }}
    dropdownStyle={{
      background: 'black',
      color: 'white',
      border: "1px solid #9ca3af"
    }}
  />
</div>

          
          <div className='bg-black flex items-center border border-gray-400 rounded-[30px] h-[50px] sm:w-[60%] w-[100%] p-5 sm:mt-3 mt-5 mb-2'>
            <input className='bg-black w-[100%] h-[20px] outline-none text-white' type={showPassword ? 'password' : 'text'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            {showPassword ? (
              <FaRegEyeSlash className='text-white ml-2 text-[22px]' onClick={() => setShowPassword(false)} />
            ) : (
              <MdOutlineRemoveRedEye className='text-white ml-2 text-[22px]' onClick={() => setShowPassword(true)} />
            )}
          </div>
          
          <div className='flex flex-col w-[60%] sm:mt-1 mt-5'>
            <div className='flex justify-around'>
              <label className='text-white'>
                <input type='radio' value='user' checked={userType === 'user'} onChange={(e) => setUserType(e.target.value)} />
                User
              </label>
              <label className='text-white'>
                <input type='radio' value='manager' checked={userType === 'manager'} onChange={(e) => setUserType(e.target.value)} />
                Manager
              </label>
            </div>
          </div>
          
          <button className='bg-[#A87F0B] rounded-[30px] h-[50px] text-[20px] w-[60%] flex justify-center items-center p-3 sm:mt-3 mt-5' onClick={handleSignup}>Sign Up</button>
          <p className='text-[white] sm:mt-2 mt-5'>Already have an account?<Link to='/signin' className='text-[#A87F0B] ml-1'>Sign in</Link></p>
        </div>
      </div>
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
        transition={Slide}
      />
    </>
  );
}
