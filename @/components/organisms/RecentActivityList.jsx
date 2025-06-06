import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ActivityItem from '@/components/molecules/ActivityItem';
import Button from '@/components/atoms/Button';

const RecentActivityList = ({ recentActivity }) => {
    return (
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

            <Button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 p-3 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
                View all activity
                <ApperIcon name="ChevronRight" className="w-4 h-4 ml-1 inline" />
            </Button>
        </motion.div>
    );
};

export default RecentActivityList;