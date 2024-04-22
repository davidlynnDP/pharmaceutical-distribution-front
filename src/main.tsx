import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { AuthProvider, InformationProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <InformationProvider>
          <AppRouter/>
        </InformationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
//yarn dev