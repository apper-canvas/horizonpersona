import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { leaveRequestService } from '../services'

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadLeaveRequests()
  }, [])

  const loadLeaveRequests = async () => {
    try {
      setLoading(true)
      const data = await leaveRequestService.getAll()
      setLeaveRequests(data)
    } catch (error) {
      toast.error('Failed to load leave requests')
    } finally {
      setLoading(false)
    }
  }

const filteredRequests = leaveRequests.filter(request => {
    if (filter === 'all') return true
    return request?.status?.toLowerCase() === filter
  })

const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800'
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

const getTypeIcon = (type) => {
    if (!type) return 'Calendar'
    switch (type.toLowerCase()) {
      case 'sick':
        return 'Heart'
      case 'vacation':
        return 'Sun'
      case 'personal':
        return 'User'
      default:
        return 'Calendar'
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Leave Management</h1>
          <p className="text-gray-600 mt-2">Track and manage leave requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
{ label: 'Total Requests', value: leaveRequests.length, icon: 'FileText', color: 'bg-blue-500' },
            { label: 'Pending', value: leaveRequests.filter(r => r?.status?.toLowerCase() === 'pending').length, icon: 'Clock', color: 'bg-yellow-500' },
            { label: 'Approved', value: leaveRequests.filter(r => r?.status?.toLowerCase() === 'approved').length, icon: 'CheckCircle', color: 'bg-green-500' },
            { label: 'Rejected', value: leaveRequests.filter(r => r?.status?.toLowerCase() === 'rejected').length, icon: 'XCircle', color: 'bg-red-500' }
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

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex space-x-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    filter === status
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
              <ApperIcon name="Plus" className="h-5 w-5" />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Leave Requests List */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
<tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => {
                  // Defensive data validation
                  if (!request || !request.id) return null
                  
                  const employeeName = request.employeeName || 'Unknown Employee'
                  const employeeId = request.employeeId || 'N/A'
                  const type = request.type || 'Unknown'
                  const status = request.status || 'pending'
                  const startDate = request.startDate || 'TBD'
                  const endDate = request.endDate || 'TBD'
                  const days = request.days || 0
                  
                  return (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-warm-gradient rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {employeeName.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employeeName}</div>
                            <div className="text-sm text-gray-500">{employeeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ApperIcon name={getTypeIcon(type)} className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{startDate} - {endDate}</div>
                          <div className="text-gray-500">{days} days</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary-dark">
                            <ApperIcon name="Eye" className="h-4 w-4" />
                          </button>
                          {status?.toLowerCase() === 'pending' && (
                            <>
                              <button className="text-green-600 hover:text-green-700">
                                <ApperIcon name="Check" className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-700">
                                <ApperIcon name="X" className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <ApperIcon name="Calendar" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
            <p className="text-gray-600">No requests match your current filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaves