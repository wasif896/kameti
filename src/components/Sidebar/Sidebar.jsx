import React, { useState } from 'react';
import logo from '../../images/logo1.png';
import create from '../../images/create.png';
import payment from '../../images/payment2.png';
import logout from '../../images/logout.png'; 
import { Box, IconButton, Modal, Typography } from "@mui/material";


import file from '../../images/history2.png';
import more from '../../images/more2.png';


import { RiLogoutCircleFill } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteAccount, setDeleteAccount] = useState(false);


  const handleNavigation = (path) => {
    navigate(path);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const isActive = (paths, activeColor, inactiveColor) => {
    if (!Array.isArray(paths)) paths = [paths];
    return paths.includes(location.pathname) ? activeColor : inactiveColor;
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  const handleDelete = () => {
    setDeleteAccount(!deleteAccount);
  };
  let handleallrecords = (e) => {
    e.stopPropagation(); 
    navigate("/allrecords");
  };
  let handleHistorydelete = (e) => {
    e.stopPropagation(); 

    navigate("/delete");

  };
  const [logoutAlert, setLogoutAlert] = useState(false);
  const handleLogoutAlert = () => {
    setLogoutAlert(!logoutAlert)
  }
    let handleLogoutout = () => {
      console.log("logout");
      localStorage.removeItem("id");
      navigate("/signin");
    };

  return (
    <div className='w-[20%]  bg-[#3B3B3B] h-[100vh] flex flex-col items-center'>
      
      <img className='w-[45%] mt-5 ' src={logo} />
      <div
  className={`w-[100%] h-[65px] mt-10 bg-sidebar pl-7 flex items-center cursor-pointer ${isActive('/create', 'bg-sidecircle', '') ? 'bg-sidecircle shadow-[inset_-2px_-9px_17.6px_0px_#0000004D]' : ''}`}
  onClick={() => handleNavigation('/create')}
>
        <div className={`w-[45px] h-[45px] rounded-[50%] justify-center flex items-center`}>
          <img className='w-[45px]' src={create} />
        </div>
        <p className='text-white ml-4 text-[18px]'>Create</p>
      </div>
      <div className={`w-[100%] h-[65px] mt-5 bg-sidebar pl-7 flex items-center cursor-pointer ${isActive('/payment', 'bg-sidecircle', '') ? 'bg-sidecircle shadow-[inset_-2px_-9px_17.6px_0px_#0000004D]' : ''}`} onClick={() => handleNavigation('/payment')}>
        <div className={` w-[45px] h-[45px] rounded-[50%] justify-center flex items-center`}>
          <img className='w-[45px]' src={payment} />
        </div>
        <p className='text-white ml-4 text-[18px]'>Payments</p>
      </div>
      <div className={`w-[100%] h-[65px] mt-5 bg-sidebar pl-7 flex items-center cursor-pointer ${isActive('/history', 'bg-sidecircle', '')? 'bg-sidecircle shadow-[inset_-2px_-9px_17.6px_0px_#0000004D]' : ''}`} onClick={() => handleNavigation('/history')}>
        <div className={`w-[45px] h-[45px] rounded-[50%] justify-center flex items-center`}>
          <img className='w-[45px]' src={file} />
        </div>
        <p className='text-white ml-4 text-[18px]'>All Kameties</p>
      </div>
      <div 
      className={`w-[100%] h-[65px] mt-5 bg-sidebar pl-7 flex items-center cursor-pointer 
      ${isActive(['/more', '/delete', '/allrecords','/privacyPolicy'], 'bg-sidecircle', '') ? 
        'bg-sidecircle shadow-[inset_-2px_-9px_17.6px_0px_#0000004D]' : ''}`}
      onClick={() => handleNavigation('/more')}
    >
      <div className="w-[45px] h-[45px] rounded-[50%] justify-center flex items-center">
        <img className="w-[45px]" src={more} alt="More Icon" />
      </div>
      <p className="text-white ml-4 text-[18px]">Settings</p>

    </div>
 <div 
  onClick={handleLogoutAlert} 
  className={`w-[100%] h-[65px] mt-[auto] bg-sidebar pl-7 flex items-center cursor-pointer bg-[#545454] shadow-[inset_-2px_-9px_17.6px_0px_#0000004D] hover:bg-[#6b6b6b] hover:shadow-[inset_-2px_-9px_20px_0px_#00000070]`}
>
  <div className={`w-[45px] h-[45px] rounded-[50%] justify-center flex items-center`}>
    <img className="w-[45px]" src={logout} />
  </div>
  <p className="text-white ml-4 text-[16px] font-bold hover:text-gray-300">
    Log Out
  </p>
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
    </div>
  );
}
