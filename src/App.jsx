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
import IsAnon from './components/isAnon';
import UnpublishedCrags from './pages/UnpublishedCrags';
import IsAdmin from './components/isAdmin';
import Contact from './pages/Contact';
import GradeTable from './pages/GradeTable';
import EditProfile from './pages/EditProfile';
import IsPrivate from './components/IsPrivate';

import Favourites from './pages/Favourites';

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route
          path="/unpublished-crags"
          element={
            <IsAdmin>
              <UnpublishedCrags />
            </IsAdmin>
          }
        />
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
        <Route
          path="/climbers/edit/:id"
          element={
            <IsPrivate>
              <EditProfile />
            </IsPrivate>
          }
        />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/grade-table" element={<GradeTable />} />
      </Routes>
    </>
  );
};

export default App;
