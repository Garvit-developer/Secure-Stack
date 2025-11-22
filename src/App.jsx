import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from "./components/Footer"
import About from './components/About'
import Contact from './components/Contact'
import Settings from './components/Settings'

function App() {
  // Initialize dark mode state from localStorage and apply class immediately
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) {
        const isDark = JSON.parse(saved)
        // Apply dark mode class immediately during initialization
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return isDark
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error)
    }
    // Ensure dark class is removed if no preference found
    document.documentElement.classList.remove('dark')
    return false
  })

  // Apply dark mode class to document element whenever darkMode state changes
  useEffect(() => {
    const htmlElement = document.documentElement
    if (darkMode) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [darkMode])

  // Toggle dark mode handler
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode
      // Save to localStorage
      try {
        localStorage.setItem('darkMode', JSON.stringify(newMode))
      } catch (error) {
        console.error('Error saving dark mode preference:', error)
      }
      return newMode
    })
  }, [])

  // Update dark mode handler (for Settings page that passes a boolean)
  const updateDarkMode = useCallback((newMode) => {
    setDarkMode(newMode)
    // Save to localStorage
    try {
      localStorage.setItem('darkMode', JSON.stringify(newMode))
    } catch (error) {
      console.error('Error saving dark mode preference:', error)
    }
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300 flex flex-col">
        <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Manager darkMode={darkMode} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={updateDarkMode} />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
          transition={Bounce}
        />

      </div>
    </Router>
  )
}

export default App
