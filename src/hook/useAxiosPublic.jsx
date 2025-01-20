import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://backend-sigma-tawny.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
