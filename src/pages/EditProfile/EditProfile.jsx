import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the required CSS for PhoneInput

const EditProfile = ({
  name,
  username,
  email,
  phone,
  address,
  tempimg,
  avatar,
  key,
  btnloader,
  setName,
  setUsername,
  setEmail,
  setPhone,
  setAddress,
  handleImageChange,
  handleProfileUpdate,
  handleCancel,
}) => {

    console.log(123)
  return (
    <>
    <div
  style={{
    maxWidth: "950px",
    width: "100%",
    backgroundColor: "#1e1e1e",
    color: "white",
    borderRadius: "15px",
    padding: "24px",
    textAlign: "center",
  }}
>
<div className="flex flex-col items-center">
  {/* Profile Picture Section */}
  <div className="relative mb-6">
    <div
      className="rounded-full bg-gray-600 flex items-center justify-center"
      style={{
        height: "120px",
        width: "120px",
      }}
    >
      <img
        src={tempimg || avatar}
        alt="Profile"
        className="rounded-full"
        style={{ height: "120px", width: "120px" }}
      />
    </div>
    <label
      htmlFor="img"
      className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
    >
      Edit
      <input
        key={key}
        type="file"
        name="img"
        id="img"
        className="hidden"
        onChange={handleImageChange}
      />
    </label>
  </div>

  {/* Form Section */}
  <div className="w-full grid grid-cols-2 gap-4">
  <div className="w-full">
      <label className="block text-sm text-white mb-1 text-start">Full Name</label>
      <div className="bg-[#FFFFFF2B] rounded-[10px] ">
      <input
        type="text"
        placeholder="Abdullah"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded-md text-white bg-transparent"
      />
    </div>
    </div>

    <div className="w-full">
      <label className="block text-sm text-white mb-1 text-start">Username</label>
      <div className="bg-[#FFFFFF2B] rounded-[10px] ">
      <input
        type="text"
        placeholder="Abdullah"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 rounded-md text-white bg-transparent"
      />
    </div>
    </div>

    <div className="w-full">
      <label className="block text-sm text-white mb-1 text-start"> Email</label>
      <div className="bg-[#FFFFFF2B] rounded-[10px] ">
      <input
        type="text"
        placeholder="123@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-md text-white bg-transparent"
      />
    </div>
    </div>

    <div className="w-full">
      <label className="block text-sm text-white mb-1 text-start"></label>
      <div className="bg-[#FFFFFF2B] rounded-[10px] ">
      <PhoneInput
        country={"us"}
        value={phone}
        onChange={setPhone}
        inputStyle={{
          background: "#191717",
          color: "#FFFFFF",
          border: "none",
          width: "100%",
          height: "50px",
          borderRadius: "8px",
          paddingLeft: "45px",
        }}
        buttonStyle={{
          background: "#191717",
          border: "none",
        }}
        containerStyle={{
          width: "100%",
        }}
        dropdownStyle={{
          background: "#191717",
          color: "#FFFFFF",
        }}
      />
      </div>
    </div>

    <div className="w-full">
      <label className="block text-sm text-white mb-1 text-start">Address</label>
      <div className="bg-[#FFFFFF2B] rounded-[10px] ">
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="col-span-2 w-full p-3 rounded-md text-white bg-transparent"
      />
      </div>
     
    </div>
  </div>


</div>
  {/* Button Section */}

</div>
  <button
  onClick={handleProfileUpdate}
  className="mt-6 bg-[#A87F0B] text-white py-2 w-[30%] rounded-md text-lg font-semibold shadow-[inset_-4px_-6px_6.8px_0px_#00000040]"
>
  {btnloader ? <ClipLoader size={20} color="#181818" /> : "Update"}
</button>
</>

  
  );
};

export default EditProfile;
