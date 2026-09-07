import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {AuthProvider} from './features/auth/context/authContext.jsx'
import { ThemeProvider } from './theme/context/themeContext.jsx'

import './theme/index.css'

const queryClient = new QueryClient()

const root = document.getElementById('root')

createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
)
