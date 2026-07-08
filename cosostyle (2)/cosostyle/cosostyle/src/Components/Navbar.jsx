import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();
  const { wishlistCount } = useWishlist();

  // Toggle states for the shopping bag drawer, auth menu, and expanding search bar
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const searchInputRef = useRef(null);

  // Focus the input box automatically as soon as it animates open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const bannerItems = [
    "100% PURE COTTON",
    "FREE SHIPPING OVER $80",
    "NEW DROP",
    "LIMITED INVENTORY"
  ];

  const MarqueeTrack = () => (
    <div className="flex items-center gap-16 shrink-0 pr-16">
      {bannerItems.map((item, idx) => (
        <span key={idx} className="flex items-center gap-16 whitespace-nowrap">
          {item} <span className="text-neutral-600">•</span>
          {item} <span className="text-neutral-500">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <>
      <header className="w-full bg-black border-b border-neutral-900 sticky top-0 z-50">
        
        {/* Infinite Moving Announcement Ribbon */}
        <div className="w-full bg-brand-red text-white py-2 text-[11px] font-black tracking-widest uppercase overflow-hidden flex select-none">
          <div className="animate-marquee flex">
            <MarqueeTrack />
            <MarqueeTrack />
          </div>
        </div>

        {/* Main Navbar Row Elements */}
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative">
          
          {/* Logo Brand Wrapper */}
          <Link to="/" className="flex items-center h-12">
            <img 
              src="/src/assets/WhatsApp Image 2026-06-16 at 10.01.05 AM.jpeg" 
              alt="CosoStyle Logo" 
              className="h-full object-contain filter brightness-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden bg-neutral-900 border border-neutral-800 px-3 py-1.5 tracking-tighter">
              <span className="text-white font-medium text-sm">coso</span>
              <span className="text-brand-red font-black text-sm">style</span>
            </div>
          </Link>

          {/* Primary Nav Links */}
          <nav className="flex items-center gap-8 text-xs font-bold tracking-widest text-neutral-400">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-brand-red" : "hover:text-white transition"}>HOME</NavLink>
            <NavLink to="/shop" className={({ isActive }) => isActive ? "text-brand-red" : "hover:text-white transition"}>SHOP</NavLink>
            <NavLink to="/shop?category=oversized" className="hover:text-white transition">OVERSIZED</NavLink>
            <NavLink to="/shop?category=graphic" className="hover:text-white transition">GRAPHIC</NavLink>
            <NavLink to="/shop?category=classic" className="hover:text-white transition">CLASSIC</NavLink>
          </nav>

          {/* Utility Icon Actions Row */}
          <div className="flex items-center gap-5 text-white relative h-10">
            
            {/* Morphing & Expanding Animated Search Input Container */}
            <div className="relative flex items-center justify-end">
              <div 
                className={`flex items-center bg-[#0F0F11] border border-neutral-800 rounded-none overflow-hidden transition-all duration-300 ease-out h-9 ${
                  isSearchOpen ? 'w-64 px-3 opacity-100' : 'w-0 px-0 opacity-0 pointer-events-none'
                }`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search tees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white placeholder-neutral-500 text-xs tracking-wider uppercase font-bold outline-none w-full pr-2"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-neutral-500 hover:text-white mr-1">
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* The Static/Animating Action Icon Trigger */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className={`hover:text-brand-red transition-colors duration-200 cursor-pointer block p-1 ${
                  isSearchOpen ? 'text-brand-red absolute right-2' : 'text-white'
                }`}
              >
                <Search size={18} strokeWidth={2.5} />
              </button>
            </div>
            
            {/* Wishlist Heart Redirect Link */}
            <Link to="/wishlist" className="hover:text-brand-red text-white transition relative block p-1">
              <Heart size={18} strokeWidth={2.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Shopping Bag Open Drawer Handler */}
            <button onClick={() => setIsBagOpen(true)} className="hover:text-brand-red transition cursor-pointer relative block p-1">
              <ShoppingBag size={18} strokeWidth={2.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Menu Dropdown Controls */}
            <div className="relative">
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="hover:text-brand-red transition cursor-pointer block p-1">
                <User size={18} strokeWidth={2.5} />
              </button>

              {/* Context Dropdown Box Overlay */}
              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-4 w-48 bg-[#0F0F11] border border-neutral-800 py-2 shadow-2xl z-20">
                    <button className="w-full text-left px-4 py-3 text-xs font-bold tracking-wider text-neutral-300 hover:bg-neutral-900 transition cursor-pointer">
                      Log In
                    </button>
                    <button className="w-full text-left px-4 py-3 text-xs font-bold tracking-wider text-brand-red hover:bg-neutral-900 transition border-t border-neutral-900 cursor-pointer">
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Cart Overlay Drawer Canvas */}
      {isBagOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsBagOpen(false)}
          ></div>

          {/* Drawer Body Panel */}
          <div className="w-full max-w-md h-full bg-black border-l border-neutral-900 p-6 relative flex flex-col justify-between z-10">
            
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <h2 className="text-white font-black font-impact tracking-widest text-xl uppercase">YOUR BAG</h2>
              <button 
                onClick={() => setIsBagOpen(false)}
                className="text-neutral-400 hover:text-white transition p-1 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h3 className="text-white font-black font-impact tracking-widest text-2xl uppercase mb-2">BAG IS EMPTY</h3>
                <p className="text-neutral-500 text-xs tracking-wide max-w-xs mb-8">
                  Add some heavyweight cotton to your collection.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsBagOpen(false)}
                  className="bg-brand-red hover:bg-red-700 text-white font-black text-xs tracking-widest px-8 py-3.5 uppercase transition"
                >
                  SHOP THE COLLECTION
                </Link>
              </div>
            ) : (
              <>
                {/* Scrollable Cart Line Items List */}
                <div className="flex-grow overflow-y-auto py-4 flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b border-neutral-900 pb-4">
                      <div className="w-16 h-20 bg-[#0F0F11] border border-neutral-800 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-white text-xs font-bold tracking-wide uppercase line-clamp-2">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-500 hover:text-brand-red transition shrink-0 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-neutral-800">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-neutral-400 hover:text-white transition cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-neutral-400 hover:text-white transition cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-neutral-300 text-xs font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Checkout Footer */}
                <div className="border-t border-neutral-900 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">Subtotal</span>
                    <span className="text-white text-lg font-black">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-brand-red hover:bg-red-700 text-white font-black text-xs tracking-widest py-4 uppercase transition cursor-pointer">
                    CHECKOUT
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}