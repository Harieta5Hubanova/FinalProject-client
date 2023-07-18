import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

const setAuthorizationHeaders = () => {
  //set JWT token in the headers for every request in this file
  axios.interceptors.request.use(config => {
    //retrive the JWT token from the local storage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      config.headers = { Authorization: `Bearer ${storedToken}` };
    }
    return config;
  });
};

setAuthorizationHeaders();

export const getCrag = id => {
  return axios.get(`${baseURL}/crags/${id}`);
};

export const addCrag = crag => {
  return axios.post(`${baseURL}/add-crag`, crag);
};
export const updateCrag = updatedCrag => {
  return axios.put(`${baseURL}/crags/${updatedCrag._id}`, updatedCrag);
};

export const deleteCrag = id => {
  return axios.delete(`${baseURL}/crags/${id}`);
};

export const upload = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};
export const fetchCrags = async () => {
  try {
    const response = await axios.get(`${baseURL}/crags`); // Adjust the API endpoint
    return response.data;
  } catch (error) {
    throw new Error('Error fetching crags: ' + error.message);
  }
};
export const getClimbers = () => {
  return axios.get(`${baseURL}/climbers`);
};

export const getArea = () => {
  return axios.get(`${baseURL}/area`);
};
