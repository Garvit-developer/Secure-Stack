import React from 'react'

const About = () => {
  return (
    <div className="min-h-[82.7vh] py-8 px-4 md:px-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="text-center space-y-6">
         
          <h1 className="text-4xl bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent md:text-5xl font-bold tracking-tight leading-tight">
            Our Vision is Digital Security <br />
         
          </h1>
          <p className="text-lg font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-5xl mx-auto">
            We believe that privacy isn't a feature—it's a fundamental right.
            SecureStack was built to give you back control of your digital life.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="prose prose-lg prose-indigo dark:prose-invert ">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-8">
            In an age where data breaches are headlines and cookies follow you everywhere,
            it feels like nothing is truly private anymore. We built SecureStack because
            we were tired of choosing between convenience and security.
          </p>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-8 mt-6">
            Most password managers store your keys on their servers. We don't.
            <span className="font-semibold text-slate-900 dark:text-white"> Your data lives on your device</span>.
            It never leaves your browser unless you explicitly export it. No backdoors,
            no cloud leaks, just a clean, powerful vault that belongs to you—and only you.
          </p>
        </div>

        {/* Key Philosophy Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300">
              �
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Zero-Knowledge Storage
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We can't see your passwords even if we wanted to. Everything is encrypted locally before it's saved.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300">
              👐
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Open & Transparent
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Trust is earned through transparency. Our code is open source, so anyone can verify exactly how their data is handled.
            </p>
          </div>
        </div>

        {/* Closing */}
        <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-500 italic text-lg font-medium">
            "Security shouldn't be complicated. It should just work."
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
