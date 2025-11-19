import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-gray-950 text-white w-full py-10 mt-12 relative overflow-hidden">
      
      {/* Subtle Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-transparent to-green-600/10 blur-2xl opacity-30 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col justify-center items-center">
        
        {/* Logo */}
        <div className="logo font-extrabold text-3xl mb-3 tracking-wide flex items-center gap-1">
          <span className="text-green-400">&lt;</span>
          <span className="hover:text-green-300 transition">Secure</span>
          <span className="text-green-400">Stack/&gt;</span>
        </div>

        {/* Line Divider */}
        <div className="w-24 h-[1px] bg-green-500/50 mb-3"></div>

        {/* Creator Text */}
        <div className="flex items-center text-sm opacity-90 hover:opacity-100 transition">
          Made with 
          <img className="w-5 mx-2 animate-pulse" src="icons/heart.png" alt="love" />
          by <span className="ml-1 font-medium">Garvit Dani</span>
        </div>

        {/* Bottom Text */}
        <p className="text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} SecureStack. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
