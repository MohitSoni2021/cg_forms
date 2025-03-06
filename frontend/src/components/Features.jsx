import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaWpforms, 
  FaChartBar, 
  FaMobileAlt, 
  FaLock, 
  FaCloudDownloadAlt, 
  FaUserFriends 
} from 'react-icons/fa';

const Features = () => {
  const featuresList = [
    {
      icon: FaWpforms,
      title: "Easy Form Builder",
      description: "Drag and drop interface to create beautiful forms in minutes without any coding knowledge.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: FaChartBar,
      title: "Advanced Analytics",
      description: "Get real-time insights with powerful analytics and visualization tools.",
      gradient: "from-blue-500 to-teal-500"
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Responsive",
      description: "Forms work perfectly on all devices - desktop, tablet, and mobile.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: FaLock,
      title: "Secure & Private",
      description: "Enterprise-grade security with data encryption and GDPR compliance.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: FaCloudDownloadAlt,
      title: "Easy Export",
      description: "Export responses to CSV, Excel, or integrate with your favorite tools.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: FaUserFriends,
      title: "Team Collaboration",
      description: "Work together with your team to create and manage forms efficiently.",
      gradient: "from-cyan-500 to-sky-500"
    }
  ];

  return (
    <section 
      id="features" 
      className="relative py-20  standard-max-width"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create professional forms and collect data efficiently
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center 
                transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl 
                relative overflow-hidden"
              >
                {/* Gradient Background */}
                <div 
                  className={`absolute -top-full left-0 right-0 bottom-0 
                    bg-gradient-to-r ${feature.gradient} 
                    opacity-10 group-hover:opacity-20 
                    transition-all duration-300 rounded-2xl`}
                ></div>

                {/* Icon */}
                <div className={`mb-6 flex items-center justify-center 
                  bg-gradient-to-r ${feature.gradient} 
                  text-white rounded-full w-20 h-20 mx-auto 
                  transform transition duration-300 group-hover:rotate-6`}
                >
                  <feature.icon className="text-4xl" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;