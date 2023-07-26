import { Center, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchUnpublishedCrags } from '../api/crags.api';
import CragCard from '../components/CragCard';

const UnpublishedCrags = () => {
  const [crags, setCrags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnpublishedCragsData = async () => {
      try {
        const unpublishedCragsData = await fetchUnpublishedCrags({
          published: false
        });
        setCrags(unpublishedCragsData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUnpublishedCragsData({ published: false });
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
    </>
  );
};

export default UnpublishedCrags;
