import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteCrag, getCrag } from '../api/crags.api';

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Button,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon
} from '@chakra-ui/react';
import { IoFlag, IoCompass } from 'react-icons/io5';
import { GiMountainClimbing } from 'react-icons/gi';

const CragDetails = () => {
  /* const [crag, setCrag] = useState(null); */
  const [crag, setCrag] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const fetchCrag = async id => {
    try {
      const response = await getCrag(id);
      console.log('Response:', response.data);
      setCrag(response.data);
    } catch (error) {
      console.log('Error fetching the route', error);
      console.log('Server error message:', error.message);
    }
  };
  const gradeLevels = {
    BEGINNER: ['1', '2', '3', '4', '5', '5a', '5b', '5c', '6a'],
    INTERMEDIATE: ['6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+'],
    ADVANCED: ['7b', '7b+', '7c', '7c+', '8a', '8a+', '8b'],
    PRO: ['8b+', '8c', '8c+', '9a', '9a+', '9b', '9b+']
  };

  // const gradeLevels = {
  //   BEGINNER: {
  //     label: 'Beginner',
  //     grades: ['1', '2', '3', '4', '5a', '5b', '5c', '6a']
  //   },
  //   INTERMEDIATE: {
  //     label: 'Intermediate',
  //     grades: ['6a+', '6b', '6b+', '6c', '6c+', '7a', '7a+']
  //   },
  //   ADVANCED: {
  //     label: 'Advanced',
  //     grades: ['7b', '7b+', '7c', '7c+', '8a', '8a+', '8b']
  //   },
  //   PRO: {
  //     label: 'Pro',
  //     grades: ['8b+', '8c', '8c+', '9a', '9a+', '9b', '9b+']
  //   }
  // };

  useEffect(() => {
    fetchCrag(id);
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCrag(id);
      navigate('/crags');
    } catch (error) {
      console.log('Error deleting the route', error);
    }
  };

  const getCategory = (grade, gradeLevels) => {
    let foundLevel = Object.keys(gradeLevels).find(level => {
      return gradeLevels[level].find(gradeLevel => {
        if (gradeLevel === grade) {
          return level;
        }
      });
    });
    return foundLevel;
  };
  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  //   return (
  //     <div className="CragDetails">
  //       {crag && (
  //         <div>
  //           <h1>{crag.name}</h1>
  //           <img src={crag.imageUrl} width="200px" height="200px" />
  //           <p>{crag.description}</p>
  //           <span>{crag.grade}</span>

  //           <Link to={`/crags/edit/${id}`}>
  //             <button>Edit Route</button>
  //           </Link>
  //           <button onClick={handleDelete}>Delete Route</button>
  //         </div>
  //       )}

  //       {/*  { <Area refreshCrag={fetchCrag} projectId={id} />
  //         {crag &&
  //
  //               <li className="Area card" key={area._id}>
  //                 <h3>{crag.area.name}</h3>
  //                 <h4>Description</h4>
  //                 <p>{area.description}</p>
  //               </li>
  //
  //           })} }
  //  */}
  //       <Link to={'/crags'}>Back to climbing spots</Link>
  //     </div>
  //   );

  return crag ? (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={'blue.50'}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            Grade: {crag.grade}
          </Text>
          <Heading>{crag.name}</Heading>
          <Text fontWeight={700} fontSize={'md'}>
            {crag.area && crag.area.name}
          </Text>
          <Text color={'gray.500'} fontSize={'lg'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore
          </Text>
          <Stack
            spacing={4}
            divider={<StackDivider borderColor={'gray.100'} />}
          >
            <Feature
              icon={
                <Icon as={GiMountainClimbing} color={'black.500'} w={5} h={5} />
              }
              iconBg={'yellow.100'}
              text={getCategory(crag.grade, gradeLevels)}
            />
            <Feature
              icon={<Icon as={IoFlag} color={'green.500'} w={5} h={5} />}
              iconBg={'green.100'}
              text={crag.country}
            />

            <Feature
              icon={<Icon as={IoCompass} color={'purple.500'} w={5} h={5} />}
              iconBg={'purple.100'}
              text={`Lat: ${crag.coordinates.latitude} Lon: ${crag.coordinates.longitude}`}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={crag.imageUrl}
            objectFit={'cover'}
          />
        </Flex>

        <Link to={`/crags/edit/${id}`}>
          <Button bg="rgb(140, 140, 225)" _hover={{ bg: 'rgb(120, 120, 205)' }}>
            Edit Route
          </Button>
        </Link>

        <Button
          bg="rgb(140, 140, 225)"
          _hover={{ bg: 'rgb(120, 120, 205)' }}
          onClick={handleDelete}
        >
          Delete Route
        </Button>
        <Link to={'/crags'}>
          <Button bg="rgb(140, 140, 225)" _hover={{ bg: 'rgb(120, 120, 205)' }}>
            Back to climbing spots
          </Button>
        </Link>
      </SimpleGrid>
    </Container>
  ) : (
    <>Loading...</>
  );
};

export default CragDetails;
