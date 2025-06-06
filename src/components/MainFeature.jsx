import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import employeeService from '../services/api/employeeService'
import leaveRequestService from '../services/api/leaveRequestService'

const MainFeature = () => {
  const [activeView, setActiveView] = useState('employees')
  const [employees, setEmployees] = useState([])
  const [leaveRequests, setLeaveRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    skills: ''
  })

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance']

  useEffect(() => {
    loadData()
  }, [activeView])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      if (activeView === 'employees') {
        const data = await employeeService.getAll()
        setEmployees(data)
      } else {
        const data = await leaveRequestService.getAll()
        setLeaveRequests(data)
      }
    } catch (err) {
      setError('Failed to load data')
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmployee = async (e) => {
    e.preventDefault()
    
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.department) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const employeeData = {
        ...newEmployee,
        skills: newEmployee.skills.split(',').map(s => s.trim()).filter(Boolean),
        startDate: new Date().toISOString().split('T')[0],
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=150&h=150&fit=crop&crop=face`
      }
      
      const result = await employeeService.create(employeeData)
      setEmployees(prev => [...prev, result])
      setNewEmployee({ name: '', email: '', role: '', department: '', phone: '', skills: '' })
      setShowAddForm(false)
      toast.success('Employee added successfully! 🎉')
    } catch (err) {
      toast.error('Failed to add employee')
    }
  }

  const handleApproveLeave = async (requestId) => {
    try {
      await leaveRequestService.update(requestId, { status: 'approved' })
      setLeaveRequests(prev => 
        prev.map(req => 
          req.id === requestId ? { ...req, status: 'approved' } : req
        )
      )
      toast.success('Leave request approved! ✅')
    } catch (err) {
      toast.error('Failed to approve leave request')
    }
  }

  const handleRejectLeave = async (requestId) => {
    try {
      await leaveRequestService.update(requestId, { status: 'rejected' })
      setLeaveRequests(prev => 
        prev.map(req => 
          req.id === requestId ? { ...req, status: 'rejected' } : req
        )
      )
      toast.success('Leave request rejected')
    } catch (err) {
      toast.error('Failed to reject leave request')
    }
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const EmployeeCard = ({ employee, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white rounded-2xl p-6 shadow-paper hover:shadow-lg transition-all paper-texture border border-gray-100"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 font-heading truncate">{employee.name}</h3>
          <p className="text-sm text-gray-600 truncate">{employee.role}</p>
          <div className="flex items-center mt-2">
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium">
              {employee.department}
            </span>
          </div>
          
          {employee.skills && employee.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {employee.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                >
                  {skill}
                </span>
              ))}
              {employee.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                  +{employee.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          <ApperIcon name="MoreVertical" className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )

  const LeaveRequestCard = ({ request, index }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800'
        case 'approved': return 'bg-green-100 text-green-800'
        case 'rejected': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }

    const employee = employees.find(emp => emp.id === request.employeeId)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-paper paper-texture border border-gray-100"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={employee?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`}
              alt={employee?.name || 'Employee'}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 font-heading">
                {employee?.name || 'Unknown Employee'}
              </h3>
              <p className="text-sm text-gray-600">{request.type} Leave</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(request.status)}`}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
            {request.startDate} to {request.endDate}
          </div>
          {request.reason && (
            <div className="flex items-start text-sm text-gray-600">
              <ApperIcon name="MessageSquare" className="w-4 h-4 mr-2 mt-0.5" />
              <span>{request.reason}</span>
            </div>
          )}
        </div>

        {request.status === 'pending' && (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleApproveLeave(request.id)}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              <ApperIcon name="Check" className="w-4 h-4 mr-1 inline" />
              Approve
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRejectLeave(request.id)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              <ApperIcon name="X" className="w-4 h-4 mr-1 inline" />
              Reject
            </motion.button>
          </div>
        )}
      </motion.div>
    )
  }

  const AddEmployeeForm = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl p-6 shadow-paper paper-texture border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 font-heading">Add New Employee</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddForm(false)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </motion.button>
      </div>

      <form onSubmit={handleAddEmployee} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all peer placeholder-transparent"
              placeholder="Full Name"
              required
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">
              Full Name *
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all peer placeholder-transparent"
              placeholder="Email Address"
              required
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">
              Email Address *
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all peer placeholder-transparent"
              placeholder="Job Title"
              required
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">
              Job Title *
            </label>
          </div>

          <div className="relative">
            <select
              value={newEmployee.department}
              onChange={(e) => setNewEmployee(prev => ({ ...prev, department: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <input
              type="tel"
              value={newEmployee.phone}
              onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all peer placeholder-transparent"
              placeholder="Phone Number"
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">
              Phone Number
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              value={newEmployee.skills}
              onChange={(e) => setNewEmployee(prev => ({ ...prev, skills: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all peer placeholder-transparent"
              placeholder="Skills (comma separated)"
            />
            <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">
              Skills (comma separated)
            </label>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 bg-warm-gradient text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all"
          >
            <ApperIcon name="UserPlus" className="w-4 h-4 mr-2 inline" />
            Add Employee
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(false)}
            className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  )

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-paper p-6 paper-texture">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-paper p-6 paper-texture text-center">
        <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load data</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadData}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Try Again
        </motion.button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-paper p-6 paper-texture">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView('employees')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'employees'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ApperIcon name="Users" className="w-4 h-4 mr-2 inline" />
              Employees
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView('leaves')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'leaves'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ApperIcon name="Calendar" className="w-4 h-4 mr-2 inline" />
              Leave Requests
            </motion.button>
          </div>

          {activeView === 'employees' && !showAddForm && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-warm-gradient text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2 inline" />
              Add Employee
            </motion.button>
          )}
        </div>

        {/* Filters for employees */}
        {activeView === 'employees' && !showAddForm && (
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
            <div className="relative flex-1">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {showAddForm ? (
          <AddEmployeeForm />
        ) : (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeView === 'employees' ? (
              filteredEmployees.length === 0 ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl shadow-paper p-12 text-center paper-texture"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <ApperIcon name="Users" className="w-16 h-16 text-gray-300 mx-auto" />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 font-heading">
                    {searchTerm || selectedDepartment !== 'all' ? 'No employees found' : 'No employees yet'}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {searchTerm || selectedDepartment !== 'all' 
                      ? 'Try adjusting your filters to find what you\'re looking for.'
                      : 'Get started by adding your first team member to Persona.'
                    }
                  </p>
                  {!searchTerm && selectedDepartment === 'all' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAddForm(true)}
                      className="mt-4 px-6 py-3 bg-warm-gradient text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all"
                    >
                      <ApperIcon name="UserPlus" className="w-4 h-4 mr-2 inline" />
                      Add First Employee
                    </motion.button>
                  )}
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEmployees.map((employee, index) => (
                    <EmployeeCard key={employee.id} employee={employee} index={index} />
                  ))}
                </div>
              )
            ) : (
              leaveRequests.length === 0 ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl shadow-paper p-12 text-center paper-texture"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <ApperIcon name="Calendar" className="w-16 h-16 text-gray-300 mx-auto" />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 font-heading">No leave requests</h3>
                  <p className="mt-2 text-gray-500">
                    All caught up! No pending leave requests at the moment.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {leaveRequests.map((request, index) => (
                    <LeaveRequestCard key={request.id} request={request} index={index} />
                  ))}
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature