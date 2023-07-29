import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = { email, password };
      const res = await signup(user);
      await storeToken(res.data.authToken);
      await authenticateUser();
      navigate('/profile');
    } catch (error) {
      console.log('Error sign up', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={'/login'}> Login</Link>
    </div>
  );
};

export default Signup;
