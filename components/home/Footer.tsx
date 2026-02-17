import React from "react";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-16 border-t border-zinc-700/50">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-50" />
      
      <div className="container mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">
              F1<span className="text-red-600">DASH</span>
            </h3>
            <p className="text-zinc-400 text-sm">Built for you</p>
            <p className="text-zinc-500 text-sm">Built by Xander Ranc</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;