import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';

const AddEmployeeForm = ({ onAdd, onCancel, departments }) => {
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        role: '',
        department: '',
        phone: '',
        skills: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.department) {
            toast.error('Please fill in all required fields');
            return;
        }

        const employeeData = {
            ...newEmployee,
            skills: newEmployee.skills.split(',').map(s => s.trim()).filter(Boolean),
            startDate: new Date().toISOString().split('T')[0],
            avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=150&h=150&fit=crop&crop=face`
        };

        onAdd(employeeData); // Pass data up to parent organism
        setNewEmployee({ name: '', email: '', role: '', department: '', phone: '', skills: '' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-6 shadow-paper paper-texture border border-gray-100"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 font-heading">Add New Employee</h3>
                <Button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onCancel}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                    <ApperIcon name="X" className="w-4 h-4" />
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        id="name"
                        label="Full Name *"
                        type="text"
                        name="name"
                        value={newEmployee.name}
                        onChange={handleInputChange}
                        required
                    />
                    <FormField
                        id="email"
                        label="Email Address *"
                        type="email"
                        name="email"
                        value={newEmployee.email}
                        onChange={handleInputChange}
                        required
                    />
                    <FormField
                        id="role"
                        label="Job Title *"
                        type="text"
                        name="role"
                        value={newEmployee.role}
                        onChange={handleInputChange}
                        required
                    />
                    <FormField
                        id="department"
                        label="Select Department"
                        name="department"
                        value={newEmployee.department}
                        onChange={handleInputChange}
                        isSelect
                        options={[{ value: '', label: 'Select Department' }, ...departments.map(d => ({ value: d, label: d }))]}
                        required
                    />
                    <FormField
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        value={newEmployee.phone}
                        onChange={handleInputChange}
                    />
                    <FormField
                        id="skills"
                        label="Skills (comma separated)"
                        type="text"
                        name="skills"
                        value={newEmployee.skills}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex space-x-3 pt-4">
                    <Button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-6 py-3 bg-warm-gradient text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all"
                    >
                        <ApperIcon name="UserPlus" className="w-4 h-4 mr-2 inline" />
                        Add Employee
                    </Button>
                    <Button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onCancel}
                        className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddEmployeeForm;