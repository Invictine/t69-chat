import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChatGPTClone from './gptclone'
import { ThemeProvider, createTheme } from '@mui/material/styles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatGPTClone />
  </StrictMode>,
)



