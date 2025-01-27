import { Message } from '@mui/icons-material'
import { Box, Modal } from '@mui/material'
import React from 'react'

export default function InfoModal({info,handleCloseshare,message}) {
  return (
 <>
 <Modal open={info} onClose={handleCloseshare}>
<Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth:"430px",
    width: "90%",
    bgcolor: '#373737',
    color:"white",
 outline:"none",
 borderRadius:"10px",
    boxShadow: 24,
    p: 4,
  }}
>
  <div className='text-center'>{message}</div>
  <div className='w-[100%] flex justify-center items-center'>
  <button onClick={handleCloseshare} className='w-[120px] h-[40px] rounded-[30px] bg-[#A87F0B] font-bold text-[white] mt-5 '>Ok</button>
  </div>
</Box>
</Modal>
 </>
  )
}
