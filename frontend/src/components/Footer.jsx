import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin, 
  FaInstagram, 
  FaGithub,
  FaEnvelope 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", url: "#features" },
        { name: "Pricing", url: "#pricing" },
        { name: "Testimonials", url: "#testimonials" },
        { name: "Templates", url: "#templates" },
        { name: "API", url: "#api" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", url: "#docs" },
        { name: "Blog", url: "#blog" },
        { name: "Community", url: "#community" },
        { name: "Help Center", url: "#help" },
        { name: "Webinars", url: "#webinars" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", url: "#about" },
        { name: "Careers", url: "#careers" },
        { name: "Contact", url: "#contact" },
        { name: "Privacy Policy", url: "#privacy" },
        { name: "Terms of Service", url: "#terms" }
      ]
    }
  ];

  const socialLinks = [
    { icon: FaTwitter, url: "#twitter", color: "hover:text-blue-400" },
    { icon: FaFacebook, url: "#facebook", color: "hover:text-blue-600" },
    { icon: FaLinkedin, url: "#linkedin", color: "hover:text-blue-700" },
    { icon: FaInstagram, url: "#instagram", color: "hover:text-pink-500" },
    { icon: FaGithub, url: "#github", color: "hover:text-gray-200" },
    { icon: FaEnvelope, url: "#email", color: "hover:text-red-500" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-16">
      <div className="standard-max-width mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link 
              to="/" 
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-4 inline-block"
            >
              FormGita
            </Link>
            <p className="mb-6 text-gray-400 max-w-md leading-relaxed">
              Create beautiful forms, surveys, and quizzes in minutes. Collect responses, analyze data, and make better decisions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.url} 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-500 text-2xl ${social.color} transition-colors duration-300`}
                  aria-label={`Visit our ${social.url.replace('#', '')} page`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.url} 
                      className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Copyright Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 mb-4 md:mb-0">
            {currentYear} FormGita. All rights reserved.
          </p>
          <div>
            <a 
              href="#privacy" 
              className="text-gray-500 hover:text-white mr-4 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;