import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"

import './theme/index.css'

const root = document.getElementById('root')

createRoot(root).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
