import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WithdrawDates = ({ counts, dates, committeeId, onClose, getPayments, accessFrom, isCreating, onCreate }) => {
  const [inputDates, setInputDates] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem('token');
  // console.log(committeeId)

  useEffect(() => {
    const initialDates = Array.from({ length: counts }, (_, i) => {
      return dates[i] ? new Date(dates[i]).toISOString().split('T')[0] : '';
    });
    setInputDates(initialDates);
  }, [counts, dates]);

  const handleDateChange = (index, value) => {
    const newDates = [...inputDates];
    newDates[index] = value; // Store the date string in the array
    setInputDates(newDates);
  };
  const handleSave = async () => {
    try {
      // Convert date strings to timestamps before sending the API request
      const timestampDates = inputDates.map(date => new Date(date).getTime());

      if (isCreating) {
        // Call the onCreate function with the selected dates
        await onCreate(timestampDates);
      } else {
        const response = await axios.post(
          `${apiBaseUrl}committees/change-withdraw-date`,
          {
            id: committeeId,
            withdrawDates: timestampDates // Send timestamps in the API request
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ).then((response) => {
          console.log('Dates saved successfully:', response);
          getPayments();
          onClose();
        });
      }
    } catch (error) {
      console.error('Error saving dates:', error);
    }
  };
  const selectDate = async () => {

  }

  return (

    <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50">
      <div className="bg-[#373737] max-h-[80vh] overflow-y-auto rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
        <h2 className="text-xl text-[white] font-semibold mb-4">Select Dates</h2>
        {inputDates.map((date, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Date {index + 1}:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => handleDateChange(index, e.target.value)}
              className="border bg-[#373737] text-[white] border-gray-300 rounded py-2 px-3 w-full"
              disabled={accessFrom && accessFrom === "live"}
            />
          </div>
        ))}
        <div className="flex justify-end">
          {accessFrom && accessFrom === "live" ?  (
            <button
              onClick={onClose}
              className="bg-[#4B5563] text-white py-2 px-4 rounded mr-2 transition duration-200"
            >
              Close
            </button>
          ) :
          (
            <>
              <button
                onClick={onClose}
                className="bg-[#4B5563] text-white py-2 px-4 rounded mr-2 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#A87F0B] text-white py-2 px-4 w-[90px] rounded transition duration-200"
              >
                Save
              </button>
            </>
          )}
        </div>

      </div>
    </div>

  );
};

export default WithdrawDates;
