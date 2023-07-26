import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { favouriteCrag } from '../api/crags.api';

const Favourites = () => {
  const [favouriteCrags, setFavouriteCrags] = useState([]);
  const { userId } = useParams;

  useEffect(() => {
    const fetchFavourites = async _id => {
      try {
        const favouritesData = await favouriteCrag(_id);
        setFavouriteCrags(prevCrags => [...prevCrags, favouritesData]);
      } catch (error) {
        console.log('Error fetching the favourite crags:', error.message);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div>
      <h1>Favourite Crags</h1>
      {favouriteCrags.length === 0 ? (
        <p>No favourite climbing spots yet</p>
      ) : (
        <ul>
          {favouriteCrags.map(favouriteCrag => (
            <li key={favouriteCrag._id}>{favouriteCrag.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
