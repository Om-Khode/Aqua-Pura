import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

export default function FetchUserData() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_URL + "/api/auth/getuser",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(login(res.data.user));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return <></>;
}
