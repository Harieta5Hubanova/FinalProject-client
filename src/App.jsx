import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Crags from './pages/Crags';
import Climbers from './pages/Climbers';
import AddRoute from './pages/AddRoute';
import CragDetails from './pages/CragDetails';
import EditCrag from './pages/EditGrag';
import IsAnon from './components/IsAnon';

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/crags" element={<Crags />} />
        <Route path="/add-crag" element={<AddRoute />} />
        <Route path="/climbers" element={<Climbers />} />
        <Route path="/crags/:id" element={<CragDetails />} />
        <Route path="/crags/edit/:id" element={<EditCrag />} />
      </Routes>
    </>
  );
};

export default App;
