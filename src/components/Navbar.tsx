import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Home, Flame, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from './AuthLayout';
import { Login } from './Login';
import { Register } from './Register';
import { Profile } from './Profile';
import { SearchBar } from './SearchBar';
interface NavbarProps {
  onCartClick: () => void;
}

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">GameStore</Link>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;