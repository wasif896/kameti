import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import logo from '../../images/logo1.png'
import { Link } from 'react-router-dom';
// import logo from '../../images/logo1.png'



const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export default function CustomSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    const intervalId = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [images]);

 

  const handleChangeIndex = (index) => {
    setActiveIndex(index);
    
    
    if (index === images.length - 0) {
      setTimeout(() => {
        setActiveIndex(0);
      }, 0);
    }
  };
  

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === (images.length - 1) ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? (images.length - 1) : prevIndex - 1));
  };

  const renderDots = () => {
    return images.map((_, index) => (
      <span
        key={index}
        className={`inline-block w-3 h-3 rounded-full mx-1 ${activeIndex === index ? 'bg-[#A87F0B]' : 'bg-white'}`}
      />
    ));
  };

  return (
    <div className="w-full sm:h-full relative h-full rounded-[20px] overflow-hidden">
   <div className="w-full flex flex-col items-center justify-start text-center mt-9 sm:hidden">
  <h1 className="text-white text-4xl sm:text-7xl font-bold mb-2">Welcome To</h1>
  <img className="w-40 sm:w-[10] mb-2" src={logo} alt="Kameti Logo" />
</div>

    <VirtualizeSwipeableViews
      index={activeIndex}
      onChangeIndex={handleChangeIndex}
      slideRenderer={({ index, key }) => (
        <div
          key={key}
          className="flex flex-col items-center sm:h-[70vh] h-[350px] p-4 sm:p-0"
        >
          <div className="sm:w-[500px] w-full p-4 sm:p-9 mt-2 text-center bg-[#D9D9D936] rounded-[20px] sm:rounded-[40px]">
            <div className="flex items-center space-x-4 mb-5">
              <img
                src={images[index]?.imgURL}
                alt={images[index]?.imgAlt}
                className="w-auto sm:h-[60px] h-[40px]"
              />
              <h2 className="sm:text-[25px] text-[18px] text-[#ffffff] font-bold">
                {images[index]?.title}
              </h2>
            </div>
            <p className="sm:text-[15px] text-[12px] text-[#ffffff] text-start">
              {images[index]?.description}
            </p>
          </div>
        </div>
      )}
      enableMouseEvents={true}
      resistance={false}
      loop={false}
    />
  
    {/* Dots */}
    <div className="absolute bottom-[30px] sm:bottom-[80px] left-1/2 transform -translate-x-1/2">
      {renderDots()}
    </div>
  
    {/* Button */}
    <Link to="/signin">
      <button
        className="absolute sm:w-[500px] w-[90%] bottom-4 left-1/2 transform -translate-x-1/2 bg-[#A87F0B] text-white py-2 sm:px-6 px-4 rounded-lg text-sm sm:text-base"
        style={{ boxShadow: '-4px -6px 6.8px 0px rgba(0, 0, 0, 0.25) inset' }}
      >
        Let's Start
      </button>
    </Link>
  </div>
  
  
  );
}
