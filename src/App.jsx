// src/App.jsx
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RewardsHub from './components/rewards/RewardsHub';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <RewardsHub />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;