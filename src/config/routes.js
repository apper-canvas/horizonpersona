import Home from '../pages/Home'
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
    component: Home, // Using Home as placeholder - will be replaced with actual Employee page
    path: '/employees'
  },
  leaves: {
    id: 'leaves',
    label: 'Leave Requests',
    icon: 'Calendar',
    component: Home, // Using Home as placeholder - will be replaced with actual Leave page
    path: '/leaves'
  },
  documents: {
    id: 'documents',
    label: 'Documents',
    icon: 'FileText',
    component: Home, // Using Home as placeholder - will be replaced with actual Documents page
    path: '/documents'
  },
  departments: {
    id: 'departments',
    label: 'Departments',
    icon: 'Building',
    component: Home, // Using Home as placeholder - will be replaced with actual Departments page
    path: '/departments'
  }
}

export const routeArray = Object.values(routes)