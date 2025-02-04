
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import Splash from "./pages/Splash/Splash";
import Signup from "./pages/Signup/Signup";
import SignIn from "./pages/SignIn/SignIn";
import ForgotPassword from "./pages/Forgotpassword.jsx/ForgotPassword";

import UserList from "./pages/Userlist/Userlist";
import History from "./pages/HistoryPage/History";
import More from "./pages/More/More";
import DetailPage from "./pages/DetailPage/DetailPage";
import DeleteKameti from "./pages/Delete kameti/DeleteKameti";
import AllRecords from "./pages/AllRecords/AllRecords";
import MobileScreen from "./components/MobileScreen/MobileScreen";
import EditProfile from "./pages/EditProfile/EditProfile";
import kametiSetting from "./pages/kametiSetting/KametiSetting";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Dashboard from "./pages/DashboardPage/Dashboard";

function App() {
  const RequireAuth = ({ children }) => {
    const currentUser = localStorage.getItem("id");
    return currentUser?.length>0 && currentUser !=undefined  ? children : <Navigate to="/signin" />;
  };
  const RequireAuthhome = ({ children }) => {
    const currentUser = localStorage.getItem("id");
  
    // If currentUser is found, redirect to "/create"
    if (currentUser) {
      return <Navigate to="/create" />;
    }
  
    // If no currentUser, render the children components
    return children;
  };

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/signin" element={<RequireAuthhome><Signup/></RequireAuthhome>}/>

    <Route path="/dashboard">
    <Route path="" element={<Dashboard/>}/>
    </Route>
    <Route path="/userlist" element={<UserList/>}/>



    {/* <Route path="/history" element={<History/>}/>
    <Route path="/more" element={<More/>}/> */}



    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
