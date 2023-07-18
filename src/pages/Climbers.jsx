import { useEffect, useState } from 'react';
import { getClimbers } from '../api/crags.api';
import UserCard from '../components/UserCard';
import {
  Container,
  Grid,
  Heading,
  Stack,
  Text,
  GridItem
} from '@chakra-ui/react';

const Climbers = () => {
  const [climbers, setClimbers] = useState([]);

  useEffect(() => {
    const fetchClimbers = async () => {
      try {
        const response = await getClimbers();
        const climbersData = response.data.allClimbers;
        setClimbers(climbersData);
      } catch (error) {
        console.log('Error fetching climbers', error);
      }
    };

    fetchClimbers();
  }, []);

  return (
    <div>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Our Climbers
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
        </Text>
      </Stack>
      <Grid
        alignItems={'center'}
        justifyContent={'center'}
        templateColumns={'repeat(3, 1fr)'}
      >
        {climbers.length &&
          climbers.map(climber => {
            return (
              <GridItem key={climber._id}>
                <UserCard climber={climber} />
              </GridItem>
            );
          })}
        {/*    {climbers.map(climber => (
          <UserCard
            key={climber._id}
            heading={`${climber.name} ${climber.surname}`}
            surname={climber.surname}
            country={climber.country}
            level={climber.level}
            equipment={climber.equipment}
            imageURl={climber.imageUrl}
          />
        ))} */}
      </Grid>
    </div>
  );
};

export default Climbers;
