import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">
              F1<span className="text-red-600">DASH</span>
            </h3>
            <p className="text-zinc-500 text-sm">Built for you. UwU</p>
            <p className="text-zinc-500 text-sm">Built by Xander Ranc</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
