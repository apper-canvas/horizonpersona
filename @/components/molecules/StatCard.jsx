import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

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
);

export default StatCard;