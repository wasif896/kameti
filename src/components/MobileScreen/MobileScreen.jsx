import React from 'react';
import { FaSignal, FaBatteryHalf } from 'react-icons/fa';

const MobileScreen = () => {
  return (
    <div className="w-[430px] h-[800px] bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
        {/* Signal Icon */}
        <FaSignal className="text-teal-500" size={20} />

        {/* Battery Icon */}
        <FaBatteryHalf className="text-teal-500" size={20} />
      </div>

      {/* Content area */}
      <div className="p-4">
        {/* Your content goes here */}
        <p className="text-center text-gray-700">Mobile screen content...</p>
      </div>
    </div>
  );
};

export default MobileScreen;
