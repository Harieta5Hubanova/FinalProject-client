import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/Belay me.png" alt="Logo" width="80px" />
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'selected' : 'navbar-link'
            }
          >
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/climbers"
            className={({ isActive }) =>
              isActive ? 'selected' : 'navbar-link'
            }
          >
            Climbers
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/crags"
            className={({ isActive }) =>
              isActive ? 'selected' : 'navbar-link'
            }
          >
            Climbing Spots
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? 'selected' : 'navbar-link'
            }
          >
            Events
          </NavLink>
        </li>
      </ul>
      {!isLoggedIn && (
        <ul className="navbar-list">
          <li className="navbar-item">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? 'selected' : 'navbar-link'
              }
            >
              Sign up
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'selected' : 'navbar-link'
              }
            >
              Log in
            </NavLink>
          </li>
        </ul>
      )}
      {isLoggedIn && (
        <ul className="navbar-list right">
          <li className="navbar-item">
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive ? 'selected' : 'navbar-link'
              }
            >
              Gallery
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'selected' : 'navbar-link'
              }
            >
              Contact
            </NavLink>
          </li>
          <li className="navbar-item">
            <span className="navbar-link">{user.name}</span>
            <button onClick={logOutUser} className="navbar-link">
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
