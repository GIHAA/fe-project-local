import { Box, Button, Heading, Stack, Input, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
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
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [loggedInUser, setLoggedInUser] = useState<string | null>('')
  const [error, setError] = useState<string>('') 

  useEffect(() => {
    const storedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')
    const user = localStorage.getItem('loggedInUser')
    setTodos(storedTodos)
    setLoggedInUser(user)
  }, [])

  const addTodo = () => {
   
    if (!title || !description) {
      setError('Title and description are required.') 
      return
    }
    
    setError('') 

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, i) =>
        i === editIndex ? { ...todo, title, description } : todo
      )
      setTodos(updatedTodos)
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      setEditIndex(null)
    } else {
      const newTodo: Todo = { title, description, completed: false }
      const updatedTodos = [...todos, newTodo]
      setTodos(updatedTodos)
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }
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

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  const updateTodo = (index: number) => {
    setEditIndex(index)
    setTitle(todos[index].title)
    setDescription(todos[index].description)
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bg="gray.100">
      <Box bg="white" p={8} boxShadow="lg" rounded="lg" width="xxxl">
        <Heading mb={6}>Todo List</Heading>
        {loggedInUser && (
          <Text mb={4}>Logged in as: {JSON.parse(loggedInUser).name}</Text>
        )}
        <Stack spacing={4}>
          {error && <Text color="red.500">{error}</Text>} {/* Display error message */}
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
          <Button colorScheme="blue" onClick={addTodo}>
            {editIndex !== null ? 'Update Todo' : 'Add Todo'}
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
        </Stack>
        <Heading size="md" mt={6}>Your Todos</Heading>
        {todos.length === 0 ? (
          <Text>No todos yet</Text>
        ) : (
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todos.map((todo, index) => (
                <Tr key={index}>
                  <Td>{todo.title}</Td>
                  <Td>{todo.description}</Td>
                  <Td>{todo.completed ? 'Completed' : 'Not Completed'}</Td>
                  <Td>
                    <Button
                      colorScheme={todo.completed ? 'green' : 'blue'}
                      size="sm"
                      onClick={() => toggleTodoCompletion(index)}
                    >
                      {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                    </Button>
                    <Button
                      colorScheme="yellow"
                      size="sm"
                      ml={2}
                      onClick={() => updateTodo(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      ml={2}
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
