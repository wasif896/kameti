import React from 'react'
import logo from '../../images/logo1.png'
import KametiMobile from '../../images/kametiSplash.png'
import project from '../../images/PropertyManage.png'
import transfer from '../../images/PropertySwitchapp.png'
import notification from '../../images/PropertyNotification.png'
import folder from '../../images/PropertyRecord.png'
import close from '../../images/Propertynofee.png'
import calculter from '../../images/PropertyCalculation.png'
import CustomSlider from '../../components/CustomCarousel/CustomSlider';


export default function Splash() {
  const images = [
    { imgURL:project, imgAlt: 'alt_text_1', title: 'Manage Records!', description: 'Creating and maintaining a kameti is very easy.Starting and managing a kameti, a form of savings circle, is straightforward. Members contribute regularly, take turns receiving funds, and maintain clear communication. This collaborative approach fosters financial empowerment, trust, and community support, making it an effective tool for achieving shared financial goals.' },
    { imgURL:calculter, imgAlt: 'alt_text_1', title: 'Auto Calculation', description: 'All the tedious calculations around kameti are done automatically Streamlining processes, removing manual complexities, understated, No need for tedious number crunching, its all seamlessly integrated, With automation, managing funds becomes simplified and facilitated' },
    { imgURL:folder, imgAlt: 'alt_text_1', title: 'Access Records', description: 'Access kameties almost from anywhere through the app, Gain kameti access from anywhere with our convenient app at hand, No matter your location, managing your funds is grand, From the comfort of your home or while on the go, Stay connected to your savings circle, no matter the flow, Effortlessly check balances and transactions, wherever you land."' },
    { imgURL:transfer, imgAlt: 'alt_text_1', title: 'Switch App', description: 'Seamlessly transfer kameti data between mobile devices with ease, No hassle, no stress, your information securely please, From one phone to another, swift and smooth migration, Your data travels effortlessly, without complication, Switching devices has never been so effortless and carefree.' },
    { imgURL:close, imgAlt: 'alt_text_1', title: 'No Fee', description: 'Embrace freedom from membership plans, no strings attached, No burdensome fees, your finances remain unmatched, Enjoy the liberty of participation, without any dues to pay, With no membership plans, your kameti journey starts today.' },
    { imgURL:notification, imgAlt: 'alt_text_1', title: 'Notifications', description: 'Stay punctual with timely reminders, notifications in tow, Never miss a payment, on due dates, well bestow, Receive alerts, ensuring kameti payments are made on cue, Effortlessly manage your finances, stress-free, and true' }
   
  ];

let screenwidth =window.innerWidth

  return (
<div className="w-full h-screen flex bg-black">
  {/* Left Section */}
  <div
    className="w-full sm:w-1/2 flex justify-center items-center bg-[#121212] "
  >
    <div className="sm:w-[100%] w-[90%] flex sm:mt-0 rounded-lg shadow-lg overflow-hidden">
      <CustomSlider images={images} />
    </div>
  </div>

  {/* Right Section */}
  <div
    className="w-full sm:w-1/2 hidden sm:flex flex-col items-center text-center relative from-[#A87F0B] to-[#000000]"
    style={{ background: 'linear-gradient(0deg, #A87F0B 18.7%, #000000 117.68%)' }}
  >
    <div className="w-full flex flex-col items-center justify-start text-center mt-9">
      <h1 className="text-white text-7xl font-bold mb-2">Welcome To</h1>
      <img className="w-40 mb-2" src={logo} alt="Kameti Logo" />
    </div>

    <div className="flex justify-center items-center">
      <img
        className="w-full h-[450px] mx-2 absolute bottom-0"
        src={KametiMobile}
        alt="Mobile Screen 1"
      />
    </div>
  </div>
</div>


  
  
  
  )
}
