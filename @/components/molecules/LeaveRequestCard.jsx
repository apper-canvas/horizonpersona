import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const LeaveRequestCard = ({ request, index, employee, onApprove, onReject }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

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
                    <Button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onApprove(request.id)}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                        <ApperIcon name="Check" className="w-4 h-4 mr-1 inline" />
                        Approve
                    </Button>
                    <Button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onReject(request.id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                        <ApperIcon name="X" className="w-4 h-4 mr-1 inline" />
                        Reject
                    </Button>
                </div>
            )}
        </motion.div>
    );
};

export default LeaveRequestCard;