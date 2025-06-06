import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="mb-8"
        >
          <ApperIcon name="Search" className="w-24 h-24 text-primary mx-auto" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-primary mb-4 font-heading">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back to where you belong.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-warm-gradient text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all"
        >
          <ApperIcon name="Home" className="w-4 h-4 mr-2 inline" />
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>
  )
}

export default NotFound