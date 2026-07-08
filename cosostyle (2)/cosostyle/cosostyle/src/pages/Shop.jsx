import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../lib/constants';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  
  // Clean synchronization check wrapper on active view parameter change rules
  const setCategoryFilter = (category) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  // Filter core items matching strict structural views constraint layers
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Layout Categorized Header Segment Wrapper */}
        <div className="border-b border-neutral-900 pb-6 mb-8">
          <span className="text-[10px] font-bold text-brandRed tracking-widest uppercase block mb-1">COLLECTION</span>
          <h1 className="text-white text-5xl font-black font-impact tracking-tight uppercase">
            SHOP ALL TEES
          </h1>
        </div>

        {/* Controls Filters Grid Selection Bar Element Structure Wrapper */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          {/* Quick Filter Selection Segment Tabs array controller buttons */}
          <div className="flex flex-wrap gap-1">
            {['all', 'classic', 'graphic', 'oversized'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 text-xs font-bold tracking-widest uppercase border transition ${
                  currentCategory === cat
                    ? 'bg-brandRed text-white border-brandRed'
                    : 'bg-black text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filtering Action Controls Search Input Box Element Layer */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center bg-black border border-neutral-800 focus-within:border-neutral-500 transition">
              <input
                type="text"
                placeholder="Search tees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white px-4 py-2 pl-10 text-xs font-semibold tracking-wider placeholder-neutral-600 focus:outline-none w-full md:w-64"
              />
              <Search className="absolute left-3.5 text-neutral-600" size={14} />
            </div>

            <div className="relative flex items-center bg-black border border-neutral-800 px-4 py-2 text-xs font-bold tracking-widest text-neutral-400 cursor-pointer select-none">
              <span>NEWEST</span>
              <ChevronDown size={14} className="ml-2 text-neutral-600" />
            </div>
          </div>
        </div>

        {/* Dynamic Display Multi Column Active Grid Render Layer Layout area */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-24 border border-dashed border-neutral-900">
            <span className="text-xs font-bold tracking-widest text-neutral-600 uppercase">NO PRODUCTS FOUND MATCHING FILTER RULES</span>
          </div>
        )}
      </div>
    </div>
  );
}