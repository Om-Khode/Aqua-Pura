import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import Prediction from "./pages/Prediction";
import FetchUserData from "./pages/FetchUserData";
import History from "./pages/History";
import Info from "./pages/Info";
import Email from "./pages/Email";
import Verified from "./pages/Verified";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <ToastContainer
        closeOnClick
        position="top-right"
        hideProgressBar={false}
        pauseOnFocusLoss={false}
      />
      <Navbar />
      <FetchUserData />
      <Routes>
        {/* Logout Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email" element={<Email />} />
        <Route path="/verify/:p1/:p2" element={<Verified />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset/:p1" element={<ResetPassword />} />

        {/* Logged In Routes */}
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<Info />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/prediction/:id" element={<Prediction />} />

        {/* Error page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
