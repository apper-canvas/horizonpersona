import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import { documentService } from '../services'

const Documents = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const data = await documentService.getAll()
      setDocuments(data)
    } catch (error) {
      toast.error('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

const filteredDocuments = documents.filter(doc => {
    const title = doc?.title || ''
    const category = doc?.category || ''
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(documents.map(doc => doc.category))]

const getFileIcon = (type) => {
    if (!type) return 'FileText'
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'FileText'
      case 'doc':
      case 'docx':
        return 'File'
      case 'xls':
      case 'xlsx':
        return 'FileSpreadsheet'
      default:
        return 'FileText'
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Document Management</h1>
          <p className="text-gray-600 mt-2">Organize and manage your HR documents</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total Documents', value: documents.length, icon: 'FileText', color: 'bg-blue-500' },
            { label: 'Categories', value: categories.length, icon: 'Folder', color: 'bg-green-500' },
{ label: 'This Month', value: documents.filter(d => d?.uploadDate && new Date(d.uploadDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length, icon: 'Upload', color: 'bg-purple-500' },
            { label: 'Shared', value: documents.filter(d => d?.shared === true).length, icon: 'Share', color: 'bg-orange-500' }
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

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
              <ApperIcon name="Upload" className="h-5 w-5" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-card transition-all"
            >
<div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name={getFileIcon(document?.fileType)} className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{document?.title || 'Untitled Document'}</h3>
                    <p className="text-gray-500 text-sm">{(document?.fileType || 'unknown').toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                    <ApperIcon name="Download" className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-primary transition-colors">
                    <ApperIcon name="Share" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-900">{document?.category || 'Uncategorized'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="text-gray-900">{document?.fileType || 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Uploaded:</span>
                  <span className="text-gray-900">{document?.uploadDate || 'Unknown date'}</span>
                </div>
                {document?.employeeId && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Employee ID:</span>
                    <span className="text-gray-900">{document.employeeId}</span>
                  </div>
                )}
              </div>

<div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  document?.employeeId === null 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {document?.employeeId === null ? 'Public' : 'Employee Specific'}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                    <ApperIcon name="Eye" className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                    <ApperIcon name="Edit" className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <ApperIcon name="Trash2" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <ApperIcon name="FileText" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or upload some documents</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Documents