import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'

const Sidebar = ({ routes, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()

  const handleNavClick = () => {
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  const isActiveRoute = (routePath) => {
    return location.pathname === routePath
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
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
</AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        className={`fixed left-0 top-0 z-30 h-screen w-64 bg-white shadow-2xl lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col min-h-0">
          {/* Logo/Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warm-gradient">
                <ApperIcon name="Users" className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 font-heading">HR Portal</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="X" className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar min-h-0">
            <div className="space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.id}
                  to={route.path}
                  onClick={handleNavClick}
                  className="block"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActiveRoute(route.path)
                        ? 'bg-warm-gradient text-white shadow-soft'
                        : 'text-gray-700 hover:bg-surface-100 hover:text-gray-900'
                    }`}
                  >
                    <ApperIcon
                      name={route.icon}
                      className={`h-5 w-5 ${
                        isActiveRoute(route.path) ? 'text-white' : 'text-gray-500'
                      }`}
                    />
                    <span className="font-medium">{route.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="Plus" className="h-4 w-4 text-gray-500" />
                  <span>Add Employee</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="Calendar" className="h-4 w-4 text-gray-500" />
                  <span>Request Leave</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="FileText" className="h-4 w-4 text-gray-500" />
                  <span>Upload Document</span>
                </motion.button>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-surface-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warm-gradient">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">HR Manager</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="Settings" className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar