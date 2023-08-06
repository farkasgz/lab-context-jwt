import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthContextWrapper } from './contexts/SessionContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <-- Wrap your application with your context --> */}
      <AuthContextWrapper>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </AuthContextWrapper>
      {/* <-- Wrap your application with your context --> */}
    </BrowserRouter>
  </React.StrictMode>
)
