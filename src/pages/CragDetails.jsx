import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  deleteCrag,
  getCrag,
  publishCrag,
  addCommentToCrag
} from '../api/crags.api';

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
import { AuthContext } from '../context/auth.context';

const CragDetails = () => {
  /* const [crag, setCrag] = useState(null); */
  const [crag, setCrag] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { isLoggedIn, isAdmin, user } = useContext(AuthContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const fetchCrag = async id => {
    try {
      const response = await getCrag(id);
      console.log('Response:', response.data);

      if (!response.data.published && !isAdmin) {
        navigate('/crags');
      }
      setCrag(response.data);
    } catch (error) {
      console.log('Error fetching the route', error);
      console.log('Server error message:', error.message);
    }
  };
  const gradeLevels = {
    BEGINNER: ['1', '2', '3', '4', '5', '5a', '5b', '5c'],
    INTERMEDIATE: ['6a', '6a+', '6b', '6b+', '6c', '6c+', '7a'],
    ADVANCED: ['7a+', '7b', '7b+', '7c'],
    PRO: ['7c+', '8a', '8a+', '8b'],
    ELITE: ['8b+', '8c', '8c+', '9a', '9a+', '9b', '9b+']
  };

  useEffect(() => {
    fetchCrag(id);
  }, [id]);

  const handleAddComment = async newComment => {
    try {
      await addCommentToCrag(id, newComment, user._id);
      fetchCrag(id); // Fetch updated crag details after adding the comment
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCrag(id);
      navigate('/crags');
    } catch (error) {
      console.log('Error deleting the route', error);
    }
  };
  const handlePublish = async () => {
    try {
      await publishCrag(crag._id); // Make an API call to publish the crag
      setCrag(prevCrag => ({ ...prevCrag, published: true })); // Update the local state to reflect the published status
    } catch (error) {
      console.error('Error publishing the crag:', error);
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

        {isLoggedIn && (
          <Stack spacing={4} mt={8}>
            <Heading size="md">Leave a Comment</Heading>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleAddComment(newComment);
                setNewComment(''); // Clear the input after submitting the comment
              }}
            >
              <textarea
                name="comment"
                color="black"
                rows={4}
                cols={50}
                required
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
              <Button
                type="submit"
                mt={2}
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
              >
                Add Comment
              </Button>
            </form>
          </Stack>
        )}
        {isAdmin && (
          <Link to={`/crags/edit/${id}`}>
            <Button
              bg="rgb(140, 140, 225)"
              _hover={{ bg: 'rgb(120, 120, 205)' }}
            >
              Edit Route
            </Button>
          </Link>
        )}

        {isAdmin && !crag.published ? (
          <Button
            bg="rgb(140, 140, 225)"
            _hover={{ bg: 'rgb(120, 120, 205)' }}
            onClick={() => {
              handlePublish();
              navigate('/unpublished-crags');
            }}
          >
            Publish
          </Button>
        ) : (
          <></>
        )}

        {isAdmin && (
          <Button
            bg="rgb(140, 140, 225)"
            _hover={{ bg: 'rgb(120, 120, 205)' }}
            onClick={handleDelete}
          >
            Delete Route
          </Button>
        )}
        <Link to={'/crags'}>
          <Button bg="rgb(140, 140, 225)" _hover={{ bg: 'rgb(120, 120, 205)' }}>
            Back to climbing spots
          </Button>
        </Link>
      </SimpleGrid>
      <br />
      <h1>Comments :</h1>
      <div>
        {crag.comment.length &&
          crag.comment.map(cragsComments => {
            return (
              <p key={cragsComments._id}>
                {cragsComments.comment} by:{cragsComments.author}
              </p>
            );
          })}
      </div>
    </Container>
  ) : (
    <>Loading...</>
  );
};

export default CragDetails;
