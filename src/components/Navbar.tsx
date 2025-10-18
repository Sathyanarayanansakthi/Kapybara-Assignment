'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, PenTool } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hi Soldiers
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Stories
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Writers
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              About
            </a>
            <Button 
              variant="outline" 
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Login
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium">
              Stories
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium">
              Writers
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600 font-medium">
              About
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="w-full border-indigo-600 text-indigo-600">
                Login
              </Button>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar