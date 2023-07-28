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

export const addCommentToCrag = async (id, commentText, author) => {
  try {
    const response = await axios.post(`${baseURL}/crags/${id}/comments`, {
      comment: commentText,
      author: author
    });
    return response.data; // Return the newly added comment data
  } catch (error) {
    throw new Error('Failed to add comment.');
  }
};
export const getClimbers = () => {
  return axios.get(`${baseURL}/climbers`);
};

export const getArea = () => {
  return axios.get(`${baseURL}/area`);
};

export const fetchUnpublishedCrags = async () => {
  try {
    const response = await axios.get(`${baseURL}/unpublished-crags`); // Adjust the API endpoint
    return response.data;
  } catch (error) {
    throw new Error('Error fetching crags: ' + error.message);
  }
};

export const publishCrag = async cragId => {
  try {
    const response = await axios.put(`${baseURL}/unpublished-crags/${cragId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error publishing the crag: ' + error.message);
  }
};

export const favouriteCrag = async cragId => {
  try {
    console.log(cragId);
    const response = await axios.put(`${baseURL}/crags/favourites/${cragId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching the favourites', error);
    throw new Error('Error fetching the  favourite crag: ' + error.message);
  }
};
export const fetchClimberById = async id => {
  try {
    const response = await axios.get(`${baseURL}/climbers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching crags: ' + error.message);
  }
};

export const fetchFavourites = async id => {
  try {
    const response = await axios.get(`${baseURL}/climbers/${id}`);
    console.log(response.data);
    return response.data.favourites;
  } catch (error) {
    console.log('Error fetching the favourites', error);
    throw new Error('Error fetching the  favourite crag: ' + error.message);
  }
};
