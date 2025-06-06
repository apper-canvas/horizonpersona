import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

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
);

export default EmployeeCard;