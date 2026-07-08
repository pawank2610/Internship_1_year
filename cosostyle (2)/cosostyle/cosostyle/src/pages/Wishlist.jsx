import React from 'react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  return (
    <div className="w-full bg-black min-h-[75vh] flex flex-col justify-start pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header Block Section */}
        <div className="border-b border-neutral-900 pb-6 mb-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-3.5 bg-brand-red inline-block"></span>
            <span className="text-[10px] font-bold text-brand-red tracking-widest uppercase">SAVED FOR LATER</span>
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-black font-impact tracking-tight uppercase">
            WISHLIST
          </h1>
        </div>

        {/* Empty State Box Layout */}
        <div className="w-full border border-neutral-900 bg-black py-24 flex flex-col items-center justify-center text-center px-4">
          <h3 className="text-white font-black font-impact tracking-widest text-2xl uppercase mb-6">
            NOTHING SAVED YET
          </h3>
          <Link 
            to="/shop" 
            className="bg-brand-red hover:bg-red-700 text-white font-black text-xs tracking-widest px-8 py-3.5 uppercase transition-colors duration-200"
          >
            DISCOVER TEES
          </Link>
        </div>
      </div>
    </div>
  );
}