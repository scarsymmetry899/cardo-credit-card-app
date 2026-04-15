import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CardoApp from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardoApp />
  </StrictMode>,
);
