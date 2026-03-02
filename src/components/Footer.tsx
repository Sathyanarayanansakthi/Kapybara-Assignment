'use client'
import React from 'react';
import Link from 'next/link';
import { PenTool } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          {/* Logo and Name */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <PenTool className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hi Soldiers
            </span>
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-gray-700 font-medium">
            <Link href="/blogs" className="hover:text-indigo-600 transition-colors">
              Stories
            </Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">
              About
            </Link>
            <Link href="/createBlog" className="hover:text-indigo-600 transition-colors">
              Create Blog
            </Link>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Hi Soldiers. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
