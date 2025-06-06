import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import employeeService from '../services/api/employeeService'
import leaveRequestService from '../services/api/leaveRequestService'
import documentService from '../services/api/documentService'

const Home = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    documentsCount: 0,
    upcomingBirthdays: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const [employees, leaveRequests, documents] = await Promise.all([
          employeeService.getAll(),
          leaveRequestService.getAll(),
          documentService.getAll()
        ])

        const pendingLeaves = leaveRequests.filter(req => req.status === 'pending').length
        const upcomingBirthdays = employees.filter(emp => {
          const today = new Date()
          const empDate = new Date(emp.startDate)
          const daysDiff = Math.ceil((empDate - today) / (1000 * 60 * 60 * 24))
          return daysDiff >= 0 && daysDiff <= 7
        }).length

        setStats({
          totalEmployees: employees.length,
          pendingLeaves,
          documentsCount: documents.length,
          upcomingBirthdays
        })

        // Generate recent activity
        const activity = [
          {
            id: 1,
            type: 'leave_request',
            message: `${employees[0]?.name || 'Sarah Johnson'} submitted a vacation request`,
            time: '2 hours ago',
            icon: 'Calendar'
          },
          {
            id: 2,
            type: 'document',
            message: `New policy document uploaded: "Remote Work Guidelines"`,
            time: '4 hours ago',
            icon: 'FileText'
          },
          {
            id: 3,
            type: 'birthday',
            message: `🎂 ${employees[1]?.name || 'Mike Chen'}'s birthday is tomorrow!`,
            time: '1 day ago',
            icon: 'Gift'
          }
        ]
        setRecentActivity(activity)

      } catch (err) {
        setError('Failed to load dashboard data')
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const StatCard = ({ title, value, icon, color, gradient }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative overflow-hidden rounded-2xl p-6 shadow-paper paper-texture ${gradient} border border-white/20`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 font-heading">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
            <ApperIcon name={icon} className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
    </motion.div>
  )

  const ActivityItem = ({ activity, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-colors"
    >
      <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
        <ApperIcon name={activity.icon} className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-2xl"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Welcome back! 👋</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your team today.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-warm-gradient text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2 inline" />
            Add Employee
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon="Users"
          color="bg-blue-500"
          gradient="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        <StatCard
          title="Pending Leaves"
          value={stats.pendingLeaves}
          icon="Calendar"
          color="bg-orange-500"
          gradient="bg-gradient-to-br from-orange-50 to-orange-100"
        />
        <StatCard
          title="Documents"
          value={stats.documentsCount}
          icon="FileText"
          color="bg-green-500"
          gradient="bg-gradient-to-br from-green-50 to-green-100"
        />
        <StatCard
          title="Birthdays This Week"
          value={stats.upcomingBirthdays}
          icon="Gift"
          color="bg-pink-500"
          gradient="bg-gradient-to-br from-pink-50 to-pink-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feature */}
        <div className="lg:col-span-2">
          <MainFeature />
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-paper p-6 paper-texture"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Recent Activity</h3>
            <ApperIcon name="Activity" className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={activity.id} activity={activity} index={index} />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 p-3 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
          >
            View all activity
            <ApperIcon name="ChevronRight" className="w-4 h-4 ml-1 inline" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Home