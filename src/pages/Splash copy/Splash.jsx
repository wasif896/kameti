import React from 'react'
import logo from '../../images/Kameti (1).png'
import project from '../../images/project 1.png'
import transfer from '../../images/transfer.png'
import notification from '../../images/notification 1.png'
import folder from '../../images/folder 1.png'
import close from '../../images/close 1.png'
import calculter from '../../images/calculator 1.png'
import CustomSlider from '../../components/CustomCarousel/CustomSlider';
import { Link } from 'react-router-dom';
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
    <div className='w-[100%] flex bg-black sm:h-[100vh] justify-center items-center'>
    <div className='w-[100%]  flex justify-evenly sm:flex-row flex-col items-center' >
      
    <div className='sm:w-[50%] w-[90%] flex sm:mt-0 mt-5 '>
    <CustomSlider images={images} />
    </div>
    
    {screenwidth> 430 &&
    <div className='w-[30%] flex justify-center items-center flex-col  '>
    <img className="w-40" src={logo}/>
    <h2 className='text-[#A87F0B] text-[20px] mt-2'>Welcome to kameti!</h2>
    <p className='text-[#847F7F] text-center	'>Kameti is an online application that allows you to maintain your kameties online.With the help of this app, you can get kameties records from anywhere in the wold.</p>
    <Link to="/signin"><button className='w-[150px] h-[40px] rounded-[20px] mt-[20px] bg-[#A87F0B]'>Go</button></Link>

    </div>}

    {screenwidth< 431 &&
      <div className='sm:w-[30%] w-[90%] mt-10 sm:mt-0 flex justify-center items-center flex-col  '>
      <img className="sm:w-40 w-[100px]" src={logo}/>
      <h2 className='text-[#A87F0B] sm:text-[20px] mt-2'>Welcome to kameti!</h2>
      <p className='text-[#847F7F] text-center sm:text-[16px] text-[13px] sm:mt-0 mt-2	'>Kameti is an online application that allows you to maintain your kameties online.With the help of this app, you can get kameties records from anywhere in the wold.</p>
      <Link to="/signin"><button className='w-[150px] h-[40px] rounded-[20px] mt-[20px] bg-[#A87F0B]'>Go</button></Link>
  
      </div>}
    </div>
    </div>
  )
}
