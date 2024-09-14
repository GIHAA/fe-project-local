import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface User {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleRegister = () => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(user => user.email === email)) {
      setError('User already exists')
      return
    }

    const newUser: User = { name, email, password }
    localStorage.setItem('users', JSON.stringify([...users, newUser]))
    navigate('/')
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bg="gray.100">
      <Box bg="white" p={8} boxShadow="lg" rounded="lg" width="sm">
        <Heading mb={6} textAlign="center">Register</Heading>
        {error && <Text color="red.500">{error}</Text>}
        <Stack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleRegister}>Register</Button>
          <Text textAlign="center">Already have an account? <Link to="/" style={{ color: 'blue' }}>Login</Link></Text>
        </Stack>
      </Box>
    </Box>
  )
}

export default RegisterPage
