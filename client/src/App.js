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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/prediction/:id" element={<Prediction />} />
        <Route path="/history/:id" element={<Info />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
