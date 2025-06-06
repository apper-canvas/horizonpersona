import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

export const routes = {
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    component: Home,
    path: '/'
  }
}

export const routeArray = Object.values(routes)