/* import { NavLink } from 'react-router-dom';
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

export default Navbar; */
import { useContext } from 'react';
import { Box, Button, Flex, Avatar } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="black"
      color="gray.200"
      height={20}
      py={2}
      px={8}
    >
      <Flex align="center">
        <Box>
          <img src="/images/Belay me.png" alt="Logo" width="100px" />
        </Box>
        <Box ml={4} fontWeight="bold" fontSize="xl"></Box>
      </Flex>
      <Flex as="ul" listStyleType="none">
        <NavItem to="/" exact fontSize="lg">
          Home
        </NavItem>
        <NavItem to="/climbers" fontSize="lg">
          Climbers
        </NavItem>
        <NavItem to="/crags" fontSize="lg">
          Climbing Spots
        </NavItem>
        <NavItem to="/events" fontSize="lg">
          Events
        </NavItem>
        <NavItem to="/gallery" fontSize="lg">
          Gallery
        </NavItem>
        <NavItem to="/contact" fontSize="lg">
          Contact
        </NavItem>
      </Flex>
      <Flex as="ul" listStyleType="none">
        {!isLoggedIn && (
          <>
            <li className="navbar-item">
              <Button
                onClick={() => navigate('/signup')}
                fontSize="lg"
                fontWeight={600}
                color="white"
                bg="rgb(140, 140, 225)"
                _hover={{ bg: 'rgb(120, 120, 205)' }}
              >
                Sign Up
              </Button>
            </li>
            <li className="navbar-item">
              <Button
                onClick={() => navigate('/login')}
                fontSize="lg"
                fontWeight={600}
                color="white"
                bg="rgb(140, 140, 225)"
                _hover={{ bg: 'rgb(120, 120, 205)' }}
              >
                Log In
              </Button>
            </li>
          </>
        )}
        {isLoggedIn && (
          <>
            <li className="navbar-item">
              <Flex align="center">
                <Text fontSize="lg" mr={2}>
                  {user.name}
                </Text>
                <Avatar size="sm" src={user.imageUrl} />
              </Flex>
            </li>
            <li>
              <Button
                onClick={logOutUser}
                fontSize="lg"
                fontWeight={600}
                color="white"
                bg="rgb(140, 140, 225)"
                _hover={{ bg: 'rgb(120, 120, 205)' }}
              >
                Logout
              </Button>
            </li>
          </>
        )}
      </Flex>
    </Flex>
  );
};

const NavItem = ({ to, fontSize, children }) => {
  return (
    <li className="navbar-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? 'selected navbar-link' : 'navbar-link'
        }
        fontSize={fontSize}
        fontWeight={600}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default Navbar;
