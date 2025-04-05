
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '@/components/dashboard/UserDashboard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAdmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <UserDashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
