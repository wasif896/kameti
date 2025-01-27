import React from 'react'

const text = () => {
  return (
    <div>
      <div className="w-[100%] h-[100vh] flex justify-center items-center bg-black">
  <div className="w-[97%] rounded-[40px] h-[95vh] flex">
    {/* {screenwidth > 430 && <Sidebar />} */}
    {loading ? (
      <div className="loading-screen flex justify-center items-center sm:w-[100%] w-[100%] h-[100vh] bg-[black]">
        <FadeLoader color="#A87F0B" />
      </div>
    ) : (
      <div className="sm:w-[100%] w-[100%] h-[95vh] overflow-y-scroll sm:pb-3 bg-maincolor ml-[2px] sm:rounded-l-[0px] rounded-l-[20px] rounded-r-[20px]">
        <div className="w-[100%] flex justify-between items-center h-[80px] sm:p-0 p-3 sm:mt-6 border-b-[2px] border-[black]">
          <span className="flex justify-center items-center w-[100%]">
            <h1 className="text-[#A87F0B] sm:text-[25px] text-[20px] font-bold sm:ml-0 ml-3 sm:mb-6 sm:text-left text-center">
              Kameti Details
            </h1>
          </span>
        </div>
        {selectedCommittee?.length === 0 ? (
          <div className="w-[100%] flex text-white justify-center items-center">
            No Kameti Found
          </div>
        ) : (
          <div className="w-[100%] flex flex-col sm:flex-row justify-center items-center">
            <div className="order-2 lg:order-1 sm:w-[75%] w-[100%] pl-1 pr-1 flex justify-center items-center flex-col">
              <div className="w-[98%] mt-2 rounded-[20px] items-center hidden sm:flex justify-between flex-col bg-sidebar">
                <div className="w-[50%] ml-5 flex justify-start flex-col">
                  <p className="text-gray-200 font-bold">{selectedCommittee?.kametiName}</p>
                  <h1 className="text-yellow-600 font-bold text-[30px]">
                    Rs. {Number(selectedCommittee?.totalPrice).toLocaleString()}
                  </h1>
                </div>
                
                <div className="w-[100%] flex justify-evenly overflow-y-auto mt-2 flex-wrap shadow-[inset_0px_19px_56.7px_0px_#FFFFFF1F] pt-[30px] rounded-[60px] ">
               
             {/* Common Styling Applied */}
<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040] mb-3">
  <img className="w-[58px]" src={k1} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Price Per Month</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {Number(selectedCommittee?.pricePerMonthKameti).toLocaleString()}
    </h1>
  </div>
</div>

{selectedCommittee?.kametiType === 'daily' && (
  <div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
    <img className="w-[58px]" src={k2} />
    <div className="w-[43%] pl-3">
      <h2 className="text-paytxt text-[10px] mt-1">Price Per Day</h2>
      <h1 className="text-paytxt text-[16px] font-bold">
        {Number(selectedCommittee?.pricePerDayKameti).toLocaleString()}
      </h1>
    </div>
  </div>
)}

<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
  <img className="w-[58px]" src={k3} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Total Price(All)</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {Number(selectedCommittee?.totalPrice).toLocaleString()}
    </h1>
  </div>
</div>

<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
  <img className="w-[58px]" src={k4} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Your Kameti</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {selectedCommittee?.myTotalKametis}
    </h1>
  </div>
</div>

<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
  <img className="w-[58px]" src={k5} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Total Month</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {selectedCommittee?.totalMonths}
    </h1>
  </div>
</div>

<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
  <img className="w-[58px]" src={k6} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Payable per Month</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {Number(selectedCommittee?.pricePerMonthKameti * selectedCommittee?.myTotalKametis).toLocaleString()}
    </h1>
  </div>
</div>

<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
  <img className="w-[58px]" src={k7} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Paid Amount</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {Number(selectedCommittee?.paidAmount).toLocaleString()}
    </h1>
  </div>
</div>

<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
  <img className="w-[58px]" src={k8} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Remaining Amount</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {Number(selectedCommittee?.remainingAmount).toLocaleString()}
    </h1>
  </div>
</div>

<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
  <img className="w-[58px]" src={k9} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Starting Date</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {formatDate(selectedCommittee?.startingMonth)}
    </h1>
  </div>
</div>

<div className="w-[43%] h-[100px] rounded-[70px] p-5 bg-colorinput flex shadow-[inset_-14px_-15px_19.8px_0px_#00000040]  mb-3">
  <img className="w-[58px]" src={k10} />
  <div className="w-[43%] pl-3">
    <h2 className="text-paytxt text-[10px] mt-1">Ending Date</h2>
    <h1 className="text-paytxt text-[16px] font-bold">
      {formatDate(selectedCommittee?.endingMonth)}
    </h1>
  </div>
</div>

              </div>
              </div>

            </div>
          </div>
        )}
      </div>
    )}
  </div>
</div>
    </div>
  )
}

export default text
