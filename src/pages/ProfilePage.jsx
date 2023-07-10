import { useState } from 'react';
import { fillProfileData, upload } from '../api/auth.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [level, setLevel] = useState('');
  const [equipment, setEquipment] = useState(true);
  const navigate = useNavigate();

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
      const newProfile = {
        name,
        surname,
        country,
        city,
        dob,
        level: level,
        equipment
      };
      if (imageUrl) {
        // create new FormData
        //same as encoding type "multioart/form-data"
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);
        const response = await upload(uploadData);
        newProfile.imgUrl = response.data.imgUrl;
      }

      await fillProfileData(newProfile);
      toast.success('Profile created successfully');
      navigate('/climbers');
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.log('Error creating profile', error);
    }

    setName('');
    setSurname('');
    setImageUrl();
    setCountry('');
    setCity('');
    setDob('');
    setLevel('');
    setEquipment('');
  };
  return (
    <div className="CreateProfile">
      <h2>Climber Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        ></input>
        <label htmlFor="">Surname</label>
        <input
          type="text"
          name="surname"
          value={surname}
          onChange={handleSurname}
        ></input>

        <label htmlFor="">Image</label>
        <input type="file" onChange={handleImageUrl} />

        <label htmlFor="">Country</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleCountry}
        ></input>

        <label htmlFor="">City</label>
        <input
          type="text"
          name="city"
          value={city}
          required
          onChange={handleCity}
        ></input>

        <label htmlFor="">Date of birth</label>
        <input type="date" name="dob" value={dob} onChange={handleDob}></input>

        <label htmlFor="">Level</label>
        <input
          type="text"
          name="level"
          value={level}
          onChange={handleLevel}
        ></input>
        <label htmlFor="">Equipment</label>
        <input
          type="checkbox"
          name="equipment"
          value={equipment}
          onChange={handleEquipment}
        ></input>

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
