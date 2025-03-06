import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br  standard-max-width py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Beautiful Forms</span> 
              <br />
              in Minutes
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Effortlessly design professional surveys, quizzes, and data collection forms with our intuitive drag-and-drop builder.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/dashboard" 
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                Get Started Free
              </Link>
              <Link 
                to="/features" 
                className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-50 transition duration-300 ease-in-out"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-8 flex justify-center md:justify-start space-x-4 text-gray-500">
              <span>✓ No credit card required</span>
              <span>✓ Easy to use</span>
            </div>
          </motion.div>
          
          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-2xl animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-2xl animate-blob animation-delay-2000"></div>
            
            <img 
              src="https://codinggita.com/assets/neel-UYNKFEio.svg" 
              alt="Form Builder" 
              className="relative z-10 w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/indigo/white?text=FormGita';
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;