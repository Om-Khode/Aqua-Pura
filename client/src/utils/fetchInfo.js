import axios from "axios";

export const getInfo = async (id) => {
  try {
    const res = await axios.get(
      process.env.REACT_APP_URL + "/api/predictions/fetchprediction/" + id,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log("error", error.response.data);
    return error.response.data;
  }
};
