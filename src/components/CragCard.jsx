/* import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { AuthContext } from '../context/auth.context';

import { useNavigate } from 'react-router-dom';

const CragCard = ({ crag }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the likes count from local storage on component mount
    const storedLikesCount = localStorage.getItem(`crag_${crag._id}_likes`);
    if (storedLikesCount) {
      setLikesCount(parseInt(storedLikesCount, 10));
    }
  }, [crag._id]);

  const handleCardClick = () => {
    navigate(`/crags/${crag._id}`);
  };

  /*  const handleLikeToggle = () => {
    if (!liked) {
      // If the user has not liked before, increment the likes count
      setLikesCount(prevCount => prevCount + 1);
      // Save the updated likes count in local storage
      localStorage.setItem(`crag_${crag._id}_likes`, likesCount + 1);
    }
    setLiked(!liked);
  }; 
  const handleLikeToggle = () => {
    // Check if the user is logged in
    if (isLoggedIn) {
      // Check if the user has already liked the crag
      const likedStatus = localStorage.getItem(`crag_${crag._id}_liked`);
      if (likedStatus !== 'true') {
        // If the user has not liked before, increment the likes count and set liked status to true
        setLikesCount(prevCount => prevCount + 1);
        setLiked(true);
        // Save the updated liked status in browser cookies
        localStorage.setItem(`crag_${crag._id}_liked`, 'true');
      }
    }

    return (
      <>
        <Center py={6}>
          <Box
            w="xs"
            rounded={'sm'}
            my={5}
            mx={[0, 5]}
            overflow={'hidden'}
            bg="white"
            border={'1px'}
            borderColor="black"
            boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}
          >
            <Box h={'100px'} borderBottom={'1px'} borderColor="black">
              <Img
                src={crag.imageUrl}
                roundedTop={'sm'}
                objectFit="cover"
                h="full"
                w="full"
                alt={'Blog Image'}
              />
            </Box>
            <Box p={4}>
              <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
                <span> {crag.name}</span>
              </Heading>
              <Heading color={'black'} fontSize={'1xl'} noOfLines={1}>
                <span>{crag.country}</span>
              </Heading>
              <Text color={'gray.500'} noOfLines={2}>
                {crag.coordinates && crag.coordinates.latitude}{' '}
                {crag.coordinates && crag.coordinates.longitude}{' '}
                <span>Grade: {crag.grade}</span>
              </Text>
            </Box>
            <HStack borderTop={'1px'} color="black">
              <Flex
                p={4}
                alignItems="center"
                justifyContent={'space-between'}
                roundedBottom={'sm'}
                cursor={'pointer'}
                w="full"
                onClick={handleCardClick}
              >
                <Text fontSize={'md'} fontWeight={'semibold'}>
                  View more
                </Text>
                <BsArrowUpRight />
              </Flex>
              <Flex
                p={4}
                alignItems="center"
                justifyContent={'space-between'}
                roundedBottom={'sm'}
                borderLeft={'1px'}
                cursor={isLoggedIn ? 'pointer' : 'default'} // Set cursor to default if user is not logged in
                onClick={isLoggedIn ? handleLikeToggle : undefined} //Attach the click handler only when logged in
              >
                {liked ? (
                  <BsHeartFill fill="red" fontSize={'24px'} />
                ) : (
                  <BsHeart fontSize={'24px'} />
                )}
                <Text ml={2} fontSize="sm">
                  {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
                </Text>
              </Flex>
            </HStack>
          </Box>
        </Center>
      </>
    );
  };
};

export default CragCard; */

/* import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { AuthContext } from '../context/auth.context';

import { useNavigate } from 'react-router-dom';

const CragCard = ({ crag }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the likes count from local storage on component mount
    const storedLikesCount = localStorage.getItem(`crag_${crag._id}_likes`);
    if (storedLikesCount) {
      setLikesCount(parseInt(storedLikesCount, 10));
    }
  }, [crag._id]);

  const handleCardClick = () => {
    navigate(`/crags/${crag._id}`);
  };

/*   const handleLikeToggle = () => {
    // Check if the user is logged in
    if (isLoggedIn) {
      // Check if the user has already liked the crag
      const likedStatus = localStorage.getItem(`crag_${crag._id}_liked`);
      if (likedStatus !== 'true') {
        // If the user has not liked before, increment the likes count and set liked status to true
        setLikesCount(prevCount => prevCount + 1);
        setLiked(true);
        // Save the updated liked status in browser cookies
        localStorage.setItem(`crag_${crag._id}_liked`, 'true');
      }
    }
  }; */

/* return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}
      >
        <Box h={'100px'} borderBottom={'1px'} borderColor="black">
          <Img
            src={crag.imageUrl}
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Box p={4}>
          <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
            <span> {crag.name}</span>
          </Heading>
          <Heading color={'black'} fontSize={'1xl'} noOfLines={1}>
            <span>{crag.country}</span>
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
            {crag.coordinates && crag.coordinates.latitude}{' '}
            {crag.coordinates && crag.coordinates.longitude}{' '}
            <span>Grade: {crag.grade}</span>
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full"
            onClick={handleCardClick}
          >
            <Text fontSize={'md'} fontWeight={'semibold'}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor={isLoggedIn ? 'pointer' : 'default'} // Set cursor to default if user is not logged in
            onClick={isLoggedIn ? handleLikeToggle : undefined} // Attach the click handler only when logged in
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
            <Text ml={2} fontSize="sm">
              {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
            </Text>
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
};

export default CragCard;
 */

import { useContext } from 'react';
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { favouriteCrag } from '../api/crags.api';

const CragCard = ({ crag }) => {
  /* const [liked, setLiked] = useState(crag.likedByCurrentUser || false); */
  /* const [likesCount, setLikesCount] = useState(crag.likeCount || 0); */
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/crags/${crag._id}`);
  };

  const handleFavourite = () => {
    favouriteCrag(crag._id);
  };

  /* const handleLikeToggle = async () => {
    // If the user is not logged in, do nothing
    if (!isLoggedIn) {
      return;
    }

    try {
      // Simulate the like/unlike operation by updating the liked state and likesCount
      if (liked) {
        setLiked(false);
        setLikesCount(prevLikes => prevLikes - 1);
      } else {
        setLiked(true);
        setLikesCount(prevLikes => prevLikes + 1);
      }
    } catch (error) {
      console.error('An error occurred while handling like/unlike:', error);
      // You can show a general error notification to the user here, using a toast or alert component
    }
  }; */

  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={'sm'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}
      >
        <Box h={'100px'} borderBottom={'1px'} borderColor="black">
          <Img
            src={crag.imageUrl}
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
        </Box>
        <Box p={4}>
          <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
            <span> {crag.name}</span>
          </Heading>
          <Heading color={'black'} fontSize={'1xl'} noOfLines={1}>
            <span>{crag.country}</span>
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
            {crag.coordinates && crag.coordinates.latitude}{' '}
            {crag.coordinates && crag.coordinates.longitude}{' '}
            <span>Grade: {crag.grade} </span>
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full"
            onClick={handleCardClick}
          >
            <Text fontSize={'md'} fontWeight={'semibold'}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor={isLoggedIn ? 'pointer' : 'default'} // Set cursor to default if user is not logged in
            onClick={handleFavourite} // Attach the click handler only when logged in
          >
            {crag.likeCount > 0 ? (
              <BsHeartFill fill="red" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
            <Text ml={2} fontSize="sm">
              {crag.likeCount} {crag.likeCount === 1 ? 'Like' : 'Likes'}
            </Text>
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
};

export default CragCard;
