import { Center, Grid, GridItem, Spinner, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchCrags } from '../api/crags.api';
import CragCard from '../components/CragCard';
import { useNavigate } from 'react-router-dom';

const Crags = () => {
  const [crags, setCrags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        {crags.length &&
          crags.map(crag => {
            return (
              <GridItem key={crag._id}>
                <CragCard crag={crag} />
              </GridItem>
            );
          })}
      </Grid>
      <Grid alignItems={'right'} justifyContent={'right'}>
        <Button
          onClick={() => navigate('/add-crag')}
          fontSize="lg"
          fontWeight={600}
          color="white"
          bg="rgb(140, 140, 225)"
          _hover={{ bg: 'rgb(120, 120, 205)' }}
        >
          +
        </Button>
      </Grid>
    </>
  );
};

export default Crags;
