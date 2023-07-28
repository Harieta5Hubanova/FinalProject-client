import { useState, useEffect, useContext } from 'react';

import { fetchFavourites } from '../api/crags.api';
import CragCard from '../components/CragCard';
import { AuthContext } from '../context/auth.context';
import { Center, Grid } from '@chakra-ui/react';

const Favourites = () => {
  const [favouriteCrags, setFavouriteCrags] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const handleFetchFavourites = async id => {
      try {
        const favouritesData = await fetchFavourites(id);
        setFavouriteCrags(favouritesData);
      } catch (error) {
        console.log('Error fetching the favourite crags:', error.message);
      }
    };
    if (user) {
      handleFetchFavourites(user._id);
    }
  }, [user]);

  return (
    <div
      style={{
        background: `url('/public/images/favourites.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh' // Set the height to at least the viewport height to cover the whole page
      }}
    >
      <div>
        <Center>
          <h1> {user.name}´s Favourite Crags</h1>
        </Center>
        {!user && favouriteCrags.length === 0 ? (
          <p>No favourite climbing spots yet</p>
        ) : (
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {favouriteCrags.map(favouriteCrag => (
              <CragCard key={favouriteCrag._id} crag={favouriteCrag} />
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Favourites;
