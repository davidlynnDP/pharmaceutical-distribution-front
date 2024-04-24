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
//yarn deploy

//docker-compose -f docker-compose.prod.yml build
//docker-compose -f docker-compose.prod.yml up
//docker push dav1dlynn/pharmaceutical-distribution-react-ts:latest

//dav1dlynn/pharmaceutical-distribution-react-ts:latest