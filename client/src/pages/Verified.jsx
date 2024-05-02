import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import greenTick from "../assets/images/verified/greenTick.svg";
import redWrong from "../assets/images/verified/redWrong.png";
import { Image } from "@chakra-ui/react";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";

const Verified = () => {
  const { p1, p2 } = useParams();
  const [loading, setLoading] = useState(true);

  const [res, setRes] = useState({
    success: "",
    msg: "",
  });

  let response;

  const verifyEmail = async () => {
    setLoading(true);
    try {
      response = await axios.post(
        process.env.REACT_APP_URL + "/api/auth/verify/",
        {
          p1,
          p2,
        }
      );
    } catch (error) {
      response = error.response;
    }
    setRes({
      success: response.data.success,
      msg: response.data.msg,
    });
    setLoading(false);
    console.log(response);
  };

  useEffect(() => {
    if (p1 && p2) {
      verifyEmail();
    }
    // eslint-disable-next-line
  }, [p1, p2]);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user.isLoggedIn]);

  return !loading ? (
    <div className="flex flex-col justify-center items-center h-[100vh] px-5">
      <>
        <Image
          src={res?.success === true ? greenTick : redWrong}
          alt="Email sent"
          w={res?.success === true ? "160px" : "80px"}
          className="emailImg"
        />

        {res.msg && (
          <p
            className={`text-xl mt-5 text-center ${
              res?.success === true ? "mt-0" : "mt-5"
            }`}
          >
            {res?.msg}
          </p>
        )}
      </>
    </div>
  ) : (
    <Loader />
  );
};

export default Verified;
