import React from 'react'

const About = () => {
  return (
    <div className="min-h-[82.7vh] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            About PassOP
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your secure, feature-rich password manager
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Secure Storage</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All your passwords are stored locally in your browser. Your data never leaves your device, ensuring maximum privacy and security.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quick access to all your passwords with powerful search and filter capabilities. Find what you need in seconds.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Beautiful UI</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Modern, intuitive interface with dark mode support. Enjoy a pleasant experience while managing your passwords.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Powerful Features</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Password generator, strength checker, categories, export/import, and more. Everything you need in one place.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Secure local storage</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Password strength indicator</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Advanced password generator</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Search and filter passwords</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Category organization</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Export/Import functionality</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Statistics dashboard</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Dark mode support</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default About

