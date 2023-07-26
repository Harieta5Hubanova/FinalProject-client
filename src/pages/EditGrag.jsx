/* import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCrag, updateCrag } from '../api/crags.api';

const EditCrag = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [area, setArea] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrag = async () => {
      try {
        const response = await getCrag(id);
        setName(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.log('Error fetching project', error);
      }
    };
    fetchCrag();
  }, [id]);

  const handleName = event => {
    setName(event.target.value);
  };
  const handleCountry = event => {
    setCountry(event.target.value);
  };
  const handleArea = event => {
    setArea(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const updatedCrag = { name, description, _id: id };
      await updateCrag(updatedCrag);
      navigate('/crags');
    } catch (error) {
      console.log('Error updating the route', error);
    }
    setName('');
    setCountry('');
    setArea('');
    setDescription('');
  };
  return (
    <div className="EditCragPage">
      <h2>Edit Climbing Route</h2>
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

        <label htmlFor="">Area</label>
        <input
          type="text"
          name="area"
          value={area}
          onChange={handleArea}
        ></input>

        <label htmlFor="">Description:</label>
        <textarea
          name="description"
          value={description}
          cols="30"
          rows="10"
          onChange={handleDescription}
        ></textarea>

        <button type="submit">Edit Route</button>
      </form>
    </div>
  );
};
export default EditCrag; */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCrag, updateCrag, upload, getArea } from '../api/crags.api';
import { toast } from 'react-toastify';

const EditCrag = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [coordinates, setCoordinates] = useState({
    longitude: '',
    latitude: ''
  });
  const [grade, setGrade] = useState(0);
  const [level, setLevel] = useState('BEGINNER');
  const [description, setDescription] = useState('');
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const gradeLevels = {
    BEGINNER: ['1', '2', '3', '4', '5a', '5b', '5c'],
    INTERMEDIATE: ['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a'],
    ADVANCED: ['7a+', '7b', '7b+', '7c'],
    PRO: ['7c+', '8a', '8a+', '8b'],
    ELITE: ['8b+', '8c', '8c+', '9a', '9a+', '9b', '9b+']
  };

  useEffect(() => {
    const fetchCrag = async () => {
      try {
        const response = await getCrag(id);
        const {
          name,
          country,
          area,
          imageUrl,
          grade,
          coordinates,
          description
        } = response.data;

        setName(name);
        setCountry(country);
        setArea(area._id);
        setImageUrl(imageUrl);
        setGrade(grade);
        setCoordinates(coordinates);
        setDescription(description);
      } catch (error) {
        console.log('Error fetching crag data', error);
      }
    };
    fetchCrag();
  }, [id]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await getArea();
        setAreas(areasData.data);
      } catch (error) {
        console.log('Error fetching the areas', error);
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
  const handleArea = event => {
    setArea(event.target.value);
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

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const updatedCrag = {
        name,
        country,
        area,
        imageUrl,
        grade,
        coordinates,
        description,
        _id: id
      };

      if (imageUrl) {
        const uploadData = new FormData();
        uploadData.append('file', imageUrl);
        const response = await upload(uploadData);
        updatedCrag.imageUrl = response.data.imgUrl;
      }

      await updateCrag(updatedCrag);
      toast.success('Route updated successfully');
      navigate('/crags');
    } catch (error) {
      toast.error('Error updating the route, try again later');
      console.log('Error updating the route', error);
    }
  };

  return (
    <div className="EditCragPage">
      <h2>Edit Climbing Route</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleCountry}
        />

        <label htmlFor="longitude">Coordinates (Longitude)</label>
        <input
          type="text"
          name="longitude"
          value={coordinates.longitude}
          onChange={handleCoordinates}
        />

        <label htmlFor="latitude">Coordinates (Latitude)</label>
        <input
          type="text"
          name="latitude"
          value={coordinates.latitude}
          onChange={handleCoordinates}
        />

        <label htmlFor="area">Area</label>
        <select name="area" value={area} onChange={handleArea}>
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

        <label htmlFor="level">Level</label>
        <select name="level" value={level} onChange={handleLevel}>
          <option>Please choose a level</option>
          {Object.keys(gradeLevels).map(gradeLevel => (
            <option key={gradeLevel} value={gradeLevel}>
              {gradeLevel}
            </option>
          ))}
        </select>

        <label htmlFor="grade">Grade</label>
        <select name="grade" value={grade} onChange={handleGrade}>
          {gradeLevels[level].map(gradeOption => (
            <option key={gradeOption} value={gradeOption}>
              {gradeOption}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          value={description}
          cols="30"
          rows="10"
          onChange={handleDescription}
        ></textarea>

        <label htmlFor="imageUrl">Image</label>
        <input type="file" onChange={handleImageUrl} />

        <button type="submit">Edit Route</button>
      </form>
    </div>
  );
};

export default EditCrag;
