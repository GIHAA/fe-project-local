import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface User {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(user => user.email === email && user.password === password)

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      navigate('/home')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bg="gray.100">
      <Box bg="white" p={8} boxShadow="lg" rounded="lg" width="sm">
        <Heading mb={6} textAlign="center">Login</Heading>
        {error && <Text color="red.500">{error}</Text>}
        <Stack spacing={4}>
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
          <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
          <Text textAlign="center">Don't have an account? <Link to="/register" style={{ color: 'blue' }}>Register</Link></Text>
        </Stack>
      </Box>
    </Box>
  )
}

export default LoginPage
