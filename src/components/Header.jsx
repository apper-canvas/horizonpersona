import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const Header = ({ setSidebarOpen, darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
      {/* Mobile menu button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ApperIcon name="Menu" className="w-5 h-5" />
      </motion.button>

      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees, documents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name="Bell" className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
        </motion.button>

        {/* Dark mode toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5" />
        </motion.button>

        {/* Profile dropdown trigger */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Profile"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
        </motion.button>
      </div>
    </header>
  )
}

export default Header