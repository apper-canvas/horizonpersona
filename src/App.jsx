import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { routes, routeArray } from './config/routes'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const currentRoute = routes[activeTab]

  return (
    <div className={`min-h-screen bg-surface-50 ${darkMode ? 'dark' : ''}`}>
      <Router>
        <div className="flex h-screen overflow-hidden">
          <Sidebar 
            routes={routeArray}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header 
              setSidebarOpen={setSidebarOpen}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
            
            <main className="flex-1 overflow-auto bg-surface-50 dark:bg-gray-900">
              <div className="h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <currentRoute.component />
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>

        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
        toastClassName="font-sans"
        progressClassName="bg-primary"
      />
    </div>
  )
}

export default App