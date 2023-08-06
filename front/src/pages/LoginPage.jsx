import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core'
import { useState } from 'react'

const LoginPage = () => {
  // Add some states to control your inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    // Send your login information to your backend
    try {
      const response = await fetch("http://localhost:5005/auth/login",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
      })
      const parsed = await response.json()
      localStorage.setItem("authToken", parsed.token);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(100vh - 100px)',
      }}
    >
      <Text align='center' size='xl' weight='bold'>
        Login
      </Text>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '2rem' }}
        onSubmit={handleLogin}
      >
        <TextInput label='Username' variant='filled' withAsterisk 
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <PasswordInput label='Password' variant='filled' withAsterisk 
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type='submit'
          variant='filled'
          color='cyan'
          sx={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          Connect
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPage
