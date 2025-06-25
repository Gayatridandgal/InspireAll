import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    // domain="dev-1btkjcc16nvewhbu.us.auth0.com"
    // clientId="R5HAbcVMJVdCw18bkZoAtmbF9ELn73Ex"
    domain="dev-5iz3qelm8v7pi2uv.us.auth0.com"
      clientId="UQiVIyZqcx70ZHnsSzJ8MiliUIw6a5Pi"
    authorizationParams={{
      redirect_uri: 'http://localhost:5173',
    }}
  >
    <App />
  </Auth0Provider>
);
