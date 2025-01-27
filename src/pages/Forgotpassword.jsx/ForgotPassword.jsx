import { useState} from 'react'
import reset from '../../images/reset.png'
import logo from '../../images/layerImage.png';

import phone from '../../images/auth/phone.png';
import email from '../../images/auth/email.png';

import { Link } from 'react-router-dom';
import { RiWhatsappFill } from "react-icons/ri";


export default function ForgotPassword() {
    const [emailSelected, setEmailSelected] = useState(false);

  //    const handleSend = async () => {
  //   if (!inputValue) {
  //     alert("Please enter a valid email or phone number.");
  //     return;
  //   }

  //   const baseUrl = "https://api.kameti.pk/api/checkPhoneExistance";
  //   const queryParam = emailSelected ? `phoneNumber=${inputValue}` : `phoneNumber=${inputValue}`;
  //   const url = `${baseUrl}?${queryParam}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to check existence.");
  //     }

  //     const data = await response.json();
  //     console.log(data); // Handle the response data as needed
  //     alert(data.message || "Success!");
  //   } catch (error) {
  //     console.error(error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  
  let screenwidth =window.innerWidth
  return (
   <>
<div className="flex bg-gradient-to-l from-[#A87F0B] to-[#000000] h-[100vh] justify-center items-center">
  <div className="sm:w-[50%] w-[90%] h-[90vh] flex flex-col justify-center items-center">
    {/* Logo */}

    {/* Heading */}
    <h1 className="text-white text-[40px] sm:text-[50px]  font-bold mb-2 text-center">
      Forgot Password?
    </h1>
    <p className="text-white sm:text-[15px] text-center text-[13px] mb-5">
      Login! No worries, we’ll send you reset instructions to your account.
    </p>

    {/* Toggle Option */}
    {/* <div className="flex w-1/2 sm:w-2/5 items-center relative mb-5">
      <div className="bg-transparent border text-white border-[#fff] rounded-full h-12 w-full flex items-center">
        <button
          className={`rounded-full h-12 w-1/2 text-lg ${
            !emailSelected ? "bg-[#A87F0B] text-white" : "text-white"
          }`}
          onClick={() => setEmailSelected(false)}
        >
          Phone
        </button>
        <button
          className={`rounded-full h-12 w-1/2 text-lg ${
            emailSelected ? "bg-[#A87F0B] text-white" : "text-white"
          }`}
          onClick={() => setEmailSelected(true)}
        >
          Email
        </button>
      </div>
    </div> */}
             <div className="flex w-1/2 sm:w-[240px] items-center relative mb-5">
              <div className="bg-[#181818] border text-white outline-none border-[#A87F0B] rounded-[30px] h-[39px] sm:h-[45px] w-[100%]">
                <button
                  className={`text-white absolute left-0 rounded-[30px] h-[39px] sm:h-[44px] sm:text-[16px] w-[53%] ${
                    !emailSelected ? "bg-[#A87F0B]" : ""
                  }`}
                  style={
                    !emailSelected
                      ? {
                          boxShadow:
                            "-4.2px 5.88px 7.22px 0px rgba(255, 255, 255, 0.34) inset",
                        }
                      : {}
                  }
    
                  onClick={() => {
                    setEmailSelected(false); // Switch to email
                    setPhoneNumber('');     // Clear phone number input
                    
                  }}
                   

                >
                  Phone
                </button>

                <button
                  className={`absolute right-0 rounded-[30px] h-[39px] sm:h-[44px] sm:text-[16px] w-[53%] ${
                    emailSelected ? "bg-[#A87F0B] text-white" : "text-white"
                  }`}
                  style={
                    emailSelected
                      ? {
                          boxShadow:
                            "-4.2px 5.88px 7.22px 0px rgba(255, 255, 255, 0.34) inset",
                        }
                      : {}
                  }
                  onClick={() => {
                    setEmailSelected(true); // Switch to email
                    setPhoneNumber('');     // Clear phone number input
                  }}
                  
                >
                  Email
                </button>
              </div>
            </div>
    

    {/* Input and Button */}
    <div className="bg-[#6A6A6A80] flex sm:w-[65%] w-[100%] items-center relative mt-5 rounded-[10px]">
  {/* Dynamically set the image source based on emailSelected */}
  <img 
    src={emailSelected ? email : phone} 
    width="23px" 
    className="ml-4"
  />

  <input
    className="bg-transparent text-white outline-none h-[50px] w-[100%] p-2"
    type={emailSelected ? "email" : "text"}
    placeholder={emailSelected ? "Email" : "Phone Number"}
  />
  <button
    className="bg-[#A87F0B] absolute right-0 rounded-[10px] h-[50px] sm:text-[16px] w-[20%] text-white font-medium"
    style={{
      boxShadow: "-4px -6px 6.8px 0px rgba(0, 0, 0, 0.25) inset",
    }}
  >
    Send
  </button>
</div>


    {/* WhatsApp Support */}
    <p className="text-[#A87F0B] sm:text-[14px] mt-5 text-center">
      Or Try Our WhatsApp Support?
    </p>
    <p className="text-white sm:text-[13px] text-[13px] text-center mt-2 mb-5">
      Contact us on WhatsApp for the fastest support.
    </p>

    <button className="bg-[#FFFFFF33] rounded-[10px] h-[50px] sm:text-[16px] w-[65%] flex justify-center items-center font-medium text-white shadow-inset-custom">
      <RiWhatsappFill className="sm:text-[30px] mr-1 text-[#07E259]" />
      WhatsApp Support
    </button>

    {/* Back Button */}
    <Link
      to="/signin"
      className="bg-[#A87F0B] rounded-[10px] h-[50px] sm:text-[20px] w-[65%] mt-10 flex justify-center items-center font-medium text-white shadow-md"
      style={{
        boxShadow: "-4px -6px 6.8px 0px rgba(0, 0, 0, 0.25) inset",
      }}
    >
      Back
    </Link>
  </div>

  {/* Right Side (Image Section for larger screens) */}
  <div className="hidden sm:flex w-[50%] h-[90vh] justify-center items-center">
    <div className="relative flex justify-center items-center">
      <img className="w-[100%] z-10" src={logo} alt="Laptop" />
    </div>
  </div>
</div>

   </>
  )
}
