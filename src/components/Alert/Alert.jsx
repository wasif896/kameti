import React from 'react';
import { ClipLoader } from 'react-spinners';

const Alert = ({ message, onConfirm, onCancel,btnloader }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#373737] rounded-lg shadow-lg p-6 max-w-[430px] w-[90%]">
        <p className="text-white text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            disabled={btnloader}
            className="bg-gray-600 text-white w-[100px] h-[35px] rounded mr-2 hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={btnloader}
            className="bg-[#a87f0b] text-white w-[100px] h-[35px] rounded hover:bg-[#a87f0b]-10 transition duration-200"
          >
          {btnloader ? <ClipLoader size={20} color="#ffffff" className='mt-2' /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
