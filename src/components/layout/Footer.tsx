
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-6 w-6" />
              <span className="text-xl font-bold">StrategyHub</span>
            </div>
            <p className="text-gray-300 text-sm">
              Providing advanced trading strategies across multiple asset classes for investors of all levels.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white text-sm">Pricing</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">API Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Disclaimer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} StrategyHub. All rights reserved.</p>
          <p className="mt-1">This platform is for informational purposes only. Past performance is not indicative of future results.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
