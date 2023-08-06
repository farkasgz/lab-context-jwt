import { Box, Button, PasswordInput, Text, TextInput } from '@mantine/core'
import { useState } from 'react'

const SignupPage = () => {
  // Add some states to control your inputs
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Send your signup information to your backend
    try {
      const response = await fetch("http://localhost:5005/auth/signup",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password}),
      }
      )
      if(response.status === 201){
        const parsed = await response.json()
        console.log(parsed)
        setUsername('')
        setEmail('')
        setPassword('')
      }
      console.log(response);
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
        Signup
      </Text>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '2rem' }}
        onSubmit={handleSubmit}
      >
        <TextInput label='Username' variant='filled' withAsterisk 
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextInput label='Email' variant='filled' withAsterisk 
          value={email}
          onChange={(event) => setEmail(event.target.value)}/>
        <PasswordInput label='Password' variant='filled' withAsterisk 
          value={password}
          onChange={(event) => setPassword(event.target.value)}/>
        <Button
          type='submit'
          variant='filled'
          color='cyan'
          sx={{ marginTop: '1rem', alignSelf: 'center' }}
        >
          Register
        </Button>
      </Box>
    </Box>
  )
}

export default SignupPage
