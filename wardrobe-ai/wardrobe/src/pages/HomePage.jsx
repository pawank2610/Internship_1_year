import { Shirt, Sparkles, CalendarDays, Upload, ArrowRight, TrendingUp } from 'lucide-react';

export default function HomePage({ onNavigate, stats }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-stone-900 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles size={12} /> AI-Powered Style
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Smart Wardrobe Assistant</h1>
          <p className="text-stone-400 text-lg mb-8">Upload your clothes, generate perfect outfits, and plan your entire week.</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate('wardrobe')} className="flex items-center gap-2 bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-xl hover:bg-amber-300 transition">
              <Upload size={16} /> Upload Clothes
            </button>
            <button onClick={() => onNavigate('outfits')} className="flex items-center gap-2 bg-stone-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-stone-700 transition">
              <Sparkles size={16} /> Generate Outfits <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Clothing Items', value: stats.total, icon: <Shirt size={20} className="text-amber-600" />, bg: 'bg-amber-50' },
          { label: 'Saved Outfits', value: stats.outfits, icon: <Sparkles size={20} className="text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Possible Combos', value: stats.total > 0 ? `${Math.floor(stats.total * 1.5)}+` : '0', icon: <TrendingUp size={20} className="text-green-600" />, bg: 'bg-green-50' },
          { label: 'Days Planned', value: '7', icon: <CalendarDays size={20} className="text-rose-600" />, bg: 'bg-rose-50' },
        ].map(({ label, value, icon, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>{icon}</div>
            <p className="text-2xl font-bold text-stone-900">{value}</p>
            <p className="text-stone-500 text-sm mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
