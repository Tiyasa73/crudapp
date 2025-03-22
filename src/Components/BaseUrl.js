import axios from'axios'; 

const Url='https://tureappapiforreact.onrender.com/api'

export const baseURL = Url;
let axiosInstance = axios.create({
  baseURL,
});


export const productImageShow = (media) => {
    return `https://tureappapiforreact.onrender.com/${media}`;
  };

export default axiosInstance;