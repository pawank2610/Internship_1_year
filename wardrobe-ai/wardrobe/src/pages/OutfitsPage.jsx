import { useState, useEffect } from 'react';
import { Sparkles, Save, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import MannequinDisplay from '../components/MannequinDisplay';

export default function OutfitsPage() {
  const { user } = useAuth();
  const [allItems, setAllItems] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [activeGender, setActiveGender] = useState('mens');
  const [combinations, setCombinations] = useState([]);
  const [tab, setTab] = useState('generate');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    const [{ data: items }, { data: outfits }] = await Promise.all([
      supabase.from('clothing_items').select('*').eq('user_id', user.id),
      supabase.from('outfits').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    ]);
    setAllItems(items || []);
    setSavedOutfits(outfits || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

  const handleGenerate = () => {
    const genderItems = allItems.filter(i => i.gender === activeGender);
    const tops = genderItems.filter(i => ['shirts', 'tshirts', 'jackets', 'tops'].includes(i.category));
    const bottoms = genderItems.filter(i => i.category === 'jeans');
    
    const combos = [];
    tops.slice(0, 10).forEach(top => {
      bottoms.slice(0, 2).forEach(bottom => {
        combos.push([top, bottom]);
      });
    });
    setCombinations(combos);
  };

  useEffect(() => { if (allItems.length > 0) handleGenerate(); }, [allItems, activeGender]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Outfit Generator</h1>
        <button onClick={handleGenerate} className="flex items-center gap-2 bg-amber-400 px-4 py-2 rounded-xl font-semibold">
          <RefreshCw size={16} /> Regenerate
        </button>
      </div>

      <div className="flex gap-1 p-1 bg-stone-100 rounded-xl w-fit mb-6">
        {['generate', 'saved'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-medium ${tab === t ? 'bg-white shadow-sm' : 'text-stone-500'}`}>
            {t === 'generate' ? 'Generated' : 'Saved'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tab === 'generate' ? combinations.map((combo, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
            <MannequinDisplay items={combo} gender={activeGender} size="sm" />
            <button className="w-full mt-4 bg-stone-100 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
              <Save size={14} /> Save Outfit
            </button>
          </div>
        )) : savedOutfits.map(outfit => (
          <div key={outfit.id} className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
            <p className="font-semibold text-sm mb-2">{outfit.name}</p>
            <span className="text-xs bg-stone-100 px-2 py-1 rounded-full">{outfit.occasion}</span>
          </div>
        ))}
      </div>
    </div>
  );
}