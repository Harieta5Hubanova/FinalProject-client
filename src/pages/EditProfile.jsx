import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fillProfileData } from '../api/auth.api';
import { toast } from 'react-toastify';
import { fetchClimberById, upload } from '../api/crags.api';

const levelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Pro', 'Elite'];

const EditProfile = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [level, setLevel] = useState('');
  const [equipment, setEquipment] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetchClimberById(id);

        console.log(response);

        const {
          name,
          surname,
          imageUrl,
          country,
          city,
          dob,
          level,
          equipment
        } = response;
        setName(name);
        setSurname(surname);
        setImageUrl(imageUrl);
        setCountry(country);
        setCity(city);
        setDob(dob);
        setLevel(level);
        setEquipment(equipment);
      } catch (error) {
        console.log('Error fetching profile data', error);
      }
    };

    fetchProfileData();
  }, [id]);

  const handleName = event => {
    setName(event.target.value);
  };

  const handleSurname = event => {
    setSurname(event.target.value);
  };

  const handleImageUrl = event => {
    setImageUrl(event.target.files[0]);
  };

  const handleCountry = event => {
    setCountry(event.target.value);
  };

  const handleCity = event => {
    setCity(event.target.value);
  };

  const handleDob = event => {
    setDob(event.target.value);
  };

  const handleLevel = event => {
    setLevel(event.target.value);
  };

  const handleEquipment = event => {
    setEquipment(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const updatedProfile = {
        name,
        surname,
        country,
        city,
        dob,
        level,
        equipment,
        _id: id
      };

      if (imageUrl) {
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);
        const response = await upload(uploadData);
        updatedProfile.imageUrl = response.data.imageUrl;
      }

      await fillProfileData(updatedProfile);
      toast.success('Profile updated successfully');
      navigate('/climbers');
    } catch (error) {
      toast.error('Error updating the profile, try again later');
      console.log('Error updating the profile', error);
    }
  };

  return (
    <div className="EditProfile">
      <h2>Edit Climber Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          value={surname}
          onChange={handleSurname}
        />

        <label htmlFor="imageUrl">Image</label>
        <input type="file" onChange={handleImageUrl} />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleCountry}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={city}
          required
          onChange={handleCity}
        />

        <label htmlFor="dob">Date of birth</label>
        <input type="date" name="dob" value={dob} onChange={handleDob} />

        <label htmlFor="level">Level</label>
        <select name="level" value={level} onChange={handleLevel}>
          <option value="">Select Level</option>
          {levelOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label htmlFor="equipment">Equipment</label>
        <input
          type="checkbox"
          name="equipment"
          checked={equipment}
          onChange={handleEquipment}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
