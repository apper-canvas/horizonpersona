import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import SearchInput from '@/components/molecules/SearchInput';
import SelectInput from '@/components/atoms/SelectInput';
import EmployeeCard from '@/components/molecules/EmployeeCard';
import LeaveRequestCard from '@/components/molecules/LeaveRequestCard';
import AddEmployeeForm from '@/components/organisms/AddEmployeeForm';
import employeeService from '@/services/api/employeeService';
import leaveRequestService from '@/services/api/leaveRequestService';

const EmployeeManagement = () => {
    const [activeView, setActiveView] = useState('employees');
    const [employees, setEmployees] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [showAddForm, setShowAddForm] = useState(false);

    const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];

    useEffect(() => {
        loadData();
    }, [activeView]);

    const loadData = async () => {
        setLoading(true);
        setError(null);

        try {
            if (activeView === 'employees') {
                const data = await employeeService.getAll();
                setEmployees(data);
            } else {
                const data = await leaveRequestService.getAll();
                setLeaveRequests(data);
            }
        } catch (err) {
            setError('Failed to load data');
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = async (employeeData) => {
        try {
            const result = await employeeService.create(employeeData);
            setEmployees(prev => [...prev, result]);
            setShowAddForm(false);
            toast.success('Employee added successfully! 🎉');
        } catch (err) {
            toast.error('Failed to add employee');
        }
    };

    const handleApproveLeave = async (requestId) => {
        try {
            await leaveRequestService.update(requestId, { status: 'approved' });
            setLeaveRequests(prev =>
                prev.map(req =>
                    req.id === requestId ? { ...req, status: 'approved' } : req
                )
            );
            toast.success('Leave request approved! ✅');
        } catch (err) {
            toast.error('Failed to approve leave request');
        }
    };

    const handleRejectLeave = async (requestId) => {
        try {
            await leaveRequestService.update(requestId, { status: 'rejected' });
            setLeaveRequests(prev =>
                prev.map(req =>
                    req.id === requestId ? { ...req, status: 'rejected' } : req
                )
            );
            toast.success('Leave request rejected');
        } catch (err) {
            toast.error('Failed to reject leave request');
        }
    };

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             emp.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

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
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-paper p-6 paper-texture text-center">
                <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load data</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={loadData}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-paper p-6 paper-texture">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                        <Button
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
                        </Button>
                        <Button
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
                        </Button>
                    </div>

                    {activeView === 'employees' && !showAddForm && (
                        <Button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAddForm(true)}
                            className="px-4 py-2 bg-warm-gradient text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all"
                        >
                            <ApperIcon name="Plus" className="w-4 h-4 mr-2 inline" />
                            Add Employee
                        </Button>
                    )}
                </div>

                {/* Filters for employees */}
                {activeView === 'employees' && !showAddForm && (
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                        <SearchInput
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search employees..."
                        />
                        <SelectInput
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            options={[{ value: 'all', label: 'All Departments' }, ...departments]}
                            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {showAddForm ? (
                    <AddEmployeeForm
                        onAdd={handleAddEmployee}
                        onCancel={() => setShowAddForm(false)}
                        departments={departments}
                    />
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
                                        <Button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowAddForm(true)}
                                            className="mt-4 px-6 py-3 bg-warm-gradient text-white rounded-xl font-medium shadow-soft hover:shadow-lg transition-all"
                                        >
                                            <ApperIcon name="UserPlus" className="w-4 h-4 mr-2 inline" />
                                            Add First Employee
                                        </Button>
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
                                        <LeaveRequestCard
                                            key={request.id}
                                            request={request}
                                            index={index}
                                            employee={employees.find(emp => emp.id === request.employeeId)}
                                            onApprove={handleApproveLeave}
                                            onReject={handleRejectLeave}
                                        />
                                    ))}
                                </div>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmployeeManagement;