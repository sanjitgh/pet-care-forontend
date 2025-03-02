import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://pet-care-backend-iota.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
