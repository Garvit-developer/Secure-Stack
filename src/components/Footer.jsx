import React from 'react'
import { FaHeart } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-1.5 rounded-md">
                        <span className="text-white font-bold text-sm tracking-tighter">SS</span>
                    </div>
                    <span className="font-bold text-lg text-slate-700 dark:text-slate-200">
                        SecureStack
                    </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center gap-1">
                    Created with <FaHeart className="text-red-500 animate-pulse" /> by
                    <a href="https://github.com/Garvit-developer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                        Garvit Dani
                    </a>
                </p>

                <p className="text-slate-400 dark:text-slate-600 text-xs mt-2">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer