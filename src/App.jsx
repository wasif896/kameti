
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import Splash from "./pages/Splash/Splash";
import Signup from "./pages/Signup/Signup";
import SignIn from "./pages/SignIn/SignIn";
import ForgotPassword from "./pages/Forgotpassword.jsx/ForgotPassword";
import Create from "./pages/CreatePage/Create";
import Payment from "./pages/PaymentPage/Payment";
import History from "./pages/HistoryPage/History";
import More from "./pages/More/More";
import DetailPage from "./pages/DetailPage/DetailPage";
import DeleteKameti from "./pages/Delete kameti/DeleteKameti";
import AllRecords from "./pages/AllRecords/AllRecords";
import MobileScreen from "./components/MobileScreen/MobileScreen";
import EditProfile from "./pages/EditProfile/EditProfile";
import kametiSetting from "./pages/kametiSetting/KametiSetting";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

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
    <Route path="/" element={<RequireAuthhome><Splash/></RequireAuthhome>}/>
    <Route path="/signup" element={<RequireAuthhome><Signup/></RequireAuthhome>}/>
    <Route path="/signin" element={<RequireAuthhome><SignIn/></RequireAuthhome>}/>
    <Route path="/forgot" element={<RequireAuthhome><ForgotPassword/></RequireAuthhome>}/>
    <Route path="/create">
    <Route path="" element={<RequireAuth><Create/></RequireAuth>}/>
    <Route path=":id" element={<RequireAuth><Create/></RequireAuth>}/>
    </Route>
    <Route path="/delete" element={<RequireAuth><History recordType="deleted" /></RequireAuth>}/>
    {/* <Route path="/delete" element={<RequireAuth><DeleteKameti/></RequireAuth>}/> */}
    <Route path="/payment" element={<RequireAuth><Payment/></RequireAuth>}/>
    <Route path="/history" element={<RequireAuth><History recordType="all" /></RequireAuth>}/>
    <Route path="/more" element={<RequireAuth><More/></RequireAuth>}/>
    <Route path="/privacyPolicy" element={<RequireAuth><PrivacyPolicy/></RequireAuth>}/>

    <Route path="/allrecords" element={<RequireAuth><History recordType="all" /></RequireAuth>}/>
    {/* <Route path="/kametisetting" element={<RequireAuth><kametiSetting/></RequireAuth>}/> */}
    <Route path="/detail/:kametiId" element={<DetailPage/>}/>
    <Route path="/editProfile" element={<RequireAuth><EditProfile recordType="edit" /></RequireAuth>}/>



    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
