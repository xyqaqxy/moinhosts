import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clouds from './pages/Clouds';
import ApiManagement from './pages/ApiManagement';
import PrivateRoute from './components/PrivateRoute';
import UnifiedApiInterface from './pages/UnifiedApiInterface';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clouds" element={<Clouds />} />
          <Route path="clouds/:platformId/apis" element={<ApiManagement />} />
          <Route path="unified-api" element={<UnifiedApiInterface />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;