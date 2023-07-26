import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCrag, upload } from '../api/crags.api';
import { toast } from 'react-toastify';
import { getArea } from '../api/crags.api';

const AddRoute = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [coordinates, setCoordinates] = useState({
    longitude: '',
    latitude: ''
  });

  const [grade, setGrade] = useState(0);
  const [level, setLevel] = useState('BEGINNER');

  const gradeLevels = {
    BEGINNER: ['1', '2', '3', '4', '5a', '5b', '5c'],
    INTERMEDIATE: ['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a'],
    ADVANCED: ['7a+', '7b', '7b+', '7c'],
    PRO: ['7c+', '8a', '8a+', '8b'],
    ELITE: ['8b+', '8c', '8c+', '9a', '9a+', '9b', '9b+']
  };

  const [description, setDescription] = useState('');
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const AreasData = await getArea();
        setAreas(AreasData.data);
      } catch (error) {
        console.log('Error fetching the areas');
      }
    };

    fetchAreas();
  }, []);

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
  const handleLevel = event => {
    setLevel(event.target.value);
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
        newRoute.imageUrl = response.data.imgUrl;
      }

      await addCrag(newRoute);
      toast.success('New route added successfully');
      // refreshList();
      navigate('/crags');
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.log('Error adding route', error);
    }

    setName('');
    setCountry('');
    setCoordinates('');
    setLevel('');
    setGrade('');
    setAreas('');
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
        <select type="text" name="area" value={area._id} onChange={handleArea}>
          <option>Please choose an area</option>
          {areas.length ? (
            areas.map(area => (
              <option key={area._id} value={area._id}>
                {area.name}
              </option>
            ))
          ) : (
            <option disabled>Loading areas...</option>
          )}
        </select>
        <label htmlFor="">Level</label>
        <select type="text" name="level" onChange={handleLevel}>
          <option>Please choose a level</option>
          {Object.keys(gradeLevels).map(gradeLevel => (
            <option key={gradeLevel} value={gradeLevel}>
              {gradeLevel}
            </option>
          ))}
        </select>
        <select type="text" name="grade" value={grade} onChange={handleGrade}>
          {gradeLevels[level].map(gradeOption => (
            <option key={gradeOption} value={gradeOption}>
              {gradeOption}
            </option>
          ))}
        </select>

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
