import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const Successfull = () => {
  return (
    <>
        <Navbar />
        <div className="h-[calc(100vh-72px)] mt-[72px] flex items-center justify-center">
        <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl shadow-2xl z-20 flex flex-col items-center justify-center"
            >
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white text-lg font-semibold mt-3">Form submitted successfully!</p>
            </motion.div>
        </div>
    </>
  )
}

export default Successfull