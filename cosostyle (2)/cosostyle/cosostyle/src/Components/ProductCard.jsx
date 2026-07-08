import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ id, title, price, tag, image }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const saved = isInWishlist(id);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleWishlist({ id, title, price, image });
  };

  return (
    <div className="group relative flex flex-col bg-black overflow-hidden">
      {/* Display Asset Media Capture Frame Container Area */}
      <div className="relative aspect-[3/4] w-full bg-brandCardBg overflow-hidden">
        {tag && (
          <span className="absolute top-3 left-3 bg-brandRed text-white text-[10px] font-black tracking-widest px-2 py-0.5 z-10">
            {tag}
          </span>
        )}
        <button
          onClick={handleHeartClick}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:text-brandRed transition z-10 backdrop-blur-sm cursor-pointer"
        >
          <Heart size={14} className={saved ? 'fill-brandRed text-brandRed' : ''} />
        </button>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
        />
      </div>

      {/* Meta Product Details Context Box Wrapper Info Layout */}
      <div className="pt-4 pb-8 flex flex-col bg-black">
        <span className="text-[10px] font-bold tracking-widest text-brandRed mb-1">OVERSIZED</span>
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-white font-bold text-sm tracking-wide truncate max-w-[80%]">
            {title}
          </h3>
          <span className="text-neutral-400 font-medium text-xs">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}