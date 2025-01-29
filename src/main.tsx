import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router.tsx';
import './styles/tailwind.css';
import './styles/custom.css';
import 'react-modern-drawer/dist/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
