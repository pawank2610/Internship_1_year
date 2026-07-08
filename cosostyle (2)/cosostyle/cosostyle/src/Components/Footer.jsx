import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Summary Description Block Layout Column Info */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-block bg-[#1C1C1E] border border-neutral-800 px-3 py-1.5 tracking-tighter mb-4">
              <span className="text-white font-medium text-sm">coso</span>
              <span className="text-brandRed font-black text-sm">style</span>
            </div>
            <p className="text-neutral-500 text-xs leading-relaxed max-w-sm">
              Pure cotton. Pure intention. CosoStyle crafts heavyweight tees in limited runs — designed in our studio, made to outlast trends.
            </p>
          </div>
          {/* Action Social Icon Navigation List Array Links */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition"><Instagram size={14} /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition"><Twitter size={14} /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-500 transition"><Youtube size={14} /></a>
          </div>
        </div>

        {/* Navigation Map Navigation Links Target List Menu Block */}
        <div className="md:col-span-3 col-span-6">
          <h4 className="text-brandRed font-bold text-xs tracking-widest uppercase mb-4">SHOP</h4>
          <ul className="text-xs text-neutral-400 space-y-3 font-medium">
            <li><Link to="/shop" className="hover:text-white transition">All Tees</Link></li>
            <li><Link to="/shop?category=oversized" className="hover:text-white transition">Oversized</Link></li>
            <li><Link to="/shop?category=graphic" className="hover:text-white transition">Graphic</Link></li>
            <li><Link to="/shop?category=classic" className="hover:text-white transition">Classic</Link></li>
          </ul>
        </div>

        {/* Customer Experience Help Support Hyperlinks Context Layout */}
        <div className="md:col-span-4 col-span-6">
          <h4 className="text-brandRed font-bold text-xs tracking-widest uppercase mb-4">HELP</h4>
          <ul className="text-xs text-neutral-400 space-y-3 font-medium">
            <li><a href="#" className="hover:text-white transition">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition">Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Frame Bottom Border Copy Footnotes Meta Layer Details Container Grid */}
      <div className="max-w-7xl mx-auto px-4 border-t border-neutral-950 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-600 tracking-wider font-medium">
        <span>© 2026 COSOSTYLE. PURE COTTON. PURE STYLE.</span>
        <span>CRAFTED • MADE TO OUTLAST</span>
      </div>
    </footer>
  );
}