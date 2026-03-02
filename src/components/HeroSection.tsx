import React from 'react'
import { Button } from './ui/button';
import { Sparkles, PenTool, BookOpen } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:py-40">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Join 10,000+ storytellers</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block text-gray-900">Discover Inspiring</span>
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Stories & Ideas
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
            Join a vibrant community of writers, readers, and thinkers. Share your unique perspective and connect with people who matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href='/createBlog'>
            <Button
              size="lg"
              className="px-8 py-6 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <PenTool className="w-5 h-5 mr-2" />
              Start Writing Free
            </Button>
            </Link>

            <Link href='/blogs'>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-2 border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Stories
            </Button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection