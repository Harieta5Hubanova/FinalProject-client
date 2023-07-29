import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};
export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  });
};

export const upload = uploadData => {
  return axios.post(`${baseURL}/upload`, uploadData);
};

export const fillProfileData = updatedProfile => {
  return axios.put(`${baseURL}/profile`, updatedProfile);
};

export const updateProfile = updatedProfile => {
  return axios.put(`${baseURL}/climbers/${updatedProfile._id}`, updatedProfile);
};

export const fetchClimbers = async () => {
  try {
    const response = await axios.get(`${baseURL}/climbers/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching crags: ' + error.message);
  }
};
