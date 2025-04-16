import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_ServerUrl}`,
  });

const usePublicServer = () => {
  return axiosInstance
}

export default usePublicServer