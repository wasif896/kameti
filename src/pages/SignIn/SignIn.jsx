import React, { useState } from "react";
import sigin from "../../images/login.png";
import logo from "../../images/layerImage.png";

import phoneIcon from "../../images/auth/phone.png";
import passwordIcon from "../../images/auth/password.png";
import emailIcon from "../../images/auth/email.png";

import apple from "../../images/auth/apple.png";
import google from "../../images/auth/google.png";

import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FaFacebookF } from "react-icons/fa";

import FacebookLogin from "react-facebook-login";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(true);
  const [emailSelected, setEmailSelected] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setresponseMessage] = useState("");

  const REDIRECT_URI = "http://localhost:3000"; // Replace with your app's redirect URI
  const onLoginStart = () => {
    console.log("Login started");
  };

  let nevigate = useNavigate();
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
    const toastId = "signInToast"; // Unique ID for this toast

    if (!phoneNumber) {
      if (!toast.isActive(toastId)) {
        toast.error(
          emailSelected ? "Email is required." : "Phone number is required.",
          { toastId }
        );
      }
      return;
    }
    if (emailSelected && !validateEmail(phoneNumber)) {
      if (!toast.isActive(toastId)) {
        toast.error("Invalid email format.", { toastId });
      }
      return;
    }
    if (!emailSelected && !validatePhone(phoneNumber)) {
      if (!toast.isActive(toastId)) {
        toast.error("Invalid phone number format.", { toastId });
      }
      return;
    }
    if (!password) {
      if (!toast.isActive(toastId)) {
        toast.error("Password is required.", { toastId });
      }
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}login`, {
        phoneNumber: phoneNumber, // Send the user's input (email or phone number) as the "phoneNumber" key
        password: password, // Make sure to capture the password as well
        loginWith: "signup",
        fcmtoken: "empty",
      });

      toast.success("Sign in successfuly!", { toastId });

      localStorage.setItem("id", response?.data?.data?.id || 0);
      localStorage.setItem("token", response?.data?.data?.token);

      setTimeout(() => {
        nevigate("/create");
      }, 2000);
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error(error?.response?.data?.message, { toastId });
      }
    }
  };

  // let screenwidth =window.innerWidth
  const handleGoogleSuccess = async (credentialResponse) => {
    const decodedToken = JSON.parse(
      atob(credentialResponse.credential.split(".")[1])
    );
    const { email, sub: socialId } = decodedToken;

    try {
      const response = await axios.post(`${apiBaseUrl}login`, {
        phoneNumber: phoneNumber, // Send the user's input (email or phone number) as the "phoneNumber" key
        password: password, // Make sure to capture the password as well
        fcmtoken: "empty",
        loginWith: "google",
        socialId,
        email,
      });
      toast.success("Sign in  successfuly!");
      // console.error('Sign-in success:', response);
      // console.error('Sign-in token:', response?.data?.data?.token);
      localStorage.setItem(
        "id",
        response?.data?.data?.id ? response?.data?.data?.id : 0
      );
      localStorage.setItem("token", response?.data?.data?.token);
      setTimeout(function () {
        nevigate("/create");
      }, 2000);
    } catch (error) {
      // Handle sign-in error (e.g., display error message to the user)
      toast.error(error?.response?.data?.message);
      // console.error('Sign-in error:', error);
    }
  };

  const handleGoogleFailure = (error) => {
    toast.error("Google login failed. Please try again.");
  };
  const responseFacebook = async (response) => {
    // Check if response is successful (check if 'email' and 'id' are available)
    if (response && response.email && response.id) {
      const { email, id, accessToken } = response; // Extract email, socialId, and accessToken

      try {
        // Send the request to the backend with Facebook credentials
        const apiResponse = await axios.post(`${apiBaseUrl}login`, {
          phoneNumber,
          phoneNumber, // Send the user's input (email or phone number) as the "phoneNumber" key
          password: password, // Make sure to capture the password as well
          password, // Make sure to capture the password as well
          fcmtoken: "empty",
          loginWith: "facebook", // Indicate Facebook login
          socialId: id, // Facebook user ID
          email, // Email from Facebook response
          accessToken, // Access token if required by backend for further Facebook API usage
        });

        // Show success message
        toast.success("Sign in successfully!");

        // Store the user data (e.g., token and user id) in localStorage
        localStorage.setItem("id", apiResponse?.data?.data?.id || 0);
        localStorage.setItem("token", apiResponse?.data?.data?.token);

        // Redirect after a short delay
        setTimeout(() => {
          nevigate("/create"); // Redirect to the desired page
        }, 2000);
      } catch (error) {
        // Handle error if login fails
        toast.error(error?.response?.data?.message || "Sign-in error");
      }
    }

    console.log(response); // Log the Facebook response for debugging
  };

  return (
    <>
      <GoogleOAuthProvider clientId="1017398516788-le5o51lh2atse9tjinmftf44oqvhgppt.apps.googleusercontent.com">
        <div className="flex bg-gradient-to-l from-[#A87F0B] to-[#000000] h-[100vh] justify-center items-center">
          <div className="sm:w-[50%] w-[90%] h-[90vh] flex flex-col justify-center items-center">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="text-5xl font-bold text-white mb-5">Sign In</h1>
              <p className="text-md text-white">Login to your account</p>
            </div>

            {/* Toggle Buttons */}
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

            {/* Response Message */}
            {responseMessage && (
              <p className="text-white w-3/5 text-center mb-3">
                {responseMessage}
              </p>
            )}

            {/* Email or Phone Input */}
            {emailSelected ? (
              <div className="bg-[#6A6A6A80] flex items-center rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
                <img src={emailIcon} width="23px" className="mr-2" />
                <input
                  className="w-[100%] outline-none text-white"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            ) : (
              <div className="bg-[#6A6A6A80] flex items-center rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
                <img src={phoneIcon} width="23px" className="mr-2" />
                <input
                  className="w-[100%] outline-none text-white"
                  type="text" // Use text to enable custom validation
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => {
                  
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setPhoneNumber(value);
                  }}
                  onKeyDown={(e) => {
            
                    if (
                      e.key.match(/[^0-9]/) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete"
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            )}

            {/* Password Input */}
            <div className="bg-[#6A6A6A80] flex items-center rounded-[10px] h-[50px] sm:w-[70%] w-[100%] p-5 sm:mt-3 mt-5">
              <img src={passwordIcon} width="23px" className="mr-2" />
              <input
                className="w-[100%] outline-none text-white"
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="text-white ml-2 text-[22px] cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className="text-white ml-2 text-[22px] cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end sm:w-[70%] w-full">
              <Link
                to="/forgot"
                className="text-[#ffffff] text-sm mb-3 pt-2 hover:text-[#A87F0B] transition duration-300"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Log In Button */}
            <button
              className="bg-[#A87F0B] text-white text-bold rounded-[10px] h-[40px] sm:w-[70%] w-[100%] flex justify-center items-center p-3 sm:mt-3 mt-5"
              style={{
                boxShadow: "-4px -6px 6.8px 0px rgba(0, 0, 0, 0.25) inset",
              }}
              onClick={handleSignIn}
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className="text-white mt-5">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#A87F0B] hover:text-[#rgb(211 159 12)] ml-1"
              >
                Sign Up
              </Link>
            </p>

            <div className="text-center mt-5">
              <p className="text-white text-sm">Or</p>
              <div className="flex justify-center gap-3 mt-3">
                {/* Google Login Button */}
                <div className="flex justify-center items-center w-[100%] cursor-pointer  text-[13px]">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    text="Google"
                  />
                </div>

                {/* Facebook Login Button */}
                <div className="flex justify-center items-center w-[100%] cursor-pointer text-white bg-[#1a73e8] rounded-[4px] px-4 h-[40px] gap-2 text-[13px]">
                  <FaFacebookF className="text-[20px]" />{" "}
                  {/* Added text size for icon */}
                  <FacebookLogin
                    appId="1594999661137496"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="facebook-small-button"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side (Image Section for larger screens) */}
          <div className="hidden sm:flex w-[50%] h-[100vh] justify-center items-center">
            <div className="relative flex justify-center items-center">
              <img className="w-[100%] z-10" src={logo} alt="Laptop" />
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
      </GoogleOAuthProvider>
    </>
  );
}
