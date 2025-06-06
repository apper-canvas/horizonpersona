import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

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
);

export default ActivityItem;