import React from 'react'
import { toast } from 'react-toastify'

const Settings = ({ darkMode, setDarkMode }) => {

  const handleDarkModeToggle = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    toast.success(`Dark mode ${newMode ? 'enabled' : 'disabled'}`, {
      autoClose: 2000,
    })
  }

  const handleExport = () => {
    const passwords = localStorage.getItem('passwords')
    if (!passwords) {
      toast.error('No passwords to export', {
        autoClose: 2000,
      })
      return
    }

    const data = JSON.parse(passwords)
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `passwords-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Passwords exported successfully!', {
      autoClose: 2000,
    })
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result)
        if (Array.isArray(importedData)) {
          localStorage.setItem('passwords', JSON.stringify(importedData))
          toast.success('Passwords imported successfully! Please refresh the page.', {
            autoClose: 2000,
          })
          setTimeout(() => window.location.reload(), 1500)
        } else {
          toast.error('Invalid file format', {
            autoClose: 2000,
          })
        }
      } catch {
        toast.error('Error reading file. Please check the format.', {
          autoClose: 2000,
        })
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all passwords? This action cannot be undone!')) {
      localStorage.removeItem('passwords')
      toast.success('All passwords cleared! Please refresh the page.', {
        autoClose: 2000,
      })
      setTimeout(() => window.location.reload(), 1500)
    }
  }

  return (
    <div className="min-h-[82.7vh] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Customize your PassOP experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Appearance</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dark Mode</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
              </div>
              <button
                onClick={handleDarkModeToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-green-500' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Data Management</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Export Passwords</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Download all your passwords as a JSON file
                </p>
                <button
                  onClick={handleExport}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  Export Passwords
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Import Passwords</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Import passwords from a JSON file
                </p>
                <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 cursor-pointer inline-block">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                  Import Passwords
                </label>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">Danger Zone</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Permanently delete all stored passwords
                </p>
                <button
                  onClick={handleClearAll}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  Clear All Passwords
                </button>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About PassOP</h2>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p><strong>Version:</strong> 2.0.0</p>
              <p><strong>Created by:</strong> Garvit Dani</p>
              <p><strong>Storage:</strong> Local (Browser)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                All your passwords are stored locally in your browser. No data is sent to any server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

