import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const CragCard = ({ crag }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/crags/${crag._id}`);
  };

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

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
              {crag.coordinates.latitude} {crag.coordinates.longitude}{' '}
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
              cursor="pointer"
              onClick={handleLikeToggle}
            >
              {liked ? (
                <BsHeartFill fill="red" fontSize={'24px'} />
              ) : (
                <BsHeart fontSize={'24px'} />
              )}
            </Flex>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default CragCard;
