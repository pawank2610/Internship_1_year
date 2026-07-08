import React from 'react';

export default function Manifesto() {
  return (
    <section className="w-full bg-black py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Highlight Accent Column Header block layout text */}
        <div className="md:col-span-4 border-l-2 border-brandRed pl-4">
          <span className="text-xs font-bold text-brandRed tracking-widest block mb-2 uppercase">MANIFESTO</span>
          <h2 className="text-white text-4xl md:text-5xl font-black font-impact tracking-tight leading-none uppercase">
            WE DON'T<br />MAKE<br />FAST<br />FASHION.
          </h2>
        </div>

        {/* Detail Content Manifesto Copy Area Context Block Description */}
        <div className="md:col-span-8 md:pt-6 text-neutral-400 text-sm md:text-base max-w-xl space-y-6 leading-relaxed">
          <p>
            Every CosoStyle tee starts with long-staple cotton. We knit it heavy. We cut it boxy. 
            We finish it slow. The result is a t-shirt that drapes like denim and outlives the season.
          </p>
          <p className="font-bold text-white">
            No trends. No collabs. No shortcuts. Just one obsession: <span className="text-brandRed">a tee worth keeping.</span>
          </p>
        </div>
      </div>
    </section>
  );
}