import Home from '../pages/Home'
import Employees from '../pages/Employees'
import Leaves from '../pages/Leaves'
import Documents from '../pages/Documents'
import Departments from '../pages/Departments'
import NotFound from '../pages/NotFound'

export const routes = {
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    component: Home,
    path: '/'
  },
  employees: {
    id: 'employees',
    label: 'Employees',
    icon: 'Users',
    component: Employees,
    path: '/employees'
  },
  leaves: {
    id: 'leaves',
    label: 'Leave Requests',
    icon: 'Calendar',
    component: Leaves,
    path: '/leaves'
  },
  documents: {
    id: 'documents',
    label: 'Documents',
    icon: 'FileText',
    component: Documents,
    path: '/documents'
  },
  departments: {
    id: 'departments',
    label: 'Departments',
    icon: 'Building',
    component: Departments,
    path: '/departments'
  }
}

export const routeArray = Object.values(routes)