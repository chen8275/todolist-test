import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LangProvider } from './LangContext';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
