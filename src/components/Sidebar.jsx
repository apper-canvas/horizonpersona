import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'

const Sidebar = ({ routes, activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' }
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:shadow-none border-r border-gray-200"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warm-gradient rounded-xl flex items-center justify-center shadow-soft">
                <ApperIcon name="Heart" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-heading">Persona</h1>
                <p className="text-xs text-gray-500">HR Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {routes.map((route) => (
              <motion.button
                key={route.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(route.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                  activeTab === route.id
                    ? 'bg-warm-gradient text-white shadow-soft'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <ApperIcon 
                  name={route.icon} 
                  className={`w-5 h-5 ${
                    activeTab === route.id ? 'text-white' : 'text-gray-400'
                  }`} 
                />
                <span>{route.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Admin"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Alex Johnson</p>
                <p className="text-xs text-gray-500 truncate">HR Manager</p>
              </div>
              <ApperIcon name="Settings" className="w-4 h-4 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar