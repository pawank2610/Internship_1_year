import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Trash2, X, Check } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';

// 1. THIS IS THE CRUCIAL PART: The Wishlist UI component code written inline 
// so you don't have to worry about broken folder or file imports!
function WishlistComponent() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Which saved item is currently open in the quick-view modal
  const [activeItem, setActiveItem] = useState(null);
  const [justAdded, setJustAdded] = useState(false);

  const openItem = (item) => {
    setActiveItem(item);
    setJustAdded(false);
  };

  const closeItem = () => setActiveItem(null);

  const handleAddToBag = () => {
    if (!activeItem) return;
    addToCart({
      id: activeItem.id,
      title: activeItem.title,
      price: activeItem.price,
      image: activeItem.image,
    });
    setJustAdded(true);
    setTimeout(() => setActiveItem(null), 700);
  };

  return (
    <div className="w-full bg-black min-h-[60vh] flex flex-col justify-start pt-16 pb-24">
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

        {wishlistItems.length === 0 ? (
          /* Empty State Box Layout */
          <div className="w-full border border-neutral-900 bg-black py-24 flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-white font-black font-impact tracking-widest text-2xl uppercase mb-6">
              NOTHING SAVED YET
            </h3>
            <a 
              href="/shop" 
              className="bg-brand-red hover:bg-red-700 text-white font-black text-xs tracking-widest px-8 py-3.5 uppercase transition-colors duration-200"
            >
              DISCOVER TEES
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openItem(item)}
                className="group cursor-pointer flex flex-col w-full"
              >
                <div className="w-full aspect-[3/4] bg-[#0A0A0C] border border-neutral-900 overflow-hidden relative flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // don't also open the quick-view modal
                      removeFromWishlist(item.id);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:text-brand-red transition backdrop-blur-sm z-10"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/80 border border-neutral-800 text-[10px] font-black tracking-widest text-white px-2.5 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Quick View
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-0.5">
                  <h3 className="text-white text-xs font-bold tracking-wide uppercase group-hover:text-brand-red transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-xs font-bold">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL: image + add to bag */}
      {activeItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md px-4">
          <div className="absolute inset-0" onClick={closeItem}></div>

          <div className="relative w-full max-w-4xl bg-[#08080A] border border-neutral-900 shadow-2xl z-10 flex flex-col md:flex-row h-[85vh] md:h-[75vh]">
            <button
              onClick={closeItem}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors bg-black/60 p-2 z-30 border border-neutral-800 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Left image viewport */}
            <div className="w-full md:w-3/5 h-2/3 md:h-full relative flex items-center justify-center bg-black border-b md:border-b-0 md:border-r border-neutral-900 overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain object-center select-none"
              />
            </div>

            {/* Right specs panel */}
            <div className="w-full md:w-2/5 p-6 flex flex-col justify-between h-1/3 md:h-full">
              <div className="flex flex-col">
                <span className="text-[10px] text-brand-red font-black tracking-widest uppercase mb-1">SAVED ITEM</span>
                <h2 className="text-white text-2xl font-black tracking-tight font-impact uppercase leading-tight mb-2">
                  {activeItem.title}
                </h2>
                <div className="text-xl font-bold text-white mb-4">
                  ${activeItem.price.toFixed(2)}
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed tracking-wide mb-6">
                  Heavyweight 240 GSM cotton, saved from your browsing. Add it to your bag whenever you're ready.
                </p>
              </div>

              <button
                onClick={handleAddToBag}
                disabled={justAdded}
                className="w-full bg-brand-red hover:bg-red-700 disabled:bg-green-700 text-white text-xs font-black tracking-widest py-4 uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {justAdded ? (
                  <>
                    <Check size={14} strokeWidth={3} /> ADDED TO BAG
                  </>
                ) : (
                  'ADD TO BAG'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Main Application App shell execution mapping router layout trees
export default function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <div className="flex flex-col min-h-screen bg-black text-white antialiased">
            <Navbar />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                {/* 3. Forces the page route context to render the exact design variant requested */}
                <Route path="/wishlist" element={<WishlistComponent />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}