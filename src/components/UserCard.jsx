/* import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Card,
  Avatar
} from '@chakra-ui/react'; */

/* import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager
} from 'react-icons/fc'; */

/* const UserCard = ({ heading, description, icon }) => {
  return (
    <Container maxW={'5xl'} mt={12}>
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
      >
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}
          >
            {icon}
          </Flex>
          <Box mt={2}>
            <Heading size="md">{heading}</Heading>
            <Text mt={1} fontSize={'sm'}>
              {description}
            </Text>
          </Box>
          <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            Learn more
          </Button>
        </Stack>
      </Box>
      <Box p={4}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Heading'}
            icon={<Avatar w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <Card
            heading={'Heading'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <Card
            heading={'Heading'}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <Card
            heading={'Heading'}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
          <Card
            heading={'Heading'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
            }
            href={'#'}
          />
        </Flex>
      </Box>
    </Container>
  );
};
export default UserCard;
 */
/* import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Avatar
} from '@chakra-ui/react';

const UserCard = ({ climber }) => {
  return (
    <Container maxW={'5xl'} mt={12}>
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
      >
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('blue.100', 'black.700')}
          >
            <Avatar src={climber.imageUrl} />
          </Flex>
          <Box mt={2}>
            <Heading size="md">
              <span>{climber.name}</span>
              <span>{climber.surname}</span>
            </Heading>
            <Text mt={1} fontSize={'sm'}>
              {climber.country}
            </Text>
          </Box>
          <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            Send a message
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default UserCard;
 */

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  Input
} from '@chakra-ui/react';
import { sendMessage } from '../api/index.api';
import { useState } from 'react';

const UserCard = ({ climber }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      const fromEmail = 'belayme.web@gmail.com';
      const toEmail = climber.email;
      const subject = `Message from ${fromEmail}`;
      await sendMessage({ fromEmail, toEmail, subject, message });
      setMessage('');

      console.log('Message sent successfully!');
    } catch (error) {
      console.log('Error sending message:', error.message);
    }
  };
  console.log(climber);
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          src={climber.imageUrl}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {climber.name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {climber.email}
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          {climber.level}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            {climber.city}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            {climber.country}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={climber.equipment ? 'lightblue' : 'lightcoral'}
            fontWeight={'400'}
          >
            Equipment: {climber.equipment ? '✓' : 'X'}
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Input
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            value={message}
            onChange={e => setMessage(e.target.value)}
            _focus={{
              bg: 'gray.200'
            }}
          />
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            onClick={handleSendMessage}
            _focus={{
              bg: 'gray.200'
            }}
          >
            Message
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500'
            }}
            _focus={{
              bg: 'blue.500'
            }}
          >
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};
export default UserCard;
