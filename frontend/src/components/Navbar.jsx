import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { getFromStorage } from '../utils/encryptStorageutil';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [username, setUsername] = useState("User");
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { label: 'home', href: '/' },
        { label: 'dashboard', href: '/dashboard' },
        { label: 'create', href: '/create-form' },
    ];

    useEffect(() => {
        (async () => {
            const checking = await getFromStorage("utilityfunctions");
            if (checking) {
                setIsUserLogin(true)
                setUsername(checking.name)
            } else {
                setIsUserLogin(false)
            }
        })()
    }, [location])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4">
            <div className='standard-max-width mx-auto px-4'>
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center group"
                        >
                            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 group-hover:from-blue-500 group-hover:to-purple-600 transition duration-300">
                                FormGita
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 font-medium transition duration-300"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {
                                (isUserLogin) ? <div className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer">{username}</div> :
                                    (
                                        <Link
                                            to="/signup"
                                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
                                            onClick={toggleMenu}
                                        >
                                            Get Started
                                        </Link>
                                    )
                            }
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-700 hover:text-purple-600 focus:outline-none"
                            >
                                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden mt-4 pb-4 overflow-hidden"
                            >
                                <div className="flex flex-col space-y-4">
                                    {menuItems.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.href}
                                            className="text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 font-medium"
                                            onClick={toggleMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}

                                    {
                                        (isUserLogin) ? <div className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer">{username}</div> :
                                            (
                                                <Link
                                                    to="/signup"
                                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-full text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
                                                    onClick={toggleMenu}
                                                >
                                                    Get Started
                                                </Link>
                                            )
                                    }
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

