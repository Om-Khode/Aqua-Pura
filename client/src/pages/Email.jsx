import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] px-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        fill="LightBlue"
        className="bi bi-envelope mailbox w-36 h-36"
        viewBox="0 0 16 16"
      >
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
      </svg>
      <p className="text-2xl font-semibold mt-4">Email Verification</p>
      <p className="text-xl mt-2 text-center">
        Please check your email to proceed further.
      </p>
    </div>
  );
};

export default Email;
