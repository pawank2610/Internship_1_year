import { useState, useEffect } from 'react';
import { Plus, Search, Shirt } from 'lucide-react';
import { supabase, MENS_CATEGORIES, WOMENS_CATEGORIES } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ClothingCard from '../components/ClothingCard';
import UploadModal from '../components/UploadModal';

export default function WardrobePage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGender, setActiveGender] = useState('mens');
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const fetchItems = async () => {
    if (!user) return;
    const { data } = await supabase.from('clothing_items').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [user]);

  const handleDelete = async (id) => {
    await supabase.from('clothing_items').delete().eq('id', id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const categories = activeGender === 'mens' ? MENS_CATEGORIES : WOMENS_CATEGORIES;
  const filtered = items.filter((item) => {
    if (item.gender !== activeGender) return false;
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.color.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">My Wardrobe</h1>
          <p className="text-stone-500 text-sm mt-1">{items.length} items total</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 bg-stone-900 text-white font-medium px-4 py-2.5 rounded-xl hover:bg-stone-800 transition">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="flex gap-2 mb-5">
        {['mens', 'womens'].map((g) => (
          <button key={g} onClick={() => { setActiveGender(g); setActiveCategory('all'); }} className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${activeGender === g ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
            {g === 'mens' ? "Men's" : "Women's"}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or color..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-400 outline-none" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <ClothingCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onSuccess={fetchItems} defaultGender={activeGender} />}
    </div>
  );
}