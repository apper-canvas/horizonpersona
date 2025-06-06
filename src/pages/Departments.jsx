import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { departmentService, employeeService } from '../services'

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [deptData, empData] = await Promise.all([
        departmentService.getAll(),
        employeeService.getAll()
      ])
      setDepartments(deptData)
      setEmployees(empData)
    } catch (error) {
      toast.error('Failed to load department data')
    } finally {
      setLoading(false)
    }
  }

  const getDepartmentStats = (deptName) => {
    const deptEmployees = employees.filter(emp => emp.department === deptName)
    return {
      totalEmployees: deptEmployees.length,
      activeEmployees: deptEmployees.filter(emp => emp.status === 'Active').length
    }
  }

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-6 h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Department Management</h1>
          <p className="text-gray-600 mt-2">Organize and manage organizational departments</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total Departments', value: departments.length, icon: 'Building', color: 'bg-blue-500' },
            { label: 'Total Employees', value: employees.length, icon: 'Users', color: 'bg-green-500' },
            { label: 'Active Employees', value: employees.filter(emp => emp.status === 'Active').length, icon: 'UserCheck', color: 'bg-purple-500' },
            { label: 'Avg per Dept', value: departments.length > 0 ? Math.round(employees.length / departments.length) : 0, icon: 'TrendingUp', color: 'bg-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <ApperIcon name={stat.icon} className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
              <ApperIcon name="Plus" className="h-5 w-5" />
              <span>Add Department</span>
            </button>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => {
            const stats = getDepartmentStats(department.name)
            return (
              <motion.div
                key={department.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-soft p-6 hover:shadow-card transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-warm-gradient rounded-lg flex items-center justify-center">
                      <ApperIcon name="Building" className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{department.name}</h3>
                      <p className="text-gray-500 text-sm">{department.code}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                      <ApperIcon name="Edit" className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <ApperIcon name="Trash2" className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{department.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="User" className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Manager</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{department.manager}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="MapPin" className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Location</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{department.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Users" className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Employees</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {stats.activeEmployees}/{stats.totalEmployees}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="DollarSign" className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Budget</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${department.budget?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      department.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {department.status}
                    </span>
                    <button className="px-3 py-1 text-sm text-primary hover:text-primary-dark transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12">
            <ApperIcon name="Building" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Departments