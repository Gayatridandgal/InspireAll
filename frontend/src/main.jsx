import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './context/AuthContext'; // <-- ✅ IMPORTANT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-5iz3qelm8v7pi2uv.us.auth0.com"
        clientId="UQiVIyZqcx70ZHnsSzJ8MiliUIw6a5Pi"
        authorizationParams={{
          redirect_uri: 'http://localhost:5173',
        }}
      >
        <AuthProvider> {/* ✅ This wraps App to share Auth state */}
          <App />
        </AuthProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
