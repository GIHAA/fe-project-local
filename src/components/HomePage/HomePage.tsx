import { Box, Button, Heading, Stack, Input, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    const storedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')
    setTodos(storedTodos)
  }, [])

  const addTodo = () => {
    const newTodo: Todo = { title, description, completed: false }
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTitle('')
    setDescription('')
  }

  const toggleTodoCompletion = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/login')
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bg="gray.100">
      <Box bg="white" p={8} boxShadow="lg" rounded="lg" width="sm">
        <Heading mb={6}>Todo List</Heading>
        <Stack spacing={4}>
          <Input
            placeholder="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Todo description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button colorScheme="blue" onClick={addTodo}>Add Todo</Button>
          <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
        </Stack>
        <Heading size="md" mt={6}>Your Todos</Heading>
        {todos.length === 0 ? (
          <Text>No todos yet</Text>
        ) : (
          todos.map((todo, index) => (
            <Box
              key={index}
              p={4}
              bg={todo.completed ? 'green.100' : 'gray.100'}
              mt={2}
              rounded="md"
              onClick={() => toggleTodoCompletion(index)}
              cursor="pointer"
            >
              <Heading size="sm">{todo.title}</Heading>
              <Text>{todo.description}</Text>
              <Text>{todo.completed ? 'Completed' : 'Not Completed'}</Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  )
}

export default HomePage
