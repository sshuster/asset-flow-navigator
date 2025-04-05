
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { BarChart3, LogIn, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const location = useLocation();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-navy-500" />
          <Link to="/" className="text-xl font-bold text-navy-500">
            StrategyHub
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium ${location.pathname === '/' ? 'text-navy-500' : 'text-gray-600 hover:text-navy-500'}`}
          >
            Home
          </Link>
          <Link 
            to="/pricing" 
            className={`text-sm font-medium ${location.pathname === '/pricing' ? 'text-navy-500' : 'text-gray-600 hover:text-navy-500'}`}
          >
            Pricing
          </Link>
          {isAuthenticated && (
            <Link 
              to={isAdmin ? "/admin" : "/dashboard"} 
              className={`text-sm font-medium ${location.pathname === '/dashboard' || location.pathname === '/admin' ? 'text-navy-500' : 'text-gray-600 hover:text-navy-500'}`}
            >
              {isAdmin ? 'Admin' : 'Dashboard'}
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-2">
                <User className="h-4 w-4 text-navy-500" />
                <span className="text-sm font-medium">{user?.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
