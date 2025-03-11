
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">BlogApp</Link>
          <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
            <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">Blog</Link>
            {isLoggedIn && isAdminPage ? (
              <Link to="/admin/dashboard" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Dashboard
              </Link>
            ) : (
              <Link to="/admin" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Admin
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
