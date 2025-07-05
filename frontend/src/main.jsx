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
       
        }}
      >
        <AuthProvider> {/* ✅ This wraps App to share Auth state */}
          <App />
        </AuthProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
