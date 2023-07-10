import { Center, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchCrags } from '../api/crags.api';
import CragCard from '../components/CragCard';

const Crags = () => {
  const [crags, setCrags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCragsData = async () => {
      try {
        const cragsData = await fetchCrags();
        setCrags(cragsData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCragsData();
  }, []);

  if (isLoading) {
    return (
      <Center height={'100vh'} width={'100vw'}>
        <Spinner color="orange" size={'xl'} />
      </Center>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error getting data at this moment: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Grid
        alignItems={'center'}
        justifyContent={'center'}
        templateColumns={'repeat(3, 2fr)'}
      >
        {crags.map(crag => {
          return (
            <GridItem key={crag._id}>
              <CragCard crag={crag} />
            </GridItem>
          );
        })}
      </Grid>
      <button>+</button>
    </>
  );
};

export default Crags;
