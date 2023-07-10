import { useState } from 'react';
import { addCrag, upload } from '../api/crags.api';
import { toast } from 'react-toastify';

const AddRoute = refreshList => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [coordinates, setCoordinates] = useState({
    longitude: '',
    latitude: ''
  });

  const [grade, setGrade] = useState(0);
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');

  const handleName = event => {
    setName(event.target.value);
  };

  const handleCountry = event => {
    setCountry(event.target.value);
  };

  const handleImageUrl = event => {
    setImageUrl(event.target.files[0]);
  };
  const handleCoordinates = event => {
    const { name, value } = event.target;
    setCoordinates(prevCoordinates => ({
      ...prevCoordinates,
      [name]: value
    }));
  };

  const handleGrade = event => {
    setGrade(event.target.value);
  };
  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleArea = event => {
    setArea(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newRoute = {
        name,
        country,
        coordinates,
        grade,
        area,
        description
      };
      if (imageUrl) {
        // create new FormData
        //same as encoding type "multioart/form-data"
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);
        const response = await upload(uploadData);
        newRoute.imgUrl = response.data.imgUrl;
      }

      await addCrag(newRoute);
      toast.success('New route added successfully');
      refreshList();
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.log('Error adding route', error);
    }

    setName('');
    setCountry('');
    setCoordinates('');
    setGrade(0);
    setArea('');
    setDescription('');

    setImageUrl();
  };
  return (
    <div className="AddCrag">
      <h2>Add New Routes</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        ></input>
        <label htmlFor="">Country</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleCountry}
        ></input>
        <label htmlFor="">Coordinates (Longitude)</label>
        <input
          type="text"
          name="longitude"
          value={coordinates.longitude}
          onChange={handleCoordinates}
        ></input>

        <label htmlFor="">Coordinates (Latitude)</label>
        <input
          type="text"
          name="latitude"
          value={coordinates.latitude}
          onChange={handleCoordinates}
        ></input>

        <label htmlFor="">Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={handleArea}
        ></input>
        <label htmlFor="">Grade</label>
        <input
          type="text"
          name="grade"
          value={grade}
          onChange={handleGrade}
        ></input>

        <label htmlFor="">Description:</label>
        <textarea
          name="description"
          value={description}
          cols="30"
          rows="10"
          onChange={handleDescription}
        ></textarea>

        <label htmlFor="">Image</label>
        <input type="file" onChange={handleImageUrl} />

        <button type="submit">Add New Route</button>
      </form>
    </div>
  );
};

export default AddRoute;
