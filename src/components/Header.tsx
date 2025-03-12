
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <header className="w-full bg-loansavail-navy shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-cursive font-bold text-white">LoansAvail</Link>
          <div className="space-x-6 flex items-center">
            <Link to="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
            <div className="relative group">
              <Link to="/blog" className="text-white hover:text-gray-200 transition-colors flex items-center">
                Services
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
            <Link to="/blog" className="text-white hover:text-gray-200 transition-colors">About Us</Link>
            {isLoggedIn && isAdminPage ? (
              <Link to="/admin/dashboard" className="apply-now-button">
                Dashboard
              </Link>
            ) : (
              <Link to="/admin" className="apply-now-button">
                Apply Now
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
