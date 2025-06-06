import React from 'react';
import StatCard from '@/components/molecules/StatCard';

const DashboardStatsGrid = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total Employees"
                value={stats.totalEmployees}
                icon="Users"
                color="bg-blue-500"
                gradient="bg-gradient-to-br from-blue-50 to-blue-100"
            />
            <StatCard
                title="Pending Leaves"
                value={stats.pendingLeaves}
                icon="Calendar"
                color="bg-orange-500"
                gradient="bg-gradient-to-br from-orange-50 to-orange-100"
            />
            <StatCard
                title="Documents"
                value={stats.documentsCount}
                icon="FileText"
                color="bg-green-500"
                gradient="bg-gradient-to-br from-green-50 to-green-100"
            />
            <StatCard
                title="Birthdays This Week"
                value={stats.upcomingBirthdays}
                icon="Gift"
                color="bg-pink-500"
                gradient="bg-gradient-to-br from-pink-50 to-pink-100"
            />
        </div>
    );
};

export default DashboardStatsGrid;