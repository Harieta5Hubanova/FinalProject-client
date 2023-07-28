import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verify } from '../api/auth.api';

const AuthContext = createContext();

const AuthProviderWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = async () => {
    //get the token from localStorage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const response = await verify(storedToken);
        const user = response.data;
        if (user.role === 'admin') {
          setIsAdmin(true);
        }
        setUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.log('An error occurred authenticating the user', error);
        //if token is invalid, the server response is an error
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      //if token does not exist
      setUser(null);
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    authenticateUser();
  }, []);
  const removeToken = () => {
    //delete the token from local storage
    localStorage.removeItem('authToken');
  };
  const logOutUser = () => {
    //to log out user, remove token
    removeToken();
    navigate('/');
    //update state variable
    authenticateUser();
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
