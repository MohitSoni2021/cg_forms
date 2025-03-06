import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const SucessfullDeleted = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(() => {
            navigate('/dashboard')
        }, 3000);
    }, [])
  return (
        <>
        <Navbar />
    <div className="min-h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-gradient-to-r from-red-400 to-red-600 p-6 rounded-xl shadow-2xl mx-auto mt-20 max-w-md flex flex-col items-center"
        >
          <svg className="w-12 h-12 text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white font-bold text-center text-2xl">
            Form deleted successfully!
          </p>
        </motion.div>
    </div>
        </>
  )
}

export default SucessfullDeleted