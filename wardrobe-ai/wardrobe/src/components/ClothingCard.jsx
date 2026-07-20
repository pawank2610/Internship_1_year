import { Trash2, Tag } from 'lucide-react';

const categoryColors = {
  shirts: 'bg-blue-100 text-blue-700',
  tshirts: 'bg-green-100 text-green-700',
  jackets: 'bg-orange-100 text-orange-700',
  jeans: 'bg-indigo-100 text-indigo-800',
  tops: 'bg-pink-100 text-pink-700',
  traditional: 'bg-amber-100 text-amber-700',
  jewelery: 'bg-yellow-100 text-yellow-700',
};

export default function ClothingCard({ item, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm group overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="relative aspect-square bg-stone-50 overflow-hidden">
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600 text-stone-500 shadow-sm"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="p-3">
        <p className="text-stone-900 font-medium text-sm truncate">{item.name}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[item.category] || 'bg-stone-100 text-stone-600'}`}>
            {item.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-stone-400">
            <Tag size={10} />
            {item.color}
          </span>
        </div>
      </div>
    </div>
  );
}