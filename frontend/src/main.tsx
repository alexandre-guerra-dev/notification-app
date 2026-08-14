import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/reset.css";
import { Router } from './utils/router/Router';
import { Navbar } from './components/navbar/Navbar';

createRoot(document.getElementById('root')!).render(
  <>
    <Navbar />
    <Router />
  </>
)
