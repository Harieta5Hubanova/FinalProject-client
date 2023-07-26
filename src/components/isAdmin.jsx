import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsAdmin = props => {
  const { isAdmin, isLoading } = useContext(AuthContext);

  //if the authentication is still ongoing
  if (isLoading) return <p>Loading....</p>;

  if (!isAdmin) {
    return <Navigate to="/crags" />;
  } else {
    return props.children;
  }
};
export default IsAdmin;
